/* eslint-disable react-hooks/exhaustive-deps */
import { VRMSchema } from '@pixiv/three-vrm';
import { useCallback, useEffect, useState } from 'react';
import { AnimationClip, AnimationMixer, Euler, NumberKeyframeTrack, Quaternion, QuaternionKeyframeTrack } from 'three';
import { useTopPageDispatch, useTopPageState } from '../providers/TopPageProvider';

export default function useAnimation() {
  const { vrm, camera, mixer, clock } = useTopPageState();
  const dispatch = useTopPageDispatch();
  const [rafId, setRafId] = useState<number>();

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
      [0.0, 0.5, 1.5], // times
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
    dispatch({ type: 'mixer', value: { mixer: currentMixer } });
  }, [vrm]);

  const animation = useCallback(() => {
    setRafId(requestAnimationFrame(animation));
    if (!clock) return;
    const elapsedTime = clock.elapsedTime;
    const delta = clock.getDelta();
    if (vrm) {
      vrm.update(delta);
    }

    if (mixer) {
      mixer.setTime(1);
      mixer.update(elapsedTime);
    }
  }, [vrm, mixer, camera, clock]);

  const cancelAnimation = useCallback(() => {
    if (rafId) cancelAnimationFrame(rafId);
  }, [rafId]);

  return { animation, cancelAnimation };
}
