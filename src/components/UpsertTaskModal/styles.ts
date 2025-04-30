import styled, { css } from 'styled-components/native';

const UpsertTaskModalContainer = styled.Modal.attrs({
  transparent: true,
  animationType: 'slide',
})``;

const UpsertTaskModalOverlayer = styled.Pressable`
  flex: 1;
  background-color: rgba(0,0,0,0.2);
`;

const UpsertTaskModalKeyboard = styled.KeyboardAvoidingView.attrs({behavior: 'padding'})`
  flex: 1;
  justify-content: flex-end;
`;

const UpsertTaskModalContent = styled.Pressable`
  ${({theme: {modal_height, colors, border_radius}}) => css`
    min-height: ${modal_height};
    background-color: ${colors.background};
    border-radius: ${border_radius.b3}px ${border_radius.b3}px 0 0;
  `}
`;

const UpsertTaskModalScroll = styled.ScrollView`
  padding: 0px 24px 0px 24px;
`;

const UpsertTaskModalHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0;
`;

const UpsertTaskModalTitle = styled.Text`
  ${({theme}) => css `
    font-size: ${theme.text_size.t3}px;
    color: ${theme.colors.title};
    font-family: ${theme.fonts.bold};
  `}
`;



export {
  UpsertTaskModalContainer,
  UpsertTaskModalOverlayer,
  UpsertTaskModalKeyboard,
  UpsertTaskModalContent,
  UpsertTaskModalScroll,
  UpsertTaskModalHeader,
  UpsertTaskModalTitle,
};
