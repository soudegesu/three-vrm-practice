import { VRM } from '@pixiv/three-vrm';
import React, { FC, useEffect } from 'react';
import { Clock } from 'three';
import useAnimation from '../hooks/useAnimation';

interface Props {
  clock: Clock;
  vrm?: VRM;
}

const VRMAnimation: FC<Props> = ({ clock, vrm }) => {
  const { animation } = useAnimation({ clock, vrm });

  useEffect(() => {
    animation();
  }, [animation]);

  return <></>;
};

export default VRMAnimation;
