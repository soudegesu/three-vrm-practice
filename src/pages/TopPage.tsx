import { Box } from '@material-ui/core';
import React, { FC, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import VRMAvatar from '../components/VRMAvatar';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Canvas style={{ background: 'black', width: 600, height: 600, border: 'solid 1px black' }}>
        <Suspense fallback={null}>
          <directionalLight color="0xffffff" position={new Vector3(1.0, 1.0, 1.0).normalize()} />
          <VRMAvatar url={url} />
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default TopPage;
