import { SqlScript } from '~/types/sqlScript';

export const script1: SqlScript[] = [
  {
   title: 'CREATE TABLE tasks',
   sql: `
    CREATE TABLE IF NOT EXISTS tasks (
      id           INTEGER PRIMMARY KEY AUTOINCREMENT,
      title        VARCHAR NOT NULL,
      description  VARCHAR,
      complete     BOOLEAN DEFAULT 0
    )
   `,
  },
  {
   title: 'CREATE TABLE updated_script',
   sql: `
    CREATE TABLE IF NOT EXISTS updated_script (
      id                   INTEGER PRIMMARY KEY AUTOINCREMENT,
      scripts_count        INTEGER NOT NULL
    )
   `,
  },
];
