import {useRef, useState} from 'react';
// import { Keyboard } from 'react-native';
import {Button, IButtoRef} from '~/components/Button';
import {Background, TitleT1, SubTitleT1, Content} from '~/global/styles';
import Ilustration from '~/assets/svgs/ilustrations/ilustration-welcome.svg';

const Welcome = () => {
  const buttonRef = useRef<IButtoRef>(null);
  const [loading, _] = useState(false);

  // const handleLogin = () => {
  //   setLoading(v => !v);
  //   buttonRef.current?.setActive(false);
  //   Keyboard.dismiss();
  //   setTimeout(()=>{
  //     setLoading(v => !v);
  //     buttonRef.current?.setActive(true);
  //   },2000);
  // };

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
        onPress={() => null}
      />
    </Background>
  );
};

export {Welcome};
