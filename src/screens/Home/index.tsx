import {FC, useEffect, useState} from 'react';
import {AppScreenProps} from '~/types/navigation';
import {FloatingButton, Header, HomeBackground, HomeTitle} from './styles';
import {useUserContext} from '~/context/userContext';
import {Content, SubTitleT1} from '~/global/styles';
import {Button} from '~/components/Button';
import Ilustration from '~/assets/svgs/ilustrations/ilustration-home.svg';
import {FlatList, Keyboard} from 'react-native';
import {SwitchAppTheme} from '~/components/SwitchAppTheme';
import {Search} from '~/components/Search';
import {ListCardTask} from '~/components/ListCardTask';
import {UpsertTaskModal} from '~/components/UpsertTaskModal';
import Plus from '~/assets/svgs/icons/plus.svg';
import {Task} from '~/types/task';

const Home: FC<AppScreenProps<'home'>> = ({}) => {
  const {user, tasks, openAndCloseModal, openModal} = useUserContext();

  const [search, setSearch] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [keyboardOpen, setkeyboardOpen] = useState<boolean>(false);

  useEffect(() => {
    const filtered = tasks.filter(task => {
      const lowerCaseSearch = search.toLowerCase();
      if (search === '') {
        return true;
      }
      return (
        task.title.toLowerCase().includes(lowerCaseSearch) ||
        task.description.toLowerCase().includes(lowerCaseSearch)
      );
    });
    setFilteredTasks(filtered);
  }, [search, tasks]);

  useEffect(()=>{
    const listeners = [
      Keyboard.addListener('keyboardDidShow', () => setkeyboardOpen(true)),
      Keyboard.addListener('keyboardDidHide', () => setkeyboardOpen(false)),
    ];
    return () => listeners.forEach(l => l.remove());
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
            showsVerticalScrollIndicator={false}
            data={filteredTasks}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => {
              return <ListCardTask {...item} key={item.id} />;
            }}
          />
          {!keyboardOpen && (
            <FloatingButton onPress={() => openAndCloseModal()}>
              <Plus width={45} height={45} />
            </FloatingButton>
          )}
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
          <Button title="CRIAR TAREFA" onPress={() => openAndCloseModal()} />
        </>
      )}
      <UpsertTaskModal
        {...{
          openAndCloseModal,
          visible: openModal,
        }}
      />
    </HomeBackground>
  );
};

export {Home};
