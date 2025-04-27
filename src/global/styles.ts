import styled, { css } from 'styled-components/native';

const TitleT1 = styled.Text`
  ${({theme}) => css `
    font-size: ${theme.text_size.t1}px;
    color: ${theme.colors.title};
    font-family: ${theme.fonts.bold};
  `}
`;

const TitleT2 = styled.Text`
  ${({theme}) => css `
    font-size: ${theme.text_size.t2}px;
    color: ${theme.colors.title};
    font-family: ${theme.fonts.bold};
  `}
`;

const SubTitleT1 = styled.Text`
  ${({theme}) => css `
    font-size: ${theme.text_size.st1}px;
    color: ${theme.colors.subtitle};
    font-family: ${theme.fonts.light};
  `}
  text-align: center;
`;

const Background = styled.SafeAreaView`
  ${({theme}) => css `
    background-color: ${theme.colors.background};
  `};
  flex: 1;
  padding: 18px;
  justify-content: space-evenly;
  align-items: center;
  `;

const BackgroundScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    padding: 20,
  },
})`
  ${({theme}) => css `
    background-color: ${theme.colors.background};
  `};
  width: 100%;
  height: 100%;
  `;

const Content = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export {TitleT1, TitleT2, SubTitleT1, Background, Content, BackgroundScroll};
