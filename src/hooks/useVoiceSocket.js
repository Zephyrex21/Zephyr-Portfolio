import { useCallback, useRef, useState } from 'react';
import {
  downsampleBuffer,
  floatTo16BitPCM,
  int16ToBase64,
  base64ToInt16,
  int16ToFloat32,
  rmsAmplitude,
} from '../audio/pcm.js';

const MIC_TARGET_SAMPLE_RATE = 16000; // what we send to the backend
const PLAYBACK_SAMPLE_RATE = 24000; // what we assume comes back - verify against your setup

/**
 * Owns the WebSocket connection to the Alya backend relay, mic capture,
 * and incoming-audio playback. The component using this hook just reacts
 * to amplitude/emotion/text callbacks - it doesn't need to know anything
 * about WebSockets or Web Audio internals.
 */
export function useVoiceSocket({ backendUrl, userId, token, onAmplitude, onEmotion, onText, onStatus }) {
  const [connected, setConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const wsRef = useRef(null);
  const micStreamRef = useRef(null);
  const micContextRef = useRef(null);
  const micProcessorRef = useRef(null);

  const playbackContextRef = useRef(null);
  const nextPlayTimeRef = useRef(0);

  const connect = useCallback(() => {
    const url = `${backendUrl}?userId=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      onStatus?.('connected');
    };

    ws.onmessage = (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }
      if (msg.type === 'audio' && msg.data) {
        playChunk(msg.data);
      } else if (msg.type === 'emotion' && msg.data) {
        onEmotion?.(msg.data);
      } else if (msg.type === 'text' && msg.data) {
        onText?.(msg.data);
      } else if (msg.type === 'terminal') {
        onStatus?.(`terminal: ${msg.reason}`);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      onStatus?.('disconnected');
    };

    ws.onerror = () => {
      onStatus?.('error');
    };
  }, [backendUrl, userId, token, onEmotion, onText, onStatus]);

  const disconnect = useCallback(() => {
    wsRef.current?.close(1000, 'client_requested');
    wsRef.current = null;
    stopMic();
  }, []);

  /** Decode one incoming base64 PCM chunk and schedule it for gapless playback. */
  const playChunk = useCallback((base64) => {
    if (!playbackContextRef.current) {
      playbackContextRef.current = new AudioContext({ sampleRate: PLAYBACK_SAMPLE_RATE });
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }
    const ctx = playbackContextRef.current;

    const int16 = base64ToInt16(base64);
    const float32 = int16ToFloat32(int16);

    onAmplitude?.(rmsAmplitude(float32));

    const buffer = ctx.createBuffer(1, float32.length, PLAYBACK_SAMPLE_RATE);
    buffer.copyToChannel(float32, 0);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    const startAt = Math.max(nextPlayTimeRef.current, ctx.currentTime);
    source.start(startAt);
    nextPlayTimeRef.current = startAt + buffer.duration;
  }, [onAmplitude]);

  const startMic = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStreamRef.current = stream;

    const context = new AudioContext();
    micContextRef.current = context;
    const source = context.createMediaStreamSource(stream);

    // ScriptProcessorNode is deprecated but still universally supported and
    // simplest for a prototype. Swap for an AudioWorklet before shipping.
    const processor = context.createScriptProcessor(4096, 1, 1);
    micProcessorRef.current = processor;

    processor.onaudioprocess = (event) => {
      if (wsRef.current?.readyState !== WebSocket.OPEN) return;
      const input = event.inputBuffer.getChannelData(0);
      const downsampled = downsampleBuffer(input, context.sampleRate, MIC_TARGET_SAMPLE_RATE);
      const pcm16 = floatTo16BitPCM(downsampled);
      const base64 = int16ToBase64(pcm16);
      wsRef.current.send(JSON.stringify({ type: 'audio', data: base64 }));
    };

    source.connect(processor);
    processor.connect(context.destination); // required by some browsers to keep the graph alive
    setMicOn(true);
  }, []);

  const stopMic = useCallback(() => {
    micProcessorRef.current?.disconnect();
    micContextRef.current?.close();
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micProcessorRef.current = null;
    micContextRef.current = null;
    micStreamRef.current = null;
    setMicOn(false);
  }, []);

  return { connected, micOn, connect, disconnect, startMic, stopMic };
}
