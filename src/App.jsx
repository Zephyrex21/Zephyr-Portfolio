import { useCallback, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { VrmAvatar } from './components/VrmAvatar.jsx';
import { SettingsPanel } from './components/SettingsPanel.jsx';
import { useVoiceSocket } from './hooks/useVoiceSocket.js';
import './App.css';

const BACKEND_HTTP_URL = 'http://localhost:8080';
const BACKEND_WS_URL = 'ws://localhost:8080/ws/voice';
const USER_ID = '000000000000000000000001'; // swap for the real logged-in user id

export default function App() {
  const avatarRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [lastEmotion, setLastEmotion] = useState('neutral');
  const [lastText, setLastText] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleAmplitude = useCallback((amp) => {
    // Rough gain so quiet/loud speech both produce a visible mouth movement -
    // tune the multiplier once you're hearing real audio.
    avatarRef.current?.setMouthOpen(amp * 6);
  }, []);

  const handleEmotion = useCallback((emotion) => {
    setLastEmotion(emotion);
    avatarRef.current?.setExpression(emotion);
  }, []);

  const { connected, micOn, connect, disconnect, startMic, stopMic } = useVoiceSocket({
    backendUrl: BACKEND_WS_URL,
    userId: USER_ID,
    token: 'dev_secret_change_me', // must match WS_AUTH_SECRET in the backend .env
    onAmplitude: handleAmplitude,
    onEmotion: handleEmotion,
    onText: setLastText,
    onStatus: setStatus,
  });

  return (
    <div className="stage">
      <Canvas camera={{ position: [0, 1.3, 1.6], fov: 30 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[1, 2, 2]} intensity={1.2} />
        <VrmAvatar ref={avatarRef} url="/models/alya.vrm" />
        <OrbitControls target={[0, 1.2, 0]} enablePan={false} />
      </Canvas>

      <div className="hud">
        <div className="hud__row">
          <span className={`dot ${connected ? 'dot--live' : ''}`} />
          <span className="hud__status">{status}</span>
        </div>

        <div className="hud__row hud__controls">
          {!connected ? (
            <button onClick={connect}>Connect</button>
          ) : (
            <button onClick={disconnect}>Disconnect</button>
          )}
          <button onClick={micOn ? stopMic : startMic} disabled={!connected}>
            {micOn ? 'Stop mic' : 'Start mic'}
          </button>
          <button onClick={() => setSettingsOpen(true)}>Settings</button>
        </div>

        <div className="hud__row hud__meta">
          <span>emotion: {lastEmotion}</span>
          {lastText && <span className="hud__text">"{lastText}"</span>}
        </div>
      </div>

      {settingsOpen && (
        <SettingsPanel
          backendHttpUrl={BACKEND_HTTP_URL}
          userId={USER_ID}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}
