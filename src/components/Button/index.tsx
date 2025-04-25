import {forwardRef, useImperativeHandle, useState} from 'react';
import {TouchableOpacityProps} from 'react-native';
import {ButtonContainer, ButtonLoad, ButtonTitle} from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export interface IButtoRef {
  setActive: (value: boolean) => void;
  isActive: () => boolean;
}

const Button = forwardRef<IButtoRef, IButtonProps>(
  ({title, loading = false, ...rest}, ref) => {
    const [isActive, setIsActive] = useState<boolean>(true);
    useImperativeHandle(ref, () => ({
      setActive: (value: boolean) => setIsActive(value),
      isActive: () => isActive,
    }));

    return (
      <ButtonContainer
        {...rest}
        isActive={isActive}
        activeOpacity={0.7}
        disabled={!isActive || loading}>
        {loading ? <ButtonLoad /> : <ButtonTitle>{title}</ButtonTitle>}
      </ButtonContainer>
    );
  },
);

export {Button};
