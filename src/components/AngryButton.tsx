import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { funAnimationActionState } from '../states/VRMState';

const AngryButton: FC = () => {
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
      Angry
    </Button>
  );
};

export default AngryButton;
