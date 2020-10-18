import React, { useEffect, useState } from 'react';
import { VRM } from '@pixiv/three-vrm';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock } from 'three';

interface Props {
  url: string;
}

const VRMAvatar: React.FC<Props> = (props) => {
  const [vrm, setVrm] = useState<VRM>();
  const [clock] = useState(new Clock(true));

  const gltf = useLoader(GLTFLoader, props.url);

  useEffect(() => {
    console.log(gltf);
    if (!gltf) {
      return;
    }

    (async () => {
      const vrm = await VRM.from(gltf);
      setVrm(vrm);
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
      <primitive object={vrm?.scene} />
    </mesh>
  ) : (
    <></>
  );
};

export default VRMAvatar;
