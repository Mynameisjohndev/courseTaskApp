import { FC, useState } from 'react';
import { TextInputProps } from 'react-native';
import { TextInputStyled } from './styles';
import { useTheme } from 'styled-components/native';

const Input : FC<TextInputProps> = ({...rest}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const {colors} = useTheme();

  return(
    <TextInputStyled
      {...rest}
      isFocused={isFocused}
      placeholderTextColor={colors.input_placeholder_color}
      onFocus={() => setIsFocused(v => !v)}
      onBlur={() => setIsFocused(v => !v)}
    />
  );
};

export {Input};
