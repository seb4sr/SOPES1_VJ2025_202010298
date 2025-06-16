import express from "express"
import cors from 'cors';
import { ramRouter } from "./ram/ram.route.js"
import { cpuRouter } from "./cpu/cpu.route.js"

const PORT = 5002;

const server = express();
server.use(cors());

server.use(express.json());

server.use("/api",ramRouter) // /api/ramInfo
server.use("/api",cpuRouter) // /api/cpuInfo

server.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor escuchando en puerto 5002");
});

