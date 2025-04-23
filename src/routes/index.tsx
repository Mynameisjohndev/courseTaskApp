import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '~/screens/Home';
import { Login } from '~/screens/Login';
import {Welcome} from '../screens/Welcome';
import { AppRoutesTypes, AuthRoutesTypes } from '~/types/navigation';

const AuthStack =  createNativeStackNavigator<AuthRoutesTypes>();
const AppStack =  createNativeStackNavigator<AppRoutesTypes>();

const AuthRoutes = () => {
  return(
    <AuthStack.Navigator initialRouteName="welcome" >
      <AuthStack.Screen name="welcome" component={Welcome}/>
      <AuthStack.Screen name="login" component={Login}/>
    </AuthStack.Navigator>
  );
};

const AppRoutes = () => {
  return(
    <AppStack.Navigator>
      <AppStack.Screen name="home" component={Home}/>
    </AppStack.Navigator>
  );
};

const Routes = () => {
  const loading = false;
  const user = false;
  return loading ? <></> : user ? <AppRoutes/> : <AuthRoutes/>;
};

export {Routes};
