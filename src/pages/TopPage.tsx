import { Box } from '@material-ui/core';
import React, { FC, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import VRMAvatar from '../components/VRMAvatar';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';
  const width = 320;
  const height = 240;

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Canvas style={{ background: 'black', width, height, border: 'solid 1px black' }}>
        <Suspense fallback={null}>
          <VRMAvatar url={url} />
        </Suspense>
        <gridHelper />
        <axesHelper />
      </Canvas>
    </Box>
  );
};

export default TopPage;
