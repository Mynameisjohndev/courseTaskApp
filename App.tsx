import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {AppContext} from '~/context';
import {useThemeContext} from '~/context/themeContext';
import {startDatabase} from '~/databases';
import {Routes} from '~/routes';
import {darkTheme, lightTheme} from '~/themes';

const App: React.FC = () => {
  useEffect(() => {
    startDatabase();
  }, []);

  const AppContent = () => {
    const {themeMode} = useThemeContext();
    const theme = themeMode ? darkTheme : lightTheme;
    const barStyle = themeMode ?  'light-content' :  'dark-content';
    return (
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.background} barStyle={barStyle}/>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    );
  };

  return (
    <AppContext>
      <AppContent />
    </AppContext>
  );
};

export default App;
