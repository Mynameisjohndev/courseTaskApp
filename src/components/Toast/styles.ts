import styled, { css } from 'styled-components/native';

const Container = styled.View`
  ${({theme:{colors, notification_height, border_radius}})=> css`
      background-color: ${colors.background};
      min-height: ${notification_height}px;
      border-radius: ${border_radius.b2}px;
  `}
  position: absolute;
  left: 20px;
  right: 20px;
  padding: 16px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View`
  margin-right: 12px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const AppName = styled.Text`
  ${({theme: {text_size, colors, fonts}}) => css `
    color: ${colors.title};
    font-size: ${text_size.t4}px;
    font-family: ${fonts.bold};
  `}
`;

const Description = styled.Text`
  ${({theme: {text_size, colors, fonts}}) => css `
    color: ${colors.card_description_color};
    font-size: ${text_size.d1}px;
    font-family: ${fonts.regular};
  `}
`;

const CloseButton = styled.TouchableOpacity`
  margin-left: 12px;
  padding: 4px;
  align-self: flex-start;
  margin-top: 4px;
`;


export  {
  Container,
  Content,
  IconContainer,
  TextContainer,
  AppName,
  Description,
  CloseButton,
};
