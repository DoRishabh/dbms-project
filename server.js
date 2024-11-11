import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();
const app = express();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST, //localhost
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

connection.connect((err)=>{
    if(err){
        console.error("Error to connect to database", err);
    }else{
        console.log("connected to MySQL database");
    }
});

//CREATE
function insertValue(query, values){
    connection.query(query, values, (err, result)=>{
        if(err){
            console.error("Error inserting the data", err);
            return;
        }else{
            console.log("data inserted", result.insertId);
        }
    });
}

//READ
function readValue(query){
    connection.query(query, (err, result)=>{
        if(err){
            console.error("Error retrieving the data", err);
            return;
        }else{
            console.log("Data received", result);
        }
    });
}

//UPDATE
function updateValue(updateQuery, updateValues){
    connection.query(updateQuery, updateValues, (err, result)=>{
        if(err){
            console.error("Error updating the data", err);
            return;
        }else{
            console.log("Data updated:", result.affectedRows);
        }
    });
}

//DELETE
function deleteValue(deleteQuery, deleteValues){
    connection.query(deleteQuery, deleteValues, (err, result)=>{
        if(err){
            console.error("Error deleting the data:",err);
            return;
        }else{
            console.log("Data deleted", result.affectedRows);
        }
    });
}

var customer_query = "INSERT INTO customers(customer_name, customer_email, customer_phone) VALUES(?, ?, ?)";
var customer_value = ['Om Raja', 'omraja451@gmail.com', 8757710585];
const rre = insertValue(customer_query, customer_value);
console.log(rre);








app.listen(process.env.PORT, function(){
    console.log(`Listening to Port: ${process.env.PORT}`);
});

