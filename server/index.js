import express from 'express';
import dotenv from 'dotenv';
import Connection from './config/database.js';
import router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
const username=process.env.username;
const password=process.env.password;
dotenv.config();
const app=express();
app.use(express.json());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)

app.use('/blog',router);
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
const PORT=process.env.PORT || 8000;

app.listen(PORT,console.log(`Server is running successfully at port no ${PORT}`));

Connection();