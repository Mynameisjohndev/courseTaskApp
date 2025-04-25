import styled, { css } from 'styled-components/native';

interface IButtonContainer {
  isActive: boolean;
}

const ButtonContainer = styled.TouchableOpacity<IButtonContainer>`
  ${({theme: {colors, border_radius, button_height }, isActive}) => css `
    background-color: ${colors.button_background_color};
    border-radius: ${border_radius.b2}px;
    height: ${button_height}px;
    opacity: ${isActive ? 1 : 0.7};
  `}
  margin: 6px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ButtonTitle = styled.Text`
  ${({theme: {colors, fonts, text_size }}) => css `
    color: ${colors.button_title_color};
    font-family: ${fonts.bold};
    font-size: ${text_size.b1}px;
  `}
  width: 100%;
  text-align: center;
`;

const ButtonLoad = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.colors.background,
}))``;

export {ButtonContainer, ButtonTitle, ButtonLoad};
