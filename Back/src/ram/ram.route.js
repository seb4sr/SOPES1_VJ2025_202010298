import express from "express"
import { ramInfo } from "./ram.controller.js"

export const ramRouter = express.Router()

ramRouter.get("/ramInfo"  , ramInfo)