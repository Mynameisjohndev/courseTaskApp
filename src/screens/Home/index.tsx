import { FC } from 'react';
import { Text, View } from 'react-native';
import { AppScreenProps } from '~/types/navigation';

const Home: FC<AppScreenProps<'home'>> = ({}) => {
  return(
    <View>
      <Text>Home</Text>
    </View>
  );
};

export {Home};
