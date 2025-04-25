import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IContext } from '~/types/context';
import { getStorage } from '~/utils/AsyncStorage';

interface IUserContext {
  loading: boolean;
  user: any;
  initialRouteName: 'welcome' | 'login';
  // setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext({} as IUserContext);

const UserContextProvider = ({children}: IContext) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(null);
  const [initialRouteName, setInitialRouteName] = useState<'welcome' | 'login'>('welcome');

  const startAppData = async () => {
    setLoading(true);
    const welcomeExists = await getStorage('@welcome');
    console.log(welcomeExists);

    if(welcomeExists && !user){
      setInitialRouteName('login');
    }else if (!welcomeExists && !user){
      setInitialRouteName('welcome');
    }
    setLoading(false);

  };

  useEffect(()=>{
    startAppData();
  },[]);

  return(
    <UserContext.Provider value={{loading, user, initialRouteName}}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export {UserContextProvider, useUserContext};
