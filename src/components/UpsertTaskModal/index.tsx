import {FC, useEffect, useRef, useState} from 'react';
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
  const {visible} = rest;
  const {input_height} = useTheme();
  const [loadingCreateTask, setLoadingCreateTask] = useState<boolean>(false);
  const {handleCreateTask, selectedTask, handleSaveEditTask, setSelectedTask} = useUserContext();
  const buttonRef = useRef<IButtoRef>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(()=>{
    if(selectedTask){
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }

    if(!visible){
      setSelectedTask(null);
      setTitle('');
      setDescription('');
    }
  },[selectedTask, visible, setSelectedTask]);

  return (
    <UpsertTaskModalContainer {...rest}>
      <UpsertTaskModalOverlayer onPress={openAndCloseModal}>
        <UpsertTaskModalKeyboard>
          <UpsertTaskModalContent>
            <UpsertTaskModalScroll>
              <UpsertTaskModalHeader>
                <UpsertTaskModalTitle>{selectedTask ? 'EDITAR TAREFA' : 'CRIAR TAREFA'}</UpsertTaskModalTitle>
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
                multiline
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
              title={selectedTask ? 'SALVAR' : 'CRIAR'} style={{marginBottom: 24}}
              ref={buttonRef}
              loading={loadingCreateTask}
              onPress={() => {
                selectedTask ?
                handleSaveEditTask({title, description, id: selectedTask.id, complete: selectedTask.complete}, buttonRef, setLoadingCreateTask) :
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
