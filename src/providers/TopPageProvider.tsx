import { VRM } from '@pixiv/three-vrm';
import React, { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { AnimationMixer, Camera, Clock, Vector3, WebGLRenderer } from 'three';

type ActionType = 'vrm' | 'camera' | 'cameraPos' | 'cameraLookAt' | 'mixer';

type TopPageState = {
  vrm?: VRM;
  camera?: Camera;
  clock: Clock;
  renderer?: WebGLRenderer;
  mixer?: AnimationMixer;
};

type TopPageAction = {
  type: ActionType;
  value?: {
    vrm?: VRM;
    camera?: Camera;
    cameraPos?: Vector3;
    cameraLookAt?: Vector3;
    renderer?: WebGLRenderer;
    mixer?: AnimationMixer;
  };
};

const reducer = (state: TopPageState, action: TopPageAction): TopPageState => {
  switch (action.type) {
    case 'vrm':
      if (action.value?.vrm) {
        return { ...state, vrm: action.value.vrm };
      }
      break;
    case 'camera':
      if (action.value?.camera) {
        return { ...state, camera: action.value.camera };
      }
      break;
    case 'cameraPos':
      if (action.value?.cameraPos && state.camera) {
        const currentCamera = state.camera;
        currentCamera.position.set(action.value.cameraPos.x, action.value.cameraPos.y, action.value.cameraPos.z);
        return { ...state };
      }
      break;
    case 'cameraLookAt':
      if (action.value?.cameraLookAt && state.camera) {
        const currentCamera = state.camera;
        currentCamera.lookAt(action.value.cameraLookAt.x, action.value.cameraLookAt.y, action.value.cameraLookAt.z);
      }
      break;
    case 'mixer':
      if (action.value?.mixer) {
        return { ...state, mixer: action.value.mixer };
      }
      break;
    default:
      return state;
  }
  return state;
};

const TopPageStateContext = createContext<TopPageState>({} as TopPageState);
const TopPageDispatchContext = createContext<Dispatch<TopPageAction>>(() => {});

export function useTopPageState() {
  return useContext(TopPageStateContext);
}

export function useTopPageDispatch() {
  return useContext(TopPageDispatchContext);
}

const TopPageProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { clock: new Clock(true) });

  return (
    <TopPageStateContext.Provider value={state}>
      <TopPageDispatchContext.Provider value={dispatch}>{children}</TopPageDispatchContext.Provider>
    </TopPageStateContext.Provider>
  );
};

export default TopPageProvider;
