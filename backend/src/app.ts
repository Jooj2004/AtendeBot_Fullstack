import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import mainRouter from './routes/main' 
import chatRouter from './routes/chatbot-public-routes'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'.../public')))
app.use(mainRouter)
app.use(chatRouter)

export default app