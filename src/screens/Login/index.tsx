import { KeyboardAvoidingView } from 'react-native';
import { BackgroundScroll, Content, TitleT2 } from '~/global/styles';

import Ilustration from '~/assets/svgs/ilustrations/ilustration-login.svg';
import { Input } from '~/components/Input';
import { Button } from '~/components/Button';
import { useUserContext } from '~/context/userContext';
import { useState } from 'react';

const Login = () => {

  const {handleSaveUser, loginButtonRef, loadingSaveUser} = useUserContext();
  const [name, setName] = useState<string>('');

  return(
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <BackgroundScroll>
        <Ilustration/>
        <Content>
          <TitleT2>ENTRAR</TitleT2>
          <Input placeholder="Username" value={name} onChangeText={setName}/>
          <Button title="PROSSEGUIR" onPress={() => handleSaveUser(name)} loading={loadingSaveUser} ref={loginButtonRef}/>
        </Content>
      </BackgroundScroll>
    </KeyboardAvoidingView>
  );
};

export {Login};
