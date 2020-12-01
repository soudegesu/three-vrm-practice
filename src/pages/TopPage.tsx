import { GridList, GridListTile } from '@material-ui/core';
import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import VRMCanvas from '../components/VRMCanvas';
import VRMCanvasProvider from '../providers/VRMCanvasProvider';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';
  const numOfAvatars = 8;
  const cellWidth = 640;
  const cellHeight = 480;

  return (
    <GridList cols={2} cellHeight={cellHeight}>
      {[...Array(numOfAvatars)].map((_, i) => (
        <GridListTile key={i} cols={1}>
          <RecoilRoot>
            <VRMCanvasProvider>
              <VRMCanvas url={url} height={cellHeight} width={cellWidth} />
            </VRMCanvasProvider>
          </RecoilRoot>
        </GridListTile>
      ))}
    </GridList>
  );
};

export default TopPage;
