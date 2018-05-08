const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '6TacoMoose!',
  database: 'bamazonDB',
});

connection.connect((err) => {
  if (err) throw err;
  getUserSelection();
});

function getUserSelection() {
  const query = 'SELECT product_name, price FROM products';
  connection.query(query, (err, res) => {
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
      const query2 = 'SELECT * FROM products WHERE ?';

      connection.query(query2, { product_name: userSelection }, (error, response) => {
        if (error) throw error;

        const stockAvailable = (response[0].stock_quantity);
        const amountPurchased = answers.quantity;
        const updatedQuantity = stockAvailable - amountPurchased;
        if (updatedQuantity < 1) {
          console.log('Insufficient quantity!');
          getUserSelection();
        } else {
          const newQuery = `UPDATE products SET stock_quantity = ${updatedQuantity} WHERE ?`;

          connection.query(newQuery, { product_name: userSelection }, (err3) => {
            if (err3) throw err;
            console.log('All yours!');
          });
          connection.end();
        }
      });
    });
  });
}
