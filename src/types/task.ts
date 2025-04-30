import { SQLiteDatabase } from 'react-native-sqlite-storage';

export type Task = {
  title: string;
  description: string;
  id: number;
  complete: boolean;
}

export type CreateTask = {
  db?: SQLiteDatabase;
  title: string;
  description?: string;
}

export type UpdateTask = {
  db: SQLiteDatabase;
  title: string;
  description?: string;
  id: number;
}

export type DeleteTask = {
  db: SQLiteDatabase;
  id: number;
}

export type ToggleTaskComplete = {
  db: SQLiteDatabase;
  id: number;
  complete: boolean;
}
