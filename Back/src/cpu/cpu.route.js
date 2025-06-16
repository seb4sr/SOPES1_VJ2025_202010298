import express from "express"
import { cpuInfo } from "./cpu.controller.js"

export const cpuRouter = express.Router()

cpuRouter.get("/cpuInfo"  , cpuInfo)