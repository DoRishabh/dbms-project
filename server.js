import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
function readValue(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);  // Reject if there is an error
            } else {
                resolve(result);  // Resolve with the result
            }
        });
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
    let date = req.body.date;
    let time = req.body.time;
    let customer_id = req.body.customer_id;

    const query = "INSERT INTO reservations (reservation_date, reservation_time, customer_id)VALUES(?, ?, ?)";
    const values = [date, time, customer_id];

    insertValue(query, values);
    res.send("Reserved");

});
app.post('/customer/place-order', async(req, res)=>{
    let customer_id = req.body.customer_id;
    let date = req.body.orderDate;
    let tableNumber = req.body.tableNumber;

    const query = "INSERT INTO orders(customer_id, order_date, order_table_number) VALUES(?, ?, ?)";
    const values = [customer_id, date, tableNumber];

    insertValue(query, values);
    res.send("Order placed");

});
app.get('/customer/past-orders', async(req, res)=>{
    let customer_id = req.body.customer_id;
    
    const query = `SELECT * FROM orders WHERE customer_id = ${customer_id}`;

    let orders = await readValue(query);
    res.json({data: orders});
});
app.get('/customer/menu', async(req, res)=>{
    let menu = await readValue("SELECT * FROM dishes");
    res.json({data: menu});
});
app.post('/employee/add-dish', async(req, res)=>{
    let name = req.body.dishName;
    let price = req.body.dishPrice;
    let description = req.body.dishDescription;
    let category = req.body.dishCategory;

    const query = "INSERT INTO dishes VALUES(?, ?, ?, ?)";
    const values = [name, price, description, category];

    insertValue(query, values);
    res.send("Dish added");
});
app.post('/employee/add-customer', async(req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;

    const query = "INSERT INTO customers(customer_name, customer_email, customer_phone) VALUES(?, ?, ?)";
    const values = [name, email, phone];

    insertValue(query, values);
    res.send("Customer added");
});
app.get('/employee/show-orders', async(req, res)=>{
    let date = req.body.date;

    const query = `SELECT * FROM orders WHERE order_date = ${date}`;
    let orders = await readValue(query);
    res.json({data: orders});
});
app.get('/employee/show-reservation', async(req, res)=>{
    let date = req.body.reservationDate;
    const query = `SELECT * FROM reservations WHERE reservation_date = ${date}`;
    let reservations = await readValue(query);
    res.json({data: reservations});

});
app.get('/manager/total-orders', async(req, res)=>{
    let date = req.body.date;
    const query = `SELECT COUNT(order_id) FROM orders WHERE order_date = ${date}`;
    let totalOrders = await readValue(query);
    res.json({data: totalOrders});
});
app.get('/manager/total-revenue', async(req, res)=>{
    let date = req.body.date;
    const query = `SELECT SUM(order_items.dish_price) FROM orders 
    INNER JOIN order_items ON orders.order_id = order_items.order_id 
    WHERE orders.order_date = ${date}`;
;
    let totalRevenue = await readValue(query);
    res.json({data: totalRevenue});
});
app.get('/manager/employee-list', async(req, res)=>{
   const query = "SELECT * FROM employees";
   let list = await readValue(query);
   res.json({data: list});
});

//global catch
function globalCatch(err, req, res, next){
    console.log(err);
    res.status(500).send("Error aa gaya bhai");
    return;
}
app.use(globalCatch);   



app.listen(process.env.PORT, function(){
    console.log(`Listening to Port: ${process.env.PORT}`);
});

