const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '6TacoMoose!',
  database: 'bamazonDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  const productName = 'Coloring Book';
  setProductQuantity(productName);
  connection.end();
});

