/**
 * Raw PCM helpers. Gemini Live expects 16-bit PCM mic audio (commonly
 * 16kHz) and sends back 16-bit PCM audio (commonly 24kHz) - verify the
 * exact rates against your working client code, since this can vary by
 * model/config. These helpers are rate-agnostic; you just pass the right
 * numbers in.
 */

/** Downsample a Float32 buffer from one sample rate to another (linear, good enough for voice). */
export function downsampleBuffer(buffer, inputSampleRate, outputSampleRate) {
  if (outputSampleRate === inputSampleRate) return buffer;
  const ratio = inputSampleRate / outputSampleRate;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : 0;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}

/** Float32 [-1, 1] -> Int16 PCM. */
export function floatTo16BitPCM(float32Array) {
  const out = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

/** Int16 PCM -> Float32 [-1, 1], for playback. */
export function int16ToFloat32(int16Array) {
  const out = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    out[i] = int16Array[i] / (int16Array[i] < 0 ? 0x8000 : 0x7fff);
  }
  return out;
}

export function int16ToBase64(int16Array) {
  const bytes = new Uint8Array(int16Array.buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function base64ToInt16(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

/** Quick root-mean-square amplitude of a Float32 buffer, 0-1ish - good enough to drive a jaw-open blendshape. */
export function rmsAmplitude(float32Array) {
  let sum = 0;
  for (let i = 0; i < float32Array.length; i++) sum += float32Array[i] * float32Array[i];
  return Math.sqrt(sum / float32Array.length);
}
