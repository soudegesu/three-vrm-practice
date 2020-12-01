import React, { FC } from 'react';
import { Group, Scene } from 'three';
import VRMAnimation from './VRMAnimation';

interface Props {
  scene: Scene | Group;
}

const VRMAvatar: FC<Props> = ({ scene }) => {
  return (
    <>
      <primitive object={scene} dispose={null} />
      <VRMAnimation />
    </>
  );
};

export default VRMAvatar;
