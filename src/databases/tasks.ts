import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { runDatabaseOperation } from '.';
import { CreateTask, DeleteTask, Task, ToggleTaskComplete, UpdateTask } from '~/types/task';

const getAllTasks = async (db: SQLiteDatabase) => {
  return runDatabaseOperation<Task[]>(
    db,
    'SELECT * FROM tasks ORDER BY complete ASC, id DESC',
    [],
    (results) => {
      return results.rows.raw();
    }
  );
};

const createTask = async ({db,title,description}:CreateTask) => {
  return runDatabaseOperation<number>(
    db,
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description || null],
    (results) => results.insertId
  );
};

const updateTask = async({db, id, title, description}:UpdateTask) => {
  return runDatabaseOperation<number>(
    db,
    'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
    [title, description || null, id],
    (results) => results.rowsAffected
  );
};

const deleteTask = async({db, id }: DeleteTask) => {
  return runDatabaseOperation<number>(
    db,
    'DELETE FROM tasks WHERE id = ?',
    [id],
    (results) => results.rowsAffected
  );
};

const toggleTaskComplete = async({db, id, complete}: ToggleTaskComplete) => {
  return runDatabaseOperation<number>(
    db,
    'UPDATE tasks SET complete = ? WHERE id = ?',
    [complete, id],
    (results) => results.rowsAffected
  );
};


export {getAllTasks, createTask, updateTask, deleteTask, toggleTaskComplete};
