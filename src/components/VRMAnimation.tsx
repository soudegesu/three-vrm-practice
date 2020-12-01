import React, { FC, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useAnimation from '../hooks/useAnimation';
import { statsState } from '../states/VRMState';

const VRMAnimation: FC = () => {
  const { animation } = useAnimation();
  const stats = useRecoilValue(statsState);

  useEffect(() => {
    if (!stats || !animation) {
      return;
    }
    stats.begin();
    animation();
    stats.end();
  }, [stats, animation]);

  return <></>;
};

export default VRMAnimation;
