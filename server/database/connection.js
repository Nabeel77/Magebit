import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const db_connection = mysql.createPool({
  host: process.env.DB_ENDPOINT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const performQueryWithParams = async (query, params) => {
  return new Promise((resolve, reject) => {
    db_connection.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        db_connection.query(query, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release((err) => {
            if (err) throw new Error(err);
          });
        });
      }
    });
  });
};
