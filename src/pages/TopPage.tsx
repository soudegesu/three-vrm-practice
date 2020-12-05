import { Box, Grid, GridList, GridListTile } from '@material-ui/core';
import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import AngryButton from '../components/action/AngryButton';
import LikeButton from '../components/action/LikeButton';
import VRMCanvas from '../components/VRMCanvas';
import CanvasProvider from '../provider/CanvasProvider';

const TopPage: FC = () => {
  const url = '/models/AliciaSolid.vrm';
  const numOfAvatars = 1;
  const cellHeight = 700;
  const canvasWidth = 640;
  const canvasHeight = 480;

  return (
    <RecoilRoot>
      <GridList cols={2} cellHeight={cellHeight}>
        {[...Array(numOfAvatars)].map((_, i) => (
          <CanvasProvider key={i} canvasId={i}>
            <GridListTile cols={1}>
              <Box>
                <VRMCanvas url={url} height={canvasHeight} width={canvasWidth} />
              </Box>
              <Box marginTop={1}>
                <Grid container spacing={1}>
                  <Grid item>
                    <AngryButton />
                  </Grid>
                  <Grid item>
                    <LikeButton />
                  </Grid>
                </Grid>
              </Box>
            </GridListTile>
          </CanvasProvider>
        ))}
      </GridList>
    </RecoilRoot>
  );
};

export default TopPage;
