import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded());
app.set("view engine", "ejs");

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



app.post('/customer/reservation', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.post('/customer/place-order', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.get('/customer/past-orders', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.get('/customer/menu', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.post('/employee/add-dish', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.post('/employee/add-customer', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.get('/employee/show-orders', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.get('/employee/show-reservation', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.get('/manager/total-orders', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.get('/manager/total-revenue', async(req, res)=>{
    let time = req.body;
    console.log(time);
});
app.get('/manager/employee-list', async(req, res)=>{
    let time = req.body;
    console.log(time);
});





app.listen(process.env.PORT, function(){
    console.log(`Listening to Port: ${process.env.PORT}`);
});

