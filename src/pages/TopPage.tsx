import { GridList, GridListTile } from '@material-ui/core';
import React, { FC } from 'react';
import VRMCanvas from '../components/VRMCanvas';
import VRMCanvasProvider from '../providers/VRMCanvasProvider';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';
  const cellWidth = 640;
  const cellHeight = 480;

  return (
    <GridList cols={2} cellHeight={cellHeight}>
      {[...Array(8)].map((_, i) => (
        <GridListTile key={i} cols={1}>
          <VRMCanvasProvider>
            <VRMCanvas url={url} height={cellHeight} width={cellWidth} />
          </VRMCanvasProvider>
        </GridListTile>
      ))}
    </GridList>
  );
};

export default TopPage;
