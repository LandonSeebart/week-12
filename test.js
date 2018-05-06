var mysql = require("mysql");
var inquirer = require('inquirer');
var products = require("./products")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "6TacoMoose!",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  let item = "Coloring book"
  let column = "stock_quantity"
  getProductQuantity(column, item);
  connection.end();
});

function getProductQuantity(column, productName) {
  const query = `SELECT ${column} FROM products WHERE ?`;
    connection.query(query, { product_name: productName  }, function(err, res) {
        if (err) throw err;
        console.log(res[0].stock_quantity)
    });
}

// function setProductQuantity(column, product_name, data) {
//   if (err) throw err;
//   const query = "UPDATE products SET stock_quantity = '100' WHERE ?";
//   connection.query(query,{product_name: productName } function (err, res) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");
//   });
// });