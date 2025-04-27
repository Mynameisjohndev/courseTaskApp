import {FC, useState} from 'react';
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

const Home: FC<AppScreenProps<'home'>> = ({}) => {
  const {user, tasks, handleCreateTask} = useUserContext();

  const [search, setSearch] = useState<string>('');

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
