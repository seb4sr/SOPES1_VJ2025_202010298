import { pool } from '../db/db.js'; 

export const cpuInfo = async (req, res) => {
    const url = "http://monitorserver:3000/monitorserver";
    console.log("Fetching CPU info from:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        const cpu = data.cpu;

       
        const [result] = await pool.execute(
            'INSERT INTO cpu (procesos_totales, procesos_ejecucion, uso_cpu) VALUES (?, ?, ?)',
            [cpu.procesos_totales, cpu.procesos_ejecucion, cpu.uso_cpu_estimado]
        );

        console.log("CPU Info insertado:", result);
        res.status(200).json({
            data: cpu
        });

    } catch (error) {
        console.error("Error al obtener o insertar CPU:", error);
        res.status(500).json({ error: "Error al obtener o insertar CPU" });
    }
};