import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import TopPage from './pages/TopPage';
import TopPageProvider from './providers/TopPageProvider';

function App() {
  return (
    <TopPageProvider>
      <Container>
        <TopPage />
      </Container>
    </TopPageProvider>
  );
}

export default App;
