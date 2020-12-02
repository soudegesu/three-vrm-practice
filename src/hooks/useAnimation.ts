/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { clockState, mixerState, reactionMixerState, statsState, vrmState } from '../states/VRMState';

export default function useAnimation() {
  const mixer = useRecoilValue(mixerState);
  const [rafId, setRafId] = useState<number>();
  const clock = useRecoilValue(clockState);
  const vrm = useRecoilValue(vrmState);
  const stats = useRecoilValue(statsState);
  const reactionMixer = useRecoilValue(reactionMixerState);

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
    if (reactionMixer) {
      reactionMixer.setTime(1);
      reactionMixer.update(elapsedTime);
    }
    stats.update();
  }, []);

  const cancelAnimation = useCallback(() => {
    if (rafId) cancelAnimationFrame(rafId);
  }, [rafId]);

  return { animation, cancelAnimation };
}
