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


function setProductQuantity(productName) {
  const query = "UPDATE products SET stock_quantity = '10' WHERE ?";
  connection.query(query, { product_name: productName }, (err, res) => {
    if (err) throw err;
    console.log(`${res} - ${res.affectedRows} updated`);
  });
}
