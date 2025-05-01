import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import {ThemeProvider} from 'styled-components/native';
import { toastConfig } from '~/components/Toast';
import {AppContext} from '~/context';
import {useThemeContext} from '~/context/themeContext';
import {startDatabase} from '~/databases';
import {Routes} from '~/routes';

const App: React.FC = () => {
  useEffect(() => {
    startDatabase();
  }, []);

  const AppContent = () => {
    const {themeMode, theme} = useThemeContext();
    const barStyle = themeMode ?  'light-content' :  'dark-content';
    if(theme){
      return (
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor={theme.colors.background} barStyle={barStyle}/>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          <Toast config={toastConfig}/>
        </ThemeProvider>
      );
    }
  };

  return (
    <AppContext>
      <AppContent />
    </AppContext>
  );
};

export default App;
