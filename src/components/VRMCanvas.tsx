/* eslint-disable react-hooks/exhaustive-deps */
import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm';
import React, { FC, Suspense, useEffect } from 'react';
import { Canvas, CanvasContext } from 'react-three-fiber';
import { Vector3 } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import VRMAvatar from '../components/VRMAvatar';
import useAnimation from '../hooks/useAnimation';
import { useVRMCanvasDispatch, useVRMCanvasState } from '../providers/VRMCanvasProvider';

interface Props {
  url: string;
  height: number | string;
  width: number | string;
}

const VRMCanvas: FC<Props> = ({ url, height, width }) => {
  const { vrm } = useVRMCanvasState();
  const dispatch = useVRMCanvasDispatch();
  const { animation } = useAnimation();

  useEffect(() => {
    (async () => {
      const gltf = (await new GLTFLoader().loadAsync(url, () => {})) as GLTF;
      VRMUtils.removeUnnecessaryJoints(gltf.scene);
      const vrm = await VRM.from(gltf);
      dispatch({ type: 'vrm', value: { vrm: vrm } });
    })();
  }, [url]);

  useEffect(() => {
    if (!vrm) {
      return;
    }
    // 180°回転
    const boneNode = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips);
    if (boneNode) boneNode.rotateY(Math.PI);

    // 左腕を下ろす
    const leftArm = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm);
    if (leftArm) leftArm.rotateZ((Math.PI * 2) / 5);
    // 右腕を下ろす
    const rightArm = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightUpperArm);
    if (rightArm) rightArm.rotateZ((-Math.PI * 2) / 5);
    // 首の位置を基準にする
    const neck = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Neck);
    if (neck) {
      const neckPos = new Vector3();
      neck.getWorldPosition(neckPos);
      dispatch({ type: 'cameraLookAt', value: { cameraLookAt: new Vector3(0, neckPos.y, 0) } });
      dispatch({ type: 'cameraPos', value: { cameraPos: new Vector3(0, neckPos.y, 0.5) } });
    }
  }, [vrm]);

  const handleOnCreated = ({ camera }: CanvasContext) => {
    dispatch({ type: 'camera', value: { camera } });
  };

  useEffect(() => {
    if (animation) animation();
  }, [animation]);

  return (
    <Canvas
      style={{ background: 'black', width, height, border: 'solid 1px black' }}
      camera={{ fov: 50, aspect: 4.0 / 3.0, near: 0.4, far: 1.0 }}
      onCreated={handleOnCreated}
    >
      <directionalLight color="#ffffff" intensity={0.3} position={new Vector3(1, 1, 1).normalize()} />
      <Suspense fallback={null}>{vrm?.scene && <VRMAvatar vrm={vrm} />}</Suspense>
    </Canvas>
  );
};

export default VRMCanvas;
