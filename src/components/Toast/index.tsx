import Toast, {BaseToastProps} from 'react-native-toast-message';
import {
  AppName,
  CloseButton,
  Container,
  Content,
  Description,
  IconContainer,
  TextContainer,
} from './styles';
import {useThemeContext} from '~/context/themeContext';
import Task from '~/assets/svgs/icons/task.svg';
import Close from '~/assets/svgs/icons/close-modal.svg';

interface ICustomToast extends BaseToastProps {
  text1?: string;
}

const CustomToast = ({text1}: ICustomToast) => {
  const {themeMode} = useThemeContext();

  return (
    <Container
      style={{
        shadowColor: themeMode ? '#FFF' : '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 5,
      }}>
      <Content>
        <IconContainer>
          <Task />
        </IconContainer>
        <TextContainer>
          <AppName>App de tarefas</AppName>
          <Description>{text1}</Description>
        </TextContainer>
      </Content>
      <CloseButton onPress={() => Toast.hide()}>
        <Close />
      </CloseButton>
    </Container>
  );
};

const toastConfig = {
  success: ({text1}: ICustomToast) => <CustomToast text1={text1} />,
};

export {toastConfig};
