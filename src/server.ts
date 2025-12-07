import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from './routers/projectRoutes'
import authRoutes from './routers/authRoutes'

dotenv.config()
connectDB()
const app = express()
app.use(cors(corsConfig))

// loggin
app.use(morgan('dev'))
//Leer datos de formulario
app.use(express.json())
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app


