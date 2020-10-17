import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';

const TopPage: FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Canvas style={{ background: 'black', width: 320, height: 240, border: 'solid 1px black' }}>
        <directionalLight />
      </Canvas>
    </Box>
  );
};

export default TopPage;
