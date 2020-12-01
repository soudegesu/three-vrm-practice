import { VRM } from '@pixiv/three-vrm';
import { atom } from 'recoil';
import { Camera, Clock } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

export const vrmState = atom<VRM | undefined>({
  key: 'vrmState',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const cameraState = atom<Camera | undefined>({
  key: 'cameraState',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const clockState = atom<Clock>({
  key: 'clockState',
  default: new Clock(true),
});

export const statsState = atom<Stats>({
  key: 'statsState',
  default: Stats(),
});
