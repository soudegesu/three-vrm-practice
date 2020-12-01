/* eslint-disable react-hooks/exhaustive-deps */
import { VRMSchema } from '@pixiv/three-vrm';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AnimationClip, AnimationMixer, Euler, NumberKeyframeTrack, Quaternion, QuaternionKeyframeTrack } from 'three';
import { clockState, statsState, vrmState } from '../states/VRMState';

export default function useAnimation() {
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [rafId, setRafId] = useState<number>();
  const clock = useRecoilValue(clockState);
  const vrm = useRecoilValue(vrmState);
  const stats = useRecoilValue(statsState);

  useEffect(() => {
    if (!vrm) {
      return;
    }
    const reftArm = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm);
    const blink = vrm.blendShapeProxy?.getBlendShapeTrackName(VRMSchema.BlendShapePresetName.Blink);

    const quatA = new Quaternion(0.0, 0.0, 0.0, 1.0);
    const quatB = new Quaternion(0.0, 0.0, 0.0, 1.0);
    quatB.setFromEuler(new Euler(0.0, 0.0, 0.25 * Math.PI));

    const armTrack = new QuaternionKeyframeTrack(
      reftArm?.name + '.quaternion',
      [0.0, 0.5, 1.0], // times
      [...quatA.toArray(), ...quatB.toArray(), ...quatA.toArray()], // values
    );

    const blinkTrack = new NumberKeyframeTrack(
      blink ? blink : '',
      [0.0, 0.5, 1.0], // times
      [0.0, 1.0, 0.0], // values
    );

    const clip = new AnimationClip('blink', 1.0, [armTrack, blinkTrack]);
    const currentMixer = new AnimationMixer(vrm.scene);
    const action = currentMixer.clipAction(clip);
    action.play();
    setMixer(currentMixer);
  }, [vrm]);

  const animation = useCallback(() => {
    setRafId(requestAnimationFrame(animation));
    const elapsedTime = clock.elapsedTime;
    // getDeltaをしないとelapsedTimeが加算されなかった
    const delta = clock.getDelta();
    if (vrm) {
      vrm.update(delta);
    }

    if (mixer) {
      mixer.setTime(1);
      mixer.update(elapsedTime);
    }
  }, [vrm, mixer, clock]);

  const cancelAnimation = useCallback(() => {
    if (rafId) cancelAnimationFrame(rafId);
  }, [rafId]);

  return { animation, cancelAnimation };
}
