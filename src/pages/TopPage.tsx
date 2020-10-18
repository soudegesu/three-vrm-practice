import { Box } from '@material-ui/core';
import React, { FC, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import VRMAvatar from '../components/VRMAvatar';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Canvas style={{ background: 'black', width: 320, height: 240, border: 'solid 1px black' }}>
        <Suspense fallback={null}>
          <directionalLight />
          <VRMAvatar url={url} />
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default TopPage;
