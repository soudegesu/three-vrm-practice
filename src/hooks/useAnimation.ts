/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useCanvasState } from '../provider/CanvasProvider';
import { clockAtomFamily, mixerAtomFamily, statsAtom, vrmAtomFamily } from '../states/VRMState';

export default function useAnimation() {
  const { canvasId } = useCanvasState();
  const mixer = useRecoilValue(mixerAtomFamily(canvasId));
  const [rafId, setRafId] = useState<number>();
  const clock = useRecoilValue(clockAtomFamily(canvasId));
  const vrm = useRecoilValue(vrmAtomFamily(canvasId));
  const stats = useRecoilValue(statsAtom);

  const animation = useCallback(() => {
    const delta = clock.getDelta();
    if (vrm) vrm.update(delta);
    if (mixer) mixer.update(delta);
    stats.update();
    setRafId(requestAnimationFrame(animation));
  }, []);

  const cancelAnimation = useCallback(() => {
    if (rafId) cancelAnimationFrame(rafId);
  }, [rafId]);

  return { animation, cancelAnimation };
}
