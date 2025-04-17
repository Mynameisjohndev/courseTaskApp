import SQL, { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';

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
