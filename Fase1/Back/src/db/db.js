import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'p1-sopes1-mysql',          // ← nombre del servicio/contenedor MySQL
  user: 'root',
  password: '123',
  database: 'SOPES1P1',
  port: 3306              // opcional; 3306 es el puerto interno por defecto
});