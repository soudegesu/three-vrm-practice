import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import VRMCanvas from '../components/VRMCanvas';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <VRMCanvas url={url}></VRMCanvas>
    </Box>
  );
};

export default TopPage;
