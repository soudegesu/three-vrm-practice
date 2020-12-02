/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useAnimation from '../hooks/useAnimation';
import { statsState } from '../states/VRMState';

const VRMAnimation: FC = () => {
  const stats = useRecoilValue(statsState);
  const { animation } = useAnimation();

  useEffect(() => {
    if (!animation) {
      return;
    }

    stats.begin();
    animation();
    stats.end();
  }, [animation]);

  return <></>;
};

export default VRMAnimation;
