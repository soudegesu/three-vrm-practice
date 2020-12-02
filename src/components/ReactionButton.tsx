import { Button } from '@material-ui/core';
import { VRMSchema } from '@pixiv/three-vrm';
import React, { FC, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  AnimationAction,
  AnimationActionLoopStyles,
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  LoopPingPong,
  LoopRepeat,
  NumberKeyframeTrack,
} from 'three';
import { reactionMixerState, vrmState } from '../states/VRMState';

const ReactionButton: FC = () => {
  const vrm = useRecoilValue(vrmState);
  const [action, setAction] = useState<AnimationAction>();
  const setReactionMixerState = useSetRecoilState(reactionMixerState);

  useEffect(() => {
    if (!vrm) {
      return;
    }
    const o = vrm.blendShapeProxy?.getBlendShapeTrackName(VRMSchema.BlendShapePresetName.O);
    const oTrack = new NumberKeyframeTrack(
      o ? o : '',
      [0.0, 0.5, 1.0], // times
      [0.0, 1.0, 0.0], // values
    );
    const clip = new AnimationClip('o', 1.0, [oTrack]);
    const mixer = new AnimationMixer(vrm.scene);
    setReactionMixerState(mixer);
    const action = mixer.clipAction(clip);
    setAction(action);
  }, [vrm]);

  const handleOnClick = () => {
    if (action) {
      action.play();
      setTimeout(() => {
        action.stop();
      }, 1000);
    }
  };

  return (
    <Button color="primary" variant="contained" onClick={handleOnClick}>
      Action O
    </Button>
  );
};

export default ReactionButton;
