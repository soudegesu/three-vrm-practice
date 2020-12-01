import React, { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { AnimationMixer, Clock, WebGLRenderer } from 'three';

type ActionType = 'mixer';

type VRMCanvasState = {
  clock: Clock;
  renderer?: WebGLRenderer;
  mixer?: AnimationMixer;
};

type VRMCAnvasAction = {
  type: ActionType;
  value?: {
    renderer?: WebGLRenderer;
    mixer?: AnimationMixer;
  };
};

const reducer = (state: VRMCanvasState, action: VRMCAnvasAction): VRMCanvasState => {
  switch (action.type) {
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
