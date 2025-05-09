
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
import { createTask, deleteTask, getAllTasks, toggleTaskComplete, updateTask } from '~/databases/tasks';
import Toast from 'react-native-toast-message';

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
  handleToggleTaskComplete: (id: number,  complete: 0 | 1) => void;
  handleDeleteTask: (id: number) => void;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  selectedTask: Task | null;
  handleOpenModalToEditTask: (task: Task) => void;
  handleSaveEditTask: (task: Task, buttonRef: RefObject<IButtoRef | null>, setLoadingCreateTask: Dispatch<SetStateAction<boolean>>) => void;
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
  const [selectedTask, setSelectedTask] = useState<Task|null>(null);


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
      Toast.show({
        text1: 'Tarefa criada com sucesso!',
        visibilityTime: 3000,
        type: 'success',
      });
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

  const handleToggleTaskComplete = (id: number, complete: 0 | 1) => {
    if(complete === 0 ){
      return Alert.alert('Você deseja terminar a tarefa?', 'Para concluir a tarefa pressione "sim".', [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: async() =>{
          const db = await getDatabaseConnection();
          toggleTaskComplete({db, id, complete: true}).then(()=>{
            loadTasks();
            Toast.show({
              text1: 'Tarefa concluida com sucesso!',
              visibilityTime: 3000,
              type: 'success',
            });
          });
        }},
      ]);
    }else{
      return Alert.alert('Você deseja reverter a tarefa?', 'Para reverter a tarefa pressione "sim".', [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: async() =>{
          const db = await getDatabaseConnection();
          toggleTaskComplete({db, id, complete: false}).then(()=>{
            loadTasks();
            Toast.show({
              text1: 'Tarefa revertida com sucesso!',
              visibilityTime: 3000,
              type: 'success',
            });
          });
        }},
      ]);
    }
  };

  const handleDeleteTask =  (id: number) => {
    return Alert.alert('Você deseja deletar a tarefa?', 'Para deletar a tarefa pressione "sim".', [
      {text: 'Não', style: 'cancel'},
      {text: 'Sim', onPress: async() =>{
        const db = await getDatabaseConnection();
        deleteTask({db, id}).then(()=>{
          loadTasks();
          Toast.show({
            text1: 'Tarefa deletada com sucesso!',
            visibilityTime: 3000,
            type: 'success',
          });
        });
      }},
    ]);
  };

  const handleOpenModalToEditTask = (task: Task) => {
    setSelectedTask(task);
    openAndCloseModal();
  };

  const handleSaveEditTask = (task: Task, buttonRef: RefObject<IButtoRef | null>, setLoadingCreateTask: Dispatch<SetStateAction<boolean>>) => {
    if(!task.title){
      return Alert.alert('Ops!', 'Você precisa informar o titulo da sua tarefa.');
    }
    setLoadingCreateTask(v => !v);
    buttonRef.current?.setActive(false);
    return Alert.alert('Você deseja salvar as alterações?', 'Para salvar pressione "sim".', [
      {text: 'Não', style: 'cancel'},
      {text: 'Sim', onPress: async() =>{
        const db = await getDatabaseConnection();
        updateTask({db, ...task}).then(()=>{
          setLoadingCreateTask(v => !v);
          buttonRef.current?.setActive(true);
          loadTasks();
          openAndCloseModal();
        });
      }},
    ]);
  };

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
        handleToggleTaskComplete,
        handleDeleteTask,
        selectedTask,
        setSelectedTask,
        handleOpenModalToEditTask,
        handleSaveEditTask,
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
