import { useTheme } from 'styled-components/native';
import SearchIcon from '~/assets/svgs/icons/search.svg';
import { SearchContainer, SearchInput } from './styles';
import { FC } from 'react';
import { TextInputProps } from 'react-native';

const Search: FC<TextInputProps> = ({...rest}) => {

  const {colors} = useTheme();

  return (
    <SearchContainer>
      <SearchInput {...rest} />
      <SearchIcon fill={colors.search_icon}/>
    </SearchContainer>
  );
};

export {Search};
