import { Input } from '~/components/Input';
import {Background, TitleT1, SubTitleT1} from '~/global/styles';

const Welcome = () => {

  return (
    <Background>
      <TitleT1>BEM-VINDO</TitleT1>
      <SubTitleT1>
        Para aprender mais, continue assistindo as aulas e praticando para
        aprender todo conteúdo!
      </SubTitleT1>
      <Input placeholder="Username"/>
      <Input placeholder="Username"/>
    </Background>
  );
};

export {Welcome};
