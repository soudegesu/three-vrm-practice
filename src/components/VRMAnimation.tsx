/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useAnimation from '../hooks/useAnimation';
import { useCanvasState } from '../provider/CanvasProvider';
import { clockAtomFamily, statsAtom } from '../states/VRMState';

const VRMAnimation: FC = () => {
  const { canvasId } = useCanvasState();
  const stats = useRecoilValue(statsAtom);
  const clock = useRecoilValue(clockAtomFamily(canvasId));
  const { animation } = useAnimation();

  useEffect(() => {
    if (!animation) {
      return;
    }

    stats.begin();
    clock.start();
    animation();
    stats.end();
  }, [animation]);

  return <></>;
};

export default VRMAnimation;
