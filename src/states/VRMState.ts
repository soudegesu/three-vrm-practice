import { VRM } from '@pixiv/three-vrm';
import { atom } from 'recoil';
import { AnimationMixer, Camera, Clock } from 'three';

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

export const mixerState = atom<AnimationMixer | undefined>({
  key: 'mixerState',
  default: undefined,
  dangerouslyAllowMutability: true,
});
