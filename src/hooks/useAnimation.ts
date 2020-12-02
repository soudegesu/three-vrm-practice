/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { clockState, mixerState, statsState, vrmState } from '../states/VRMState';

export default function useAnimation() {
  const mixer = useRecoilValue(mixerState);
  const [rafId, setRafId] = useState<number>();
  const clock = useRecoilValue(clockState);
  const vrm = useRecoilValue(vrmState);
  const stats = useRecoilValue(statsState);

  const animation = useCallback(() => {
    const delta = clock.getDelta();
    if (vrm) {
      vrm.update(delta);
    }

    if (mixer) {
      mixer.update(delta);
    }
    stats.update();
    setRafId(requestAnimationFrame(animation));
  }, []);

  const cancelAnimation = useCallback(() => {
    if (rafId) cancelAnimationFrame(rafId);
  }, [rafId]);

  return { animation, cancelAnimation };
}
