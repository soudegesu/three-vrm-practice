import { FC, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  // addCanvasAnimationSelector,
  cameraAtomFamily,
  // canvasAnimationsAtom,
  clockAtomFamily,
  // mixerAtomFamily,
  // rafIdAtom,
  // rendererAtomFamily,
  // sceneAtomFamily,
  statsAtom,
  vrmAtomFamily,
} from '../states/VRMState';

const AnimationWorker: FC = () => {
  const stats = useRecoilValue(statsAtom);
  // const [rafId, setRafId] = useRecoilState(rafIdAtom);
  // const canvasAnimations = useRecoilValue(addCanvasAnimationSelector);

  // const mixer = useRecoilValue(mixerAtomFamily(0));
  // const clock = useRecoilValue(clockAtomFamily(0));
  // const vrm = useRecoilValue(vrmAtomFamily(0));
  // const scene = useRecoilValue(sceneAtomFamily(0));
  // const renderer = useRecoilValue(rendererAtomFamily(0));
  // const camera = useRecoilValue(cameraAtomFamily(0));

  // const cancelAnimation = useCallback(() => {
  //   if (rafId) cancelAnimationFrame(rafId);
  // }, [rafId]);

  // const animation = useCallback(() => {
  //   // console.log(renderer);
  //   // console.log(camera);
  //   if (canvasAnimations && canvasAnimations.length) {
  //     const hoge = canvasAnimations[0];
  //     hoge.execute();
  //   }
  //   stats.update();
  //   setRafId(requestAnimationFrame(animation));
  // }, []);

  // useEffect(() => {
  //   stats.begin();
  //   animation();
  //   stats.end();
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     if (cancelAnimation) cancelAnimation();
  //   };
  // }, [cancelAnimation]);

  return null;
};

export default AnimationWorker;
