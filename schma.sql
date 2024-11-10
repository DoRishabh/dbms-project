CREATE DATABASE khana_ludhiana;
USE khana_ludhiana;

-- creating all tables
CREATE TABLE customers(
    customer_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    customer_name VARCHAR(30) NOT NULL,
    customer_email VARCHAR(30),
    customer_phone CHAR(10)
);

CREATE TABLE employees(
    employee_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    employee_name VARCHAR(30) NOT NULL,
    employee_role VARCHAR(30),
    employee_salary INT    
);

CREATE TABLE restaurant_tables(
    table_number INT PRIMARY KEY NOT NULL,
    is_booked TINYINT(1) UNSIGNED DEFAULT 0, -- BOOLEAN
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE orders(
    order_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE DEFAULT CURRENT_TIMESTAMP,
    order_status TINYINT(1) UNSIGNED DEFAULT 0, --BOOLEAN
    order_table_number INT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(order_table_number) REFERENCES restaurant_tables(table_number) ON UPDATE CASCADE
);

CREATE TABLE dishes(
    dish_name VARCHAR(30) NOT NULL,
    dish_price INT,
    dish_description VARCHAR(100),
    dish_category VARCHAR(20),
    PRIMARY KEY(dish_name)
);


CREATE TABLE order_items(
    order_id INT NOT NULL,
    dish_name VARCHAR(30) NOT NULL,
    dish_quantity INT NOT NULL,
    dish_price FLOAT,
    PRIMARY KEY(order_id, dish_name), --composite primary key
    FOREIGN KEY(order_id) REFERENCES orders(order_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(dish_name) REFERENCES dishes(dish_name) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE reservations(
    reservation_date DATE NOT NULL,
    reservation_time TIMESTAMP NOT NULL,
    customer_id INT NOT NULL,
    PRIMARY KEY(reservation_date, reservation_time, customer_id), --composite primary key
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

--if we use any key as a foreign key. Then make sure that is defined as a primary key before this, basically the parent table should be defined before child table
--for ex: if we use customer_id as a foreign key in orders table then make sure that customer table is defined before orders table


