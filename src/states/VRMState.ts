import { VRM } from '@pixiv/three-vrm';
import { atom } from 'recoil';

export interface VRMState {
  vrm?: VRM;
}

export const vrmState = atom<VRM | undefined>({
  key: 'vrmState',
  default: undefined,
  dangerouslyAllowMutability: true,
});
