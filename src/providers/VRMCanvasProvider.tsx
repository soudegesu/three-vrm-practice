import React, { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { AnimationMixer, Camera, Clock, Vector3, WebGLRenderer } from 'three';

type ActionType = 'vrm' | 'camera' | 'cameraPos' | 'cameraLookAt' | 'mixer';

type VRMCanvasState = {
  camera?: Camera;
  clock: Clock;
  renderer?: WebGLRenderer;
  mixer?: AnimationMixer;
};

type VRMCAnvasAction = {
  type: ActionType;
  value?: {
    camera?: Camera;
    cameraPos?: Vector3;
    cameraLookAt?: Vector3;
    renderer?: WebGLRenderer;
    mixer?: AnimationMixer;
  };
};

const reducer = (state: VRMCanvasState, action: VRMCAnvasAction): VRMCanvasState => {
  switch (action.type) {
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

const VRMCanvasStateContext = createContext<VRMCanvasState>({} as VRMCanvasState);
const VRMCanvasDispatchContext = createContext<Dispatch<VRMCAnvasAction>>(() => {});

export function useVRMCanvasState() {
  return useContext(VRMCanvasStateContext);
}

export function useVRMCanvasDispatch() {
  return useContext(VRMCanvasDispatchContext);
}

const VRMCanvasProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { clock: new Clock(true) });

  return (
    <VRMCanvasStateContext.Provider value={state}>
      <VRMCanvasDispatchContext.Provider value={dispatch}>{children}</VRMCanvasDispatchContext.Provider>
    </VRMCanvasStateContext.Provider>
  );
};

export default VRMCanvasProvider;
