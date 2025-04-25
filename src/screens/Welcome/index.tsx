import { useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { Button, IButtoRef } from '~/components/Button';
import { Input } from '~/components/Input';
import {Background, TitleT1, SubTitleT1} from '~/global/styles';

const Welcome = () => {

  const buttonRef = useRef<IButtoRef>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(v => !v);
    buttonRef.current?.setActive(false);
    Keyboard.dismiss();
    setTimeout(()=>{
      setLoading(v => !v);
      buttonRef.current?.setActive(true);
    },2000);
  };

  return (
    <Background>
      <TitleT1>BEM-VINDO</TitleT1>
      <SubTitleT1>
        Para aprender mais, continue assistindo as aulas e praticando para
        aprender todo conteúdo!
      </SubTitleT1>
      <Input placeholder="Username"/>
      <Input placeholder="Username"/>
      <Button title="PROSSEGUIR" loading={loading} ref={buttonRef} onPress={handleLogin}/>
    </Background>
  );
};

export {Welcome};
