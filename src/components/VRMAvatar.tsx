import { VRM } from '@pixiv/three-vrm';
import React, { FC } from 'react';

interface Props {
  vrm: VRM;
}

const VRMAvatar: FC<Props> = ({ vrm }) => {
  return <primitive object={vrm.scene} dispose={null} />;
};

export default VRMAvatar;
