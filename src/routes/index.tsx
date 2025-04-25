import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '~/screens/Home';
import { Login } from '~/screens/Login';
import {Welcome} from '../screens/Welcome';
import { AppRoutesTypes, AuthRoutesTypes } from '~/types/navigation';
import { useUserContext } from '~/context/userContext';
import { LoadingScreen } from '~/screens/Loading';

const AuthStack =  createNativeStackNavigator<AuthRoutesTypes>();
const AppStack =  createNativeStackNavigator<AppRoutesTypes>();

const AuthRoutes = () => {
  const {initialRouteName} = useUserContext();
  return(
    <AuthStack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="welcome" component={Welcome}/>
      <AuthStack.Screen name="login" component={Login}/>
    </AuthStack.Navigator>
  );
};

const AppRoutes = () => {
  return(
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="home" component={Home} />
    </AppStack.Navigator>
  );
};

const Routes = () => {
  const {loading, user} = useUserContext();
  return loading ? <LoadingScreen/> : user ? <AppRoutes/> : <AuthRoutes/>;
};

export {Routes};
