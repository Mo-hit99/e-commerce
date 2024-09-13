import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import { db_connection } from "./DB Connection/db_connection.js";
import { route } from "./routes/routes.js";

dotenv.config();

const app = express();

const port= process.env.PORT || 8080;


app.use(cors())
app.use(express.json())

app.use('/productData',express.static("public"));

app.listen(port,()=>{
  console.log(`http://localhost:${port}/user`);
  db_connection()
})
app.use(route)