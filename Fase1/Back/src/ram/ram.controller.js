

import { pool } from '../db/db.js';

export const ramInfo = async (req, res) =>{

    const url = "http://monitorserver:3000/monitorserver";
    console.log("Fetching RAM info from:", url);
    
    
    try {
        const response = await fetch(url);
        const data = await response.json();
    
        const { RAM_Total, RAM_Libre, RAM_EnUso } = data.ram;
    
        const totalMB = (RAM_Total / 1024 / 1024).toFixed(2);
        const libreMB = (RAM_Libre / 1024 / 1024).toFixed(2);
        const usoMB = (RAM_EnUso / 1024 / 1024).toFixed(2);
    
        const query = `INSERT INTO ram (total, uso, libre) VALUES (?, ?, ?)`;
        const values = [totalMB, usoMB, libreMB];
    
        const [result] = await pool.execute(query, values);
    
        res.status(200).json({
          data: { totalMB, usoMB, libreMB }
        });
    
      } catch (error) {
        console.error("Error al obtener o insertar RAM:", error);
        res.status(500).json({ error: "Error al procesar los datos de RAM" });
      }
}