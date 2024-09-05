import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { DB_Connection } from './DB_Connection/DB_Connection.js';
import { route } from './routes/routes.js';
dotenv.config()

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors())
app.use(express.json());
app.use('/productData',express.static("public"));

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/productData`)
    DB_Connection()
})
app.use(route)