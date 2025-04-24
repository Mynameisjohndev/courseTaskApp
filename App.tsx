import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
    console.log(themeMode);
    return (
      <ThemeProvider theme={themeMode ? darkTheme : lightTheme}>
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
