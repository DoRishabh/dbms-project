--Add a New Customer:
INSERT INTO customers (customer_name, customer_email, customer_phone)
VALUES ('Jane Smith', 'jane.smith@example.com', '9876543210');

--Update Customer Information:
UPDATE customers
SET customer_email = 'jane.smith@newdomain.com'
WHERE customer_id = 1;

--Delete Customer Record (if no active reservations or orders):
DELETE FROM customers
WHERE customer_id = 2;

--Make a Reservation (check if table is available):
INSERT INTO reservations (reservation_date, reservation_time, customer_id)
SELECT '2024-12-01', '19:00', 1
WHERE NOT EXISTS (
    SELECT 1 FROM reservations
    WHERE reservation_date = '2024-12-01' AND reservation_time = '19:00'
);

--View All Reservations for a Date:
SELECT r.reservation_date, r.reservation_time, c.customer_name
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
WHERE r.reservation_date = '2024-12-01';

--Check Table Availability (for a specific date/time):
SELECT table_number, is_booked
FROM restaurant_tables
WHERE table_number NOT IN (
    SELECT order_table_number FROM orders
    WHERE order_date = '2024-12-01'
);

--Update Table Booking Status:
UPDATE restaurant_tables
SET is_booked = 1, customer_id = 1
WHERE table_number = 5;

--Place a New Order:
INSERT INTO orders (customer_id, order_date, order_table_number)
VALUES (1, CURRENT_DATE, 5);

--Add Items to an Order:
INSERT INTO order_items (order_id, dish_name, dish_quantity, dish_price)
VALUES (1, 'Paneer Butter Masala', 2, 150);

--Update Order Status (Mark as Completed):
UPDATE orders
SET order_status = 1
WHERE order_id = 1;


--Add a New Dish to the Menu:
INSERT INTO dishes (dish_name, dish_price, dish_description, dish_category)
VALUES ('Paneer Butter Masala', 150, 'A creamy paneer curry', 'Main Course');

--Update Dish Price:
UPDATE dishes
SET dish_price = 160
WHERE dish_name = 'Paneer Butter Masala';

--Total Sales for Today:
SELECT SUM(oi.dish_price * oi.dish_quantity) AS total_sales
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_date = CURRENT_DATE;


--Find the Most Ordered Dish (by quantity):
SELECT oi.dish_name, SUM(oi.dish_quantity) AS total_quantity
FROM order_items oi
GROUP BY oi.dish_name
ORDER BY total_quantity DESC
LIMIT 1;

--Find the Most Loyal Customer (by total orders):
SELECT c.customer_name, COUNT(o.order_id) AS total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_name
ORDER BY total_orders DESC
LIMIT 1;
