import React, { FC, useEffect } from 'react';
import useAnimation from '../hooks/useAnimation';

const VRMAnimation: FC = () => {
  const { animation } = useAnimation();

  useEffect(() => {
    animation();
  }, [animation]);

  return <></>;
};

export default VRMAnimation;
