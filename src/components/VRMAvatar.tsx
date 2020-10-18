/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { VRM, VRMDebug } from '@pixiv/three-vrm';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock } from 'three';
import { useAppState } from '../providers/AppProvider';

interface Props {
  url: string;
}

const VRMAvatar: React.FC<Props> = (props) => {
  const { debug } = useAppState();
  const [vrm, setVrm] = useState<VRM>();
  const [clock] = useState(new Clock(true));

  const gltf = useLoader(GLTFLoader, props.url);

  useEffect(() => {
    console.log(gltf);
    if (!gltf) {
      return;
    }

    (async () => {
      if (debug) {
        const vrm = await VRMDebug.from(gltf);
        setVrm(vrm);
      } else {
        const vrm = await VRM.from(gltf);
        setVrm(vrm);
      }
    })();
  }, [gltf]);

  useEffect(() => {
    if (!vrm) {
      return;
    }
    vrm.update(clock.elapsedTime);
  }, [vrm, clock]);

  return vrm !== undefined ? (
    <mesh>
      <primitive object={vrm.scene} />
    </mesh>
  ) : (
    <></>
  );
};

export default VRMAvatar;
