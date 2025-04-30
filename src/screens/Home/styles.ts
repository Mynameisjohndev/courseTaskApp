import styled from 'styled-components/native';
import { Background, TitleT2 } from '~/global/styles';

const HomeBackground = styled(Background)`
  justify-content: space-between;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HomeTitle = styled(TitleT2)`
  width: 80%;
  margin-right: 6px;
  `;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
`;

export {HomeBackground, Header, HomeTitle, FloatingButton};
