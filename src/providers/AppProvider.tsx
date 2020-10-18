import React, { createContext, FC, useContext } from 'react';

interface AppStateProps {
  debug?: boolean;
}

const debug = process.env['REACT_APP_DEBUG'];

const initialState = {
  debug,
} as AppStateProps;

const AppState = createContext<AppStateProps>(initialState);

export function useAppState() {
  return useContext(AppState);
}

const AppProvider: FC = ({ children }) => {
  return <AppState.Provider value={initialState}>{children}</AppState.Provider>;
};

export default AppProvider;
