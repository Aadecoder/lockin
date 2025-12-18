import express from 'express'; 
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';

import journalRoutes from './routes/journalRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173",
    }))
}

app.use("/api/journal", journalRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server started at port 5001: ", PORT);
    });
});
