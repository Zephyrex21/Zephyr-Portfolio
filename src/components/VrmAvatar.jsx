import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

const EMOTION_PRESETS = ['happy', 'angry', 'sad', 'relaxed', 'surprised', 'neutral'];

// Map whatever emotion words your backend/persona prompt produces onto VRM's
// built-in expression presets. Extend this as your emotion tagging gets more granular.
const EMOTION_ALIASES = {
  flirty: 'happy',
  playful: 'happy',
  excited: 'happy',
  annoyed: 'angry',
  upset: 'sad',
  calm: 'relaxed',
  shocked: 'surprised',
};

/**
 * Renders a VRM avatar and exposes an imperative API so the parent (which
 * owns the WebSocket) can drive lip-sync and expression without either side
 * needing to know the other's internals.
 *
 *   ref.current.setMouthOpen(0..1)   - call every frame while audio is playing
 *   ref.current.setExpression(name)  - call whenever an emotion tag arrives
 */
export const VrmAvatar = forwardRef(function VrmAvatar({ url }, ref) {
  const vrmRef = useRef(null);
  const targetMouthRef = useRef(0);
  const targetExpressionRef = useRef('neutral');
  const blinkTimerRef = useRef(0);
  const nextBlinkAtRef = useRef(2 + Math.random() * 3);

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser));
  });

  useEffect(() => {
    const vrm = gltf.userData.vrm;
    if (!vrm) return;

    VRMUtils.removeUnnecessaryVertices(gltf.scene);
    VRMUtils.removeUnnecessaryJoints(gltf.scene);

    // VRM0 models face -Z (away from camera by default) - rotate to face the camera.
    if (vrm.meta?.metaVersion === '0') {
      VRMUtils.rotateVRM0(vrm);
    }

    vrmRef.current = vrm;
  }, [gltf]);

  useImperativeHandle(ref, () => ({
    setMouthOpen(value) {
      targetMouthRef.current = Math.max(0, Math.min(1, value));
    },
    setExpression(name) {
      const resolved = EMOTION_ALIASES[name] ?? name;
      targetExpressionRef.current = EMOTION_PRESETS.includes(resolved) ? resolved : 'neutral';
    },
  }));

  useFrame((_, delta) => {
    const vrm = vrmRef.current;
    if (!vrm) return;

    const em = vrm.expressionManager;
    if (em) {
      // Smoothly ease the mouth toward the latest amplitude-driven target.
      const currentMouth = em.getValue('aa') ?? 0;
      em.setValue('aa', currentMouth + (targetMouthRef.current - currentMouth) * 0.5);

      // Cross-fade emotion presets so switches don't pop.
      for (const preset of EMOTION_PRESETS) {
        const target = preset === targetExpressionRef.current ? 1 : 0;
        const current = em.getValue(preset) ?? 0;
        em.setValue(preset, current + (target - current) * 0.1);
      }

      // Idle blink loop - same spirit as Bella's idle video loop, but procedural.
      blinkTimerRef.current += delta;
      if (blinkTimerRef.current > nextBlinkAtRef.current) {
        em.setValue('blink', 1);
        if (blinkTimerRef.current > nextBlinkAtRef.current + 0.15) {
          em.setValue('blink', 0);
          blinkTimerRef.current = 0;
          nextBlinkAtRef.current = 2 + Math.random() * 3;
        }
      }

      em.update();
    }

    vrm.update(delta);
  });

  return <primitive object={gltf.scene} />;
});
