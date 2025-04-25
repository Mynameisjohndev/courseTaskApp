
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import {Background } from '~/global/styles';

const LoadingScreen = () => {
  const {colors} = useTheme();
  return (
    <Background>
      <ActivityIndicator color={colors.theme_switch_background_color} size="large"/>
    </Background>
  );
};

export {LoadingScreen};
