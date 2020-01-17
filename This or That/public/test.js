const express = require('express');
const app = express();
const path = require('path');
var appDir = path.dirname(require.main.filename);

const bodyParser = require('body-parser');
const fs = require('fs');

// read user form input
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('views', path.join(__dirname, 'views'));
// app.use("/public", express.static('public'))
app.use(express.static('/Users/TinaSu/Public/Hackathons/Arweave/Bookmark'));

app.set("view engine", "ejs");


var http = require('http').Server(app);
// var io = require('socket.io')(http);

// const Arweave = require('arweave/node');

// const arweave = Arweave.init({
//     host: '127.0.0.1',
//     port: 1984,
//     protocol: 'http'
// });

// const arweave = Arweave.init({
//     host: 'arweave.net',
//     port: 443,
//     protocol: 'https'
// });

// const address = 'b5mY3ct4snWkJ1juIbcraodAxL5B2x5dnjIC7mdDSz0';

// // get the balance of a wallet address
// arweave.wallets.getBalance(address).then((balance) => {
//     let winston = balance;
//     let ar = arweave.ar.winstonToAr(balance);

//     console.log(winston + ' winston');
//     //125213858712

//     console.log(ar + ' AR');
//     //0.125213858712
// });

// // get the last transaction ID from a wallet
// arweave.wallets.getLastTransactionID(address).then((transactionId) => {
//     console.log(`last transactionId: ${transactionId}`);
//     //3pXpj43Tk8QzDAoERjHE3ED7oEKLKephjnVakvkiHF8
// });


app.get('/', function(req, res){ 
     res.render('index',{user: "Great User",title:"homepage"});
});

// var value = "value";

// app.get('/', (req, res) => {
//   res.render('index')
//   // {
//   //     value: value
//   // });
// })


