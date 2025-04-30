import NotChecked from '~/assets/svgs/icons/not-checked.svg';
import Checked from '~/assets/svgs/icons/checked.svg';
import Edit from '~/assets/svgs/icons/edit.svg';
import Delete from '~/assets/svgs/icons/delete.svg';

import { FC } from 'react';
import { Task } from '~/types/task';
import { useTheme } from 'styled-components/native';
import { ListCardTaskButton, ListCardTaskContainer, ListCardTaskDescription, ListCardTaskRow, ListCardTaskTitle } from './styles';
import { useUserContext } from '~/context/userContext';

const ListCardTask: FC<Task> = ({complete,description,id,title}) => {
  const { colors } = useTheme();
  const {handleToggleTaskComplete, handleDeleteTask} = useUserContext();
  return(
    <ListCardTaskContainer onPress={()=>handleToggleTaskComplete(id, complete ? 1 : 0)}>
      <ListCardTaskTitle>{title}</ListCardTaskTitle>
      <ListCardTaskDescription>{description}</ListCardTaskDescription>
      <ListCardTaskRow>
        <ListCardTaskButton disabled={true}>
          {complete ? <Checked fill={colors.complet_task_icon}/> : <NotChecked stroke={colors.not_complet_task_icon}/> }
        </ListCardTaskButton>
        <ListCardTaskButton onPress={() => handleDeleteTask(id)}>
          <Delete fill={colors.delete_icon}/>
        </ListCardTaskButton>
        <ListCardTaskButton>
          <Edit stroke={colors.edit_icon}/>
        </ListCardTaskButton>
      </ListCardTaskRow>
    </ListCardTaskContainer>
  );
};

export {ListCardTask};
