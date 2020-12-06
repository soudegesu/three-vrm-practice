import React, { FC, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { statsAtom } from '../../states/VRMState';

const StatsPanel: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const stats = useRecoilValue(statsAtom);

  useEffect(() => {
    if (ref && ref.current) {
      stats.showPanel(0);
      ref.current.appendChild(stats.dom);
    }
  }, [ref]);

  return <div ref={ref}></div>;
};

export default StatsPanel;
