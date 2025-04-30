import {FC} from 'react';
import {ModalProps, TouchableOpacity} from 'react-native';
import Close from '~/assets/svgs/icons/close-modal.svg';
import {
  UpsertTaskModalContainer,
  UpsertTaskModalContent,
  UpsertTaskModalHeader,
  UpsertTaskModalKeyboard,
  UpsertTaskModalOverlayer,
  UpsertTaskModalScroll,
  UpsertTaskModalTitle,
} from './styles';
import { Input } from '../Input';
import { Button } from '../Button';
import { useTheme } from 'styled-components/native';

interface IUpsertTaskModal extends ModalProps {
  openAndCloseModal: () => void;
}

const UpsertTaskModal: FC<IUpsertTaskModal> = ({
  openAndCloseModal,
  ...rest
}) => {
  const {input_height} = useTheme();
  return (
    <UpsertTaskModalContainer {...rest}>
      <UpsertTaskModalOverlayer onPress={openAndCloseModal}>
        <UpsertTaskModalKeyboard>
          <UpsertTaskModalContent>
            <UpsertTaskModalScroll>
              <UpsertTaskModalHeader>
                <UpsertTaskModalTitle>CRIAR TAREFA</UpsertTaskModalTitle>
                <TouchableOpacity onPress={openAndCloseModal}>
                  <Close width={20} height={20}/>
                </TouchableOpacity>
              </UpsertTaskModalHeader>
              <Input placeholder="Titulo" style={{textAlign: 'left'}}/>
              <Input placeholder="Descrição" style={{textAlign: 'left', height: input_height.description}} textAlignVertical="top"/>
              <Button title="CRIAR TAREFA" style={{marginBottom: 24}}/>
            </UpsertTaskModalScroll>
          </UpsertTaskModalContent>
        </UpsertTaskModalKeyboard>
      </UpsertTaskModalOverlayer>
    </UpsertTaskModalContainer>
  );
};

export {UpsertTaskModal};
