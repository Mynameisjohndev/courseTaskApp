import {FC, useEffect, useRef, useState} from 'react';
import {Button, IButtoRef} from '~/components/Button';
import {Background, TitleT1, SubTitleT1, Content} from '~/global/styles';
import Ilustration from '~/assets/svgs/ilustrations/ilustration-welcome.svg';
import { AuthScreenProps } from '~/types/navigation';
import { setStorage } from '~/utils/AsyncStorage';

const Welcome: FC<AuthScreenProps<'welcome'>> = ({navigation}) => {
  const buttonRef = useRef<IButtoRef>(null);
  const [loading, _] = useState(false);

  useEffect(()=>{
    setStorage('@welcome', true);
  },[]);

  return (
    <Background>
      <Content>
        <Ilustration style={{marginBottom: 20}}/>
        <TitleT1>BEM-VINDO</TitleT1>
        <SubTitleT1>
          Para aprender mais, continue assistindo as aulas e praticando para
          aprender todo conteúdo!
        </SubTitleT1>
      </Content>
      <Button
        title="VAMOS LÁ"
        loading={loading}
        ref={buttonRef}
        onPress={() => navigation.reset({
          index: 0,
          routes: [{name: 'login'}],
        })}
      />
    </Background>
  );
};

export {Welcome};
