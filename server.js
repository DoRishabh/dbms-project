import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();
const app = express();

const pool = mysql.createPool({
    host: '127.0.0.1', //localhost
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'khanaLudhiana'
});

//Create customer

app.listen(process.env.PORT, function(){
    console.log(`Listening to Port: ${process.env.PORT}`);
});

