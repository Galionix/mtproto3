import sqlite3 from "sqlite3";

export default function select<T>(
  filePath: string,
  table: string
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(filePath);
    const queries: T[] = [];
    db.each(
      `SELECT * FROM ${table}`,
      (err, row: T) => {
        if (err) {
          reject(err); // optional: you might choose to swallow errors.
        } else {
          queries.push(row); // accumulate the data
        }
      },
      (err, n) => {
        if (err) {
          reject(err); // optional: again, you might choose to swallow this error.
        } else {
          resolve(queries); // resolve the promise
        }
      }
    );
  });
}
