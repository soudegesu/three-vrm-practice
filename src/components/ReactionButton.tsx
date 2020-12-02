import { Button } from '@material-ui/core';
import React, { FC } from 'react';

const ReactionButton: FC = () => {
  const handleOnClick = () => {
    console.log('aaaaa');
  };
  return (
    <Button color="primary" variant="contained" onClick={handleOnClick}>
      Action O
    </Button>
  );
};

export default ReactionButton;
