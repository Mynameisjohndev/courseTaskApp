import React, { useEffect } from 'react';
import { View } from 'react-native';
import { startDatabase } from '~/databases';

const Appp: React.FC = () => {
  useEffect(()=>{startDatabase();},[]);
  return <View />;
};

export default Appp;
