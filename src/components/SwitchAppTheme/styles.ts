import styled, { css } from 'styled-components/native';

const SwitchContainer = styled.View`
  width: 70px;
  height: 30px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme})=>theme.colors.theme_switch_background_color};
`;

interface ISwitchOption{
  themeMode: boolean;
  type: 'ligth' | 'dark';
}

const SwitchOption = styled.TouchableOpacity<ISwitchOption>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  ${({theme: {colors}, themeMode, type}) => type === 'ligth' && !themeMode ?
    css`
      background-color: ${colors.selected_theme};
      width: 35px;
    ` :
    type === 'dark' && themeMode ?
    css`
      background-color: ${colors.selected_theme};
      width: 35px;
    `
    : css``
  }
`;


export {SwitchContainer, SwitchOption};
