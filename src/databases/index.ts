import SQL, { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { SqlScript } from '~/types/sqlScript';
import { UpdatedSript } from '~/types/updatedSript';
import { scripts } from './scripts';

export const getDatabaseConnection = async() => {
  return SQL.openDatabase({
    name: 'courseTaskApp.db',
    location: 'default',
  });
};

export const runDatabaseOperation = async<T> (
  db: SQLiteDatabase,
  sql: string,
  params: any[] = [],
  operation: (results: ResultSet) => T = (results) => results as unknown as T
) : Promise<T> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, results) => {
          try {
            resolve(operation(results));
          } catch (error) {
            reject(error);
          }
        }, (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const checkTable = (db: SQLiteDatabase, tableName: string): Promise<boolean> => {
  return runDatabaseOperation(
    db,
    'SELECT name FROM sqlite_master WHERE type = \'table\' AND name = ?;',
    [tableName],
    (results) => results.rows.length > 0
  );
};

const getUpdatedScript = (db: SQLiteDatabase): Promise<UpdatedSript | null> => {
  return runDatabaseOperation(
    db,
    'SELECT * FROM updated_script',
    [],
    (results) => results.rows.length > 0 ? results.rows.item(0) : null
  );
};

const setUpdatedScript = (db: SQLiteDatabase, scripts_count: number, id: number) => {
  return runDatabaseOperation(
    db,
    'UPDATE updated_script SET scripts_count = ? WHERE id = ?',
    [scripts_count, id],
  );
};

const createUpdatedScript = (db: SQLiteDatabase, scripts_count: number): Promise<void>  => {
  return runDatabaseOperation(
    db,
    'INSERT INTO updated_script (scripts_count) VALUES (?)',
    [scripts_count],
  );
};

const runScripts = async( db: SQLiteDatabase, scripts: SqlScript[]):Promise<void> => {
  for(const script of scripts){
    console.log(`EXECUTANDO SCRIPT ${script.title}`);
    await runDatabaseOperation(db, script.sql);
    console.log(`SUCESSO AO EXECUTAR  O SCRIPT ${script.title}`);
  }
};

export const startDatabase = async (): Promise<void> => {
  try {
    const db = await getDatabaseConnection();
    const tableUpdatedScriptExists = await checkTable(db, 'updated_script');
    if(!tableUpdatedScriptExists){
      await runScripts(db, scripts);
      await createUpdatedScript(db, scripts.length);
    }else{
      const updatedScript = await getUpdatedScript(db);
      const totalScripts = scripts.length;
      if(updatedScript){
        const executedCount = updatedScript.scripts_count;
        if(executedCount === totalScripts){
          console.log('O BANCO ESTA ATUALIZADO');
          return;
        }else{
          const scriptsRun = scripts.slice(executedCount);
          console.log(`RODANDO ${scriptsRun.length} SCRIPTS PENDENTES`);
          await runScripts(db, scripts);
          await setUpdatedScript(db, totalScripts, updatedScript.id);
        }
      }else{
        await runScripts(db, scripts);
        await createUpdatedScript(db, scripts.length);
      }
    }
  } catch (error) {
    console.log(`ERRO AO INICIAR O BANCO DE DADOS ${error}`);
    throw error;
  }
};
