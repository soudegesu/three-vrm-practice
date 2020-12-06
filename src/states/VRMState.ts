import { VRM } from '@pixiv/three-vrm';
import { atom, atomFamily } from 'recoil';
import { AnimationAction, AnimationMixer, Camera, Clock } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

const atomKeyPrefix = 'atom';
const atomFamilyKeyPrefix = 'atomFamily';

type CanvasId = number;

export const statsAtom = atom<Stats>({
  key: `${atomKeyPrefix}/stats`,
  default: Stats(),
});

export const clockAtomFamily = atomFamily<Clock, CanvasId>({
  key: `${atomKeyPrefix}/clock`,
  default: new Clock(false),
  dangerouslyAllowMutability: true,
});

export const vrmAtomFamily = atomFamily<VRM | undefined, CanvasId>({
  key: `${atomFamilyKeyPrefix}/vrm`,
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const cameraAtomFamily = atomFamily<Camera | undefined, CanvasId>({
  key: `${atomFamilyKeyPrefix}/camera`,
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const mixerAtomFamily = atomFamily<AnimationMixer | undefined, CanvasId>({
  key: `${atomFamilyKeyPrefix}/mixer`,
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const armAnimationAtomFamily = atomFamily<AnimationAction | undefined, CanvasId>({
  key: `${atomFamilyKeyPrefix}/animation/arm`,
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const angryAnimationAtomFamily = atomFamily<AnimationAction | undefined, CanvasId>({
  key: `${atomFamilyKeyPrefix}/animation/angry`,
  default: undefined,
  dangerouslyAllowMutability: true,
});
