import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { funAnimationActionState } from '../states/VRMState';

const ReactionButton: FC = () => {
  const funAction = useRecoilValue(funAnimationActionState);

  const handleOnClick = () => {
    if (!funAction) {
      return;
    }
    funAction.play();
    setTimeout(() => {
      funAction.stop();
    }, funAction.getClip().duration * 1000);
  };

  return (
    <Button color="primary" variant="contained" onClick={handleOnClick}>
      Action O
    </Button>
  );
};

export default ReactionButton;
