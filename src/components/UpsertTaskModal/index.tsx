import {FC, useRef, useState} from 'react';
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
import {Input} from '../Input';
import {Button, IButtoRef} from '../Button';
import {useTheme} from 'styled-components/native';
import { useUserContext } from '~/context/userContext';

interface IUpsertTaskModal extends ModalProps {
  openAndCloseModal: () => void;
}

const UpsertTaskModal: FC<IUpsertTaskModal> = ({
  openAndCloseModal,
  ...rest
}) => {
  const {input_height} = useTheme();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loadingCreateTask, setLoadingCreateTask] = useState<boolean>(false);
  const {handleCreateTask} = useUserContext();
  const buttonRef = useRef<IButtoRef>(null);

  return (
    <UpsertTaskModalContainer {...rest}>
      <UpsertTaskModalOverlayer onPress={openAndCloseModal}>
        <UpsertTaskModalKeyboard>
          <UpsertTaskModalContent>
            <UpsertTaskModalScroll>
              <UpsertTaskModalHeader>
                <UpsertTaskModalTitle>CRIAR TAREFA</UpsertTaskModalTitle>
                <TouchableOpacity onPress={openAndCloseModal}>
                  <Close width={20} height={20} />
                </TouchableOpacity>
              </UpsertTaskModalHeader>
              <Input
                placeholder="Titulo"
                style={{textAlign: 'left'}}
                value={title}
                onChangeText={setTitle}
              />
              <Input
                placeholder="Descrição"
                style={{
                  textAlign: 'left',
                  height: input_height.description,
                  marginBottom: 24,
                }}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
              <Button
              title="CRIAR TAREFA" style={{marginBottom: 24}}
              ref={buttonRef}
              loading={loadingCreateTask}
              onPress={()=>{
                handleCreateTask({title, description}, buttonRef, setLoadingCreateTask);
              }}/>
            </UpsertTaskModalScroll>
          </UpsertTaskModalContent>
        </UpsertTaskModalKeyboard>
      </UpsertTaskModalOverlayer>
    </UpsertTaskModalContainer>
  );
};

export {UpsertTaskModal};
