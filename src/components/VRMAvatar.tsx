/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { VRM, VRMDebug, VRMSchema } from '@pixiv/three-vrm';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock, Scene } from 'three';
import { useAppState } from '../providers/AppProvider';

interface Props {
  url: string;
}

const VRMAvatar: React.FC<Props> = (props) => {
  const { debug } = useAppState();
  const [vrmAvatar, setVrmAvatar] = useState<VRM>();
  const [clock] = useState(new Clock(false));

  const gltf = useLoader(GLTFLoader, props.url);

  useEffect(() => {
    if (!gltf) {
      return;
    }

    (async () => {
      const scene = new Scene();
      let vrm: VRM;
      if (debug) {
        vrm = await VRMDebug.from(gltf);
        scene.add(vrm.scene);
        setVrmAvatar(vrm);
      } else {
        vrm = await VRM.from(gltf);
        setVrmAvatar(vrm);
      }

      // 正面を向かせる
      vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips)?.rotateY(Math.PI);

      clock.start();
    })();
  }, [gltf]);

  useEffect(() => {
    if (!vrmAvatar) {
      return;
    }
    vrmAvatar.update(clock.elapsedTime);
  }, [clock]);

  useEffect(() => {
    return () => {
      if (clock) clock.stop();
    };
  }, []);

  return vrmAvatar !== undefined ? (
    <mesh>
      <primitive object={vrmAvatar.scene} />
    </mesh>
  ) : (
    <></>
  );
};

export default VRMAvatar;
