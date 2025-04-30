import styled, { css } from 'styled-components/native';

const SearchContainer = styled.View`
  margin: 16px 0;
  width: 100%;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  ${({theme: {border_radius, colors}}) => css `
    border-radius: ${border_radius.b1}px;
    background-color: ${colors.search_container_background_color};
    height: 50px;
  `}
`;

const SearchInput = styled.TextInput`
  flex: 0.98;
  ${({theme: {colors}}) => css `
    height: 50px;
    color: ${colors.input_color};
  `}
`;

export {SearchContainer, SearchInput};
