import styled, { css } from 'styled-components/native';

interface IInputProps {
  isFocused: boolean;
}

const TextInputStyled = styled.TextInput<IInputProps>`
  width: 100%;
  text-align: center;
  margin: 6px 0;
  ${({theme : {colors, fonts, border_radius, input_height, text_size}, isFocused}) => css`
    background-color: ${colors.input_background_color};
    color: ${colors.input_color};
    border: 2px solid ${isFocused ? colors.input_focus_border_color : colors.input_background_color};
    font-family: ${fonts.regular};
    font-size: ${text_size.t3}px;
    border-radius: ${border_radius.b2}px;
    height: ${input_height.normal}px;
  `}
`;

export {TextInputStyled};
