const mysql = require('mysql');
const inquirer = require('inquirer');
const products = require('./products');

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
  getUserSelection();
});

function getUserSelection() {
  const query = 'SELECT product_name, price FROM products';
  const choiceArray = connection.query(query, (err, res) => {
    if (err) throw err;
    const choiceArray = res.map(element => ({
      name: `${element.product_name} : ${element.price}`,
      value: element.product_name,
    }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'item',
        message: 'What would you like to buy?',
        choices: choiceArray,
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many?',
      },
    ]).then((answers) => {
      const userSelection = answers.item;
      const query = 'SELECT * FROM products WHERE ?';
      connection.query(query, { product_name: userSelection }, (err, res) => {
        if (err) throw err;
        const stockAvailable = (res[0].stock_quantity);
        if (stockAvailable - answers.quantity < 1) {
          console.log('Insufficient quantity!');
          getUserSelection();
        } else {
            const query = "UPDATE products SET stock_quantity = '10' WHERE ?";
            connection.query(query, { product_name: productName }, (err, res) => {
              if (err) throw err;
              console.log(`${res} - ${res.affectedRows} updated`);
            }
          }
      });
    });
  });
}
