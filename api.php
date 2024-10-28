<?php
header('Content-Type: application/json');
include 'db.php';

// Example of a SQL query
$sql = "SELECT * FROM your_table";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row; // Collect each row in the array
    }
}

echo json_encode($data); // Return the data as a JSON response

$conn->close(); // Close the database connection
?>
