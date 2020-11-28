import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import VRMCanvas from '../components/VRMCanvas';
import VRMCanvasProvider from '../providers/VRMCanvasProvider';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {[...Array(5)].map((_, i) => (
        <VRMCanvasProvider key={i}>
          <VRMCanvas url={url}></VRMCanvas>
        </VRMCanvasProvider>
      ))}
    </Box>
  );
};

export default TopPage;
