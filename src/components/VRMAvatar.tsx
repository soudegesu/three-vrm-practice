import { VRM } from '@pixiv/three-vrm';
import React, { FC, useEffect } from 'react';
import { Clock } from 'three';
import useAnimation from '../hooks/useAnimation';

interface Props {
  vrm: VRM;
  clock: Clock;
}

const VRMAvatar: FC<Props> = ({ vrm, clock }) => {
  const { animation } = useAnimation({ vrm, clock });

  useEffect(() => {
    animation();
  }, [animation]);

  return <primitive object={vrm.scene} dispose={null} />;
};

export default VRMAvatar;
