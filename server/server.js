import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import { db_connection } from "./DB Connection/db_connection.js";
import { route } from "./routes/routes.js";
import { router } from "./routes/router.js";


dotenv.config();

const port= process.env.PORT || 8080;
const app = express();
app.use(cors())




app.use(express.json())
app.use('/productData',express.static("public"));
app.listen(port,()=>{
  console.log(process.env.HTTP_LINK + port);
  db_connection()
})
app.use(router)
app.use(route)