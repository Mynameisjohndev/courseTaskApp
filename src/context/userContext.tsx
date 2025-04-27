/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Alert} from 'react-native';
import {IButtoRef} from '~/components/Button';
import {IContext} from '~/types/context';
import {Task} from '~/types/task';
import {User} from '~/types/user';
import {getStorage, setStorage} from '~/utils/AsyncStorage';
import { useThemeContext } from './themeContext';

interface IUserContext {
  loading: boolean;
  user: User | null;
  initialRouteName: 'welcome' | 'login';
  loginButtonRef: RefObject<IButtoRef | null>;
  loadingSaveUser: boolean;
  handleSaveUser: (name: string) => void;
  tasks: Task[];
  handleCreateTask: (task: Task) => void;
  // setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext({} as IUserContext);

const UserContextProvider = ({children}: IContext) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [initialRouteName, setInitialRouteName] = useState<'welcome' | 'login'>(
    'welcome',
  );
  const loginButtonRef = useRef<IButtoRef>(null);
  const [loadingSaveUser, setLoadingSaveUser] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Ler livros',
      description: 'Desenvolver o hábito da leitura, ampliar conhecimentos, melhorar o vocabulário e estimular a criatividade por meio da leitura de livros.',
      complete: true,
    },
    {
      id: 2,
      title: 'Ler livros',
      description: 'Desenvolver o hábito da leitura, ampliar conhecimentos, melhorar o vocabulário e estimular a criatividade por meio da leitura de livros.',
      complete: true,
    },
    {
      id: 3,
      title: 'Ler livros',
      description: 'Desenvolver o hábito da leitura, ampliar conhecimentos, melhorar o vocabulário e estimular a criatividade por meio da leitura de livros.',
      complete: false,
    },
  ]);

  const {loadedTheme} = useThemeContext();

  const startAppData = async () => {
    setLoading(true);
    const welcomeExists = await getStorage('@welcome');
    const userExists = await getStorage('@user');
    if (userExists) {
      setUser(userExists);
    }
    if (welcomeExists && !user) {
      setInitialRouteName('login');
    } else if (!welcomeExists && !user) {
      setInitialRouteName('welcome');
    }
    setLoading(false);
  };

  const handleSaveUser = (name: string) => {
    if (name) {
      setLoadingSaveUser(v => !v);
      setStorage('@user', {name});
      setUser({name});
      setLoadingSaveUser(v => !v);
    } else {
      Alert.alert(
        'Ops!',
        'Você precisa informar o seu nome de usuário para entrar no app',
      );
    }
  };

  const handleCreateTask = (task: Task) => {};

  useEffect(() => {
    if(loadedTheme){
      startAppData();
    }
  }, [loadedTheme]);

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        initialRouteName,
        loginButtonRef,
        loadingSaveUser,
        handleSaveUser,
        tasks,
        handleCreateTask,
      }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export {UserContextProvider, useUserContext};
