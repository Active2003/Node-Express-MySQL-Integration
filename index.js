// Required modules for server setup
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 5001;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost', // Remove port from 'localhost'
  user: 'root',
  password: 'Kaustubh@mysql',
  database: 'agrico_db'
});

const bcrypt = require('bcrypt');

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Route to handle Buyer Login form submission
app.post('/BuyerLogin', (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'INSERT INTO buyer_info (buyeremail, buyerpassword) VALUES (?, ?)';
    connection.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error('Error inserting Buyer Login data:', err);
        res.status(500).send('Error inserting Buyer Login data');
      } else {
        console.log('Buyer Login data inserted into MySQL!');
        res.status(200).send('Buyer Login data inserted successfully!');
      }
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
