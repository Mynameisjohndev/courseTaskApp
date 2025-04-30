
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Alert} from 'react-native';
import {IButtoRef} from '~/components/Button';
import {IContext} from '~/types/context';
import {CreateTask, Task} from '~/types/task';
import {User} from '~/types/user';
import {getStorage, setStorage} from '~/utils/AsyncStorage';
import { useThemeContext } from './themeContext';
import { getDatabaseConnection } from '~/databases';
import { createTask, getAllTasks } from '~/databases/tasks';

interface IUserContext {
  loading: boolean;
  user: User | null;
  initialRouteName: 'welcome' | 'login';
  loginButtonRef: RefObject<IButtoRef | null>;
  loadingSaveUser: boolean;
  handleSaveUser: (name: string) => void;
  tasks: Task[];
  handleCreateTask: (task: CreateTask, buttonRef: RefObject<IButtoRef | null>, setLoadingCreateTask: Dispatch<SetStateAction<boolean>>) => void;
  openModal: boolean;
  openAndCloseModal: () => void;
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const handleCreateTask = async({title,description}: CreateTask, buttonRef: RefObject<IButtoRef | null>, setLoadingCreateTask: Dispatch<SetStateAction<boolean>>) => {
    if(!title){
      return Alert.alert('Ops!', 'Você precisa informar o titulo da sua tarefa.');
    }
    setLoadingCreateTask(v => !v);
    buttonRef.current?.setActive(false);
    const db = await getDatabaseConnection();
    createTask({db, title,description}).then(()=>{
      setLoadingCreateTask(v => !v);
      buttonRef.current?.setActive(true);
      openAndCloseModal();
      loadTasks();
    });
  };

  const openAndCloseModal = () => {
    setOpenModal(v => !v);
  };

  useEffect(() => {
    if(loadedTheme){
      startAppData();
    }
  }, [loadedTheme]);

  const loadTasks = async () => {
    const db = await getDatabaseConnection();
    const results = await getAllTasks(db);
    setTasks(results);
  };

  useEffect(()=>{
    loadTasks();
  },[]);


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
        openModal,
        openAndCloseModal,
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
