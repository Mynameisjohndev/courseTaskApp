import styled, { css } from 'styled-components/native';

const ListCardTaskContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  ${({theme: {colors, border_radius}}) => css`
    background-color: ${colors.card_background_color};
    border-radius: ${border_radius.b1}px;
  `};
`;

const ListCardTaskTitle = styled.Text`
  ${({theme}) => css `
    font-size: ${theme.text_size.t4}px;
    color: ${theme.colors.title};
    font-family: ${theme.fonts.bold};
  `}
`;

const ListCardTaskDescription = styled.Text.attrs({
  numberOfLines: 2,
})`
  ${({theme}) => css `
    font-size: ${theme.text_size.d1}px;
    color: ${theme.colors.card_description_color};
    font-family: ${theme.fonts.regular};
  `};
  margin-bottom: 6px;
`;

const ListCardTaskRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const ListCardTaskButton = styled.TouchableOpacity`
  margin: 0 4px;
`;

export {ListCardTaskContainer,ListCardTaskTitle, ListCardTaskDescription, ListCardTaskRow, ListCardTaskButton };
