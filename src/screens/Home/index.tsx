import {FC, useEffect, useState} from 'react';
import {AppScreenProps} from '~/types/navigation';
import {Header, HomeBackground, HomeTitle} from './styles';
import {useUserContext} from '~/context/userContext';
import {Content, SubTitleT1} from '~/global/styles';
import {Button} from '~/components/Button';
import Ilustration from '~/assets/svgs/ilustrations/ilustration-home.svg';
import {FlatList} from 'react-native';
import {SwitchAppTheme} from '~/components/SwitchAppTheme';
import {Search} from '~/components/Search';
import { ListCardTask } from '~/components/ListCardTask';
import { createTask, deleteTask, getAllTasks, toggleTaskComplete, updateTask } from '~/databases/tasks';
import { getDatabaseConnection } from '~/databases';

const Home: FC<AppScreenProps<'home'>> = ({}) => {
  const {user, tasks, handleCreateTask} = useUserContext();

  const [search, setSearch] = useState<string>('');

  const test = async() => {
    const db = await getDatabaseConnection();
    const result = await getAllTasks(db);
    console.log(result);
    // await createTask({db, title: 'Ler livros', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam iste molestiae fugit in assumenda cupiditate libero nesciunt, enim saepe e'});
    // await updateTask({db, title: 'Ler', description: 'Lorem ipsum dolor', id: 2});
    // await deleteTask({db, id: 2});
    // await toggleTaskComplete({db, id: 3, complete: false});
  };

  useEffect(()=>{
    test();
  },[]);

  return (
    <HomeBackground>
      <Header>
        <HomeTitle numberOfLines={1}>Olá, {user?.name}</HomeTitle>
        <SwitchAppTheme />
      </Header>
      {tasks.length > 0 ? (
        <>
          <Search value={search} onChangeText={setSearch} />
          <FlatList
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => {
              return <ListCardTask {...item} key={item.id}/>;
            }}
          />
        </>
      ) : (
        <>
          <Content>
            <Ilustration />
            <SubTitleT1>
              Parece que você não possui nenhuma tarefa criada ainda. Por que
              não começa a criar suas tarefas agora?
            </SubTitleT1>
          </Content>
          <Button
            title="CRIAR TAREFA"
            // ref={}
            // loading={}
            // onPress={()=>handleCreateTask({})}
          />
        </>
      )}
    </HomeBackground>
  );
};

export {Home};
