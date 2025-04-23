import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import { ThemeProvider } from 'styled-components/native';
import {startDatabase} from '~/databases';
import { Routes } from '~/routes';
import { lightTheme } from '~/themes';

const App: React.FC = () => {
  useEffect(() => {
    startDatabase();
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
