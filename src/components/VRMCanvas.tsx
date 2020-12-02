/* eslint-disable react-hooks/exhaustive-deps */
import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm';
import React, { FC, Suspense, useEffect, useRef } from 'react';
import { Canvas, CanvasContext } from 'react-three-fiber';
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';
import {
  AnimationClip,
  AnimationMixer,
  Euler,
  NumberKeyframeTrack,
  Quaternion,
  QuaternionKeyframeTrack,
  Vector3,
} from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import VRMAvatar from '../components/VRMAvatar';
import { cameraState, mixerState, statsState, vrmState } from '../states/VRMState';

interface Props {
  url: string;
  height: number | string;
  width: number | string;
}

const VRMCanvas: FC<Props> = ({ url, height, width }) => {
  const [vrm, setVrm] = useRecoilState(vrmState);
  const [camera, setCamera] = useRecoilState(cameraState);
  const [mixer, setMixer] = useRecoilState(mixerState);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const ref = useRef<HTMLDivElement | null>(null);
  const stats = useRecoilValue(statsState);

  useEffect(() => {
    (async () => {
      const gltf = (await new GLTFLoader().loadAsync(url, () => {})) as GLTF;
      VRMUtils.removeUnnecessaryJoints(gltf.scene);
      const vrm = await VRM.from(gltf);
      setVrm(vrm);
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
  }, [vrm]);

  useEffect(() => {
    if (!vrm || !camera) {
      return;
    }
    // 首の位置を基準にする
    const neck = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Neck);
    if (neck) {
      const neckPos = new Vector3();
      neck.getWorldPosition(neckPos);
      camera.position.set(0, neckPos.y, 0.5);
      camera.lookAt(0, neckPos.y, 0);
    }
  }, [vrm, camera]);

  useEffect(() => {
    if (!vrm) {
      return;
    }
    const reftArm = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm);
    const blink = vrm.blendShapeProxy?.getBlendShapeTrackName(VRMSchema.BlendShapePresetName.Blink);

    const quatA = new Quaternion(0.0, 0.0, 0.0, 1.0);
    const quatB = new Quaternion(0.0, 0.0, 0.0, 1.0);
    quatB.setFromEuler(new Euler(0.0, 0.0, 0.25 * Math.PI));

    const armTrack = new QuaternionKeyframeTrack(
      reftArm?.name + '.quaternion',
      [0.0, 0.5, 1.0], // times
      [...quatA.toArray(), ...quatB.toArray(), ...quatA.toArray()], // values
    );

    const blinkTrack = new NumberKeyframeTrack(
      blink ? blink : '',
      [0.0, 0.5, 1.0], // times
      [0.0, 1.0, 0.0], // values
    );

    const clip = new AnimationClip('blink', 1.0, [armTrack, blinkTrack]);
    const currentMixer = new AnimationMixer(vrm.scene);
    const action = currentMixer.clipAction(clip);
    action.play();
    setMixer(currentMixer);
  }, [vrm]);

  const handleOnCreated = ({ camera }: CanvasContext) => {
    setCamera(camera);
  };

  useEffect(() => {
    if (ref && ref.current) {
      stats.showPanel(0);
      // stats.dom.style.position = 'absolute';
      ref.current.appendChild(stats.dom);
    }
  }, [ref]);

  return (
    <>
      <div ref={ref}></div>
      <Canvas
        style={{ background: 'black', width, height, border: 'solid 1px black' }}
        camera={{ fov: 50, aspect: 4.0 / 3.0, near: 0.4, far: 1.0 }}
        onCreated={handleOnCreated}
      >
        <RecoilBridge>
          <directionalLight color="#ffffff" intensity={0.3} position={new Vector3(1, 1, 1).normalize()} />
          <Suspense fallback={null}>{vrm && mixer && <VRMAvatar scene={vrm.scene} />}</Suspense>
        </RecoilBridge>
      </Canvas>
    </>
  );
};

export default VRMCanvas;
