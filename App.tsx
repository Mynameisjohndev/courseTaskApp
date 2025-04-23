import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {startDatabase} from '~/databases';
import {Routes} from '~/routes';

const App: React.FC = () => {
  useEffect(() => {
    startDatabase();
  }, []);
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
