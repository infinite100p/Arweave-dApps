const myWallet = require('./public/js/wallet.js');
const mainJS = require('./public/js/main.js');

const express = require('express');
const app = express();
// var http = require('http');
// var io = require('socket.io')(http);


const path = require('path');


var appDir = path.dirname(require.main.filename);

const fs = require('fs');

const fileUpload = require('express-fileupload');

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
// var upload = multer({ dest: 'uploads/' })

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

var jwkJSON = require('./public/arweave-keyfile.json');


const port = 3000;

// app.use(session({
// 	secret: "secret privateKey"
// }))

// CORS
var cors = require('cors');
app.use(cors());

// app.use(function(req, res, next) {

//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Origin", "http://localhost");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use("/public", express.static('public'))
app.set("view engine", "ejs");

// app.use(jsonParser);
// // read user form input
// app.use(express.urlencoded({ extended: false })).use(express.json());

app.use(jsonParser);
app.use(urlencodedParser);

// app.use(cookieParser());


// app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	secret: "secret privateKey",
	resave: false,
	saveUninitialized: true,
	cookie: { secure: !true }
}));

// app.use(fileUpload());

// var http = require('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);


var urls = ['http://youtube.com'];
var url = 'http://youtube.com';

const Arweave = require('arweave/node');

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

const address = 'b5mY3ct4snWkJ1juIbcraodAxL5B2x5dnjIC7mdDSz0';

// module.exports = {
// 	userLoggedIn : userLoggedIn
// }

// var userLoggedIn = false;

// $(document).ready(() => {
// 	let logoutBtn = $('#logout');
// 	console.log('doc ready');
// 	console.log(`logoutClicked: ${mainJS.init()}`);


// 	// console.log(`userLoggedIn: ${userLoggedIn}`);
// 	// 	logoutBtn.on('click', () => {
// 	// 		// if (req.session.logged) {
// 	// 		// 	console.log('user logged in');
// 	// 		// 	req.session.destroy()
// 	// 		// 	// return res.redirect('/');
// 	// 		// } else {
// 	// 			console.log('Already logged out!');
// 	// 		// }
// 	// 	})	
// })


// // get the last transaction ID from a wallet
// arweave.wallets.getLastTransactionID(address).then((transactionId) => {
//     console.log(`last transactionId: ${transactionId}`);
//     //3pXpj43Tk8QzDAoERjHE3ED7oEKLKephjnVakvkiHF8
// });


// app.listen( port, () => console.log(`Server started on port ${port}`) );
// http.listen( port, () => console.log(`Server started on port ${port}`) );

// var http=require('http')
// var server=http.createServer((function(request,response)
// {
// 	response.writeHead(200,
// 	{"Content-Type" : "text/plain"});
// 	response.end("Hello World\n");
// }));
// server.listen(7000);

// 1
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   console.log('Server running on port 3000');
//   res.end();
// }).listen(3000);

// 2
http.listen(port, function() {
  console.log(`listening on ${port}`)
})

// server.listen(3000,function(){
// 	console.log('Server running on port 3000')
// });

var logged = false;


//  REAL - UNCOMMENT
// save credentials to current session when user logs in 
// loggedin?, wallet address, jwk
// app.post('/', function(req, res){
// 	// user just logged in
// 	// log user credentials
// 	if(req.body.privateKey && typeof req.session.logged !== undefined){
// 		var jwk = JSON.parse(req.body.jwk);

// 		var jwkJSONObject = {} // will later be filled with the data
// 		var req = new XMLHttpRequest();
// 		req.open('GET', './arweave-keyfile.json', false); 
// 		req.send(null);

// 		if(req.status == 200) { // 200 request status
// 		  jwkJSONObject = JSON.parse(req.responseText);
// 		}	
	
// 	// get the wallet address for a private key
// 		arweave.wallets.jwkToAddress(jwkJSON).then((address) => {
// 			// save user session details
// 			req.session.logged = true;
// 			req.session.address = address;
// 			req.session.privateKey = jwkJSON;
// 			req.session.save();

//     	}).catch((error) => {
// 			console.log(`ERR: ${error}`);
// 		});
//     	console.log(`user just logged in`);
    	
//     	// userLoggedIn = true;
// 	}
// 	// user already logged in
// 	// store user inputted form data on permaweave, sign transaction
// 	else if(req.body.url && req.session.logged){
// 		arweave.createTransaction({data: req.body.url + '|' + req.body.subject}, req.session.privateKey).then((transaction) =>{
// 			arweave.transactions.sign(transaction, req.session.privateKey).then((signedtransaction) => {
// 				arweave.transactions.post(transaction).then((response) => {
// 					console.log(response.status);
// 				}).catch((error) => {
// 					console.log(error);
// 				});
// 			}).catch((error) => {
// 				console.log(error);
// 			});
// 		}).catch((error) => {
// 			console.log(error);
// 		});
// 	}
// 	return res.redirect('/')
// })

function getImageFile() {
	let dfd = jQuery.Deferred();

	console.log('getImageFile called');

	io.on('connection', function (socket) {
		// send msg
	  socket.emit('from app.js', { msg: 'from app.js' });
	  // receive msg
	  socket.on('from contest-new', function (data) {
	    console.log(`imgFile type: ${typeof(data.img)}`); // File object

	    // TypeError [ERR_INVALID_ARG_VALUE]: The argument 'path' must be a string or Uint8Array without null bytes. Received <Buffer ff
		// fs.readFile(data.img, function(err, buffer) {
		// 	console.log(`Buffered file type: ${typeof(buffer)}`);

		// 	// })
	 //    });

		 	// let imgBuffer = fs.statSync(Buffer.from(data.img));
		 	// let imgBuffer = fs.readFileSync(data.img);

			dfd.resolve(data.img);

		});
	})

	return dfd.promise();
}

// io.on('connection', function (socket) {
// 	// send msg
//   socket.emit('from app.js', { msg: 'from app.js' });
//   // receive msg
//   socket.on('from contest-new', function (data) {
//     console.log(data.img);
//   });
// }); 

// create AR transaction, add tags, sign and submit to network
async function createARImageTransaction(img, req) {
	const appName = 'ARContest';
	const jwk = req.session.privateKey;

	console.log(`req.session.privateKey: ${req.session.privateKey}`) // exists
	// Buffer
	// The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type object
	let imgTransaction = await arweave.createTransaction({
		data: img
	}, req.session.privateKey);

	if (imgTransaction) {

		// imgTransaction.addTag('Content-Type', 'text/html');
		imgTransaction.addTag('type', 'image');
		imgTransaction.addTag('app', appName);

	    await arweave.transactions.sign(imgTransaction, jwk);
	    await arweave.transactions.post(imgTransaction);

	    console.log('AR transaction created')

		console.log(`imgTransaction type: ${typeof(imgTransaction)}`); // obj

		console.log(`imgTransaction: ${JSON.stringify(imgTransaction)}`); // transaction data

	    console.log(`AR transaction status: ${response.status}`);	

		console.log(`imgTransaction length: ${imgTransaction.length}`); // 0; undefined
	} else {
		console.log('imgTransaction undefined');
	}
	// Plain text
	// let transaction = arweave.createTransaction({
	//     data: firstImg
	// }, req.session.privateKey);	

	// console.log(`transaction: ${JSON.stringify(transaction)}`);	
}

// get AR transaction data
function getARTransactionData(txid) {
	arweave.transactions.getData(txid).then(data => {
  		console.log(`${data}`);
  // Uint8Array [10, 60, 33, 68, ...]
});
}

let txids = ['ml4T6DLrdK0SU4oD_hMYrxMsYqd9ULSN_J8LDbb-_F4', '5CsGV2RgZrzGgIUlWfvbe9QNTT8bgS7ko3gEL96kU2Y', 'RhB_QF-BQ6z68t26Dc8aPWrfTw_7p3jNxiWiRYdzf8M']

// // DEFAULT: index page
app.get('/', function(req, res){
	if(req.session.logged){
		myWallet.getAllTxids(req.session.address).then((txids) => {
				myWallet.getTransactionData(txids).then((allTxData) => {
			// txids.forEach((txid) => {
			// 	myWallet.getTxStatus(txid);
			// })
			return res.render('index', {logged: req.session.logged, txids: txids,  allTxData: allTxData, require: require, arweave: arweave});
		});
	})
	}else{
		return res.render('index', {logged: req.session.logged});
	};
});

// UNCOMMENT: get index page
// app.get('/', function(req, res){
	
// 	// req.session.logged = false;

// 	console.log(`req.session.address: ${req.session.address}`); 
// 	console.log(`jwkJSON type: ${typeof(jwkJSON)}`); //obj


// 	if(req.session.logged){
// 		let userAddress = req.session.address;

// 		myWallet.getWalletBalance(userAddress).then((balance) => {
// 			myWallet.getAllTxids(userAddress).then((txids) => {
// 			myWallet.getTransactionData(txids).then((allTxData) => {
				
// 					console.log(`allTxData: ${allTxData}`);
// 					console.log(`allTxData length: ${allTxData.length}`); // 10
// 					console.log(`jwk: ${JSON.stringify(req.session.privateKey)}`);

// 					return res.render('contest-new', {balance: balance, logged: req.session.logged, txids: txids, allTxData: allTxData});

// 				})
			
// 			});
// 		})
// 	}
// 	else{
// 		// console.log(`req.session.logged: ${req.session.logged}`)
// 		console.log(`not logged in`);
// 		return res.render('contest-new', {logged: req.session.logged});
// 	};
// });

// app.get('/', function(req, res){
// 	res.render('contest-new');
// })

app.get('/contest/new', function(req, res){
	// $('#testBtn').on('click', () => {
		$(".upld").change(function () {
			console.log('upld changed');
		    // readURL(this);
		    // $('#img1').
		// });
	})
	return res.render('contest-new');
})

// app.get('/contest/vote', function(req, res){
// 	let category = 'placeholder';
// 	return res.render('contest-vote', {logged: req.session.logged,category: category });
// })

// app.get('/contest/old', function(req, res){
	
// 	return res.render('contest-old', {logged: req.session.logged,category: category });
// })

// temp login via my local JSON keyfile
app.post('/privateKey', function(req, res){
	// get the wallet address for a private key
	myWallet.getWalletAddress(jwkJSON).then((address) => {
		// save user session details
		req.session.logged = true;
		req.session.address = address;
		req.session.privateKey = jwkJSON;
		req.session.save();
		console.log(`address1: ${req.session.address}`); // defined
	}).catch((error) => {
		console.log(error);
	});
	console.log(`user just logged in`);

	return res.redirect('/')
})

// var uploadedImgs = upload.fields([
// 		{ name: 'img1', maxCount: 1 }, 
// 		{ name: 'img2', maxCount: 1 }
// 	])

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
// 	let avatar = req.file;
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log(`avatar: ${JSON.stringify(avatar)}`); 
//   console.log(`isBuffer? ${Buffer.isBuffer(avatar)}`); // false
//   console.log(`obj type: ${Object.prototype.toString.call(avatar)}`); 
//   createARImageTransaction(avatar);

// })



// TypeError [ERR_INVALID_ARG_TYPE]: The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type object

app.post('/create-contest', upload.single('img1'), function (req, res) {
	let img1 = req.file;
	let img1_path = req.protocol + req.file.path;

	// if (! img1 || ! img1_path) {
	//   return res.sendStatus(400);
	// } else {
	
	// let img1 = req.files['img1'][0] // file
	// let img2 = req.files['img2'][0] // file
	// let img1 = req.file; // undefined
	// var req = new XMLHttpRequest();
	
		// console.log(`img1: ${JSON.stringify(img1)}`);

		// TypeError [ERR_INVALID_ARG_TYPE]: The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type object at Function.from
		
		// console.log(`isBuffer? ${Buffer.isBuffer(Buffer.from(img1))}`);
		// console.log(`img1 ${typeof Buffer.from(img1)} uploaded`);
		console.log(`img1 type: ${typeof(img1)}`);
		console.log(`img1 path: ${img1_path}`);
		console.log(`img1 path type: ${typeof(img1_path)}`);
		console.log(`img1 ${typeof Buffer.from(img1_path)} uploaded`);

		// createARImageTransaction(Buffer.from(img1_path), req);

		// upload image
		// send AR data transaction
		getImageFile().then((imgFile) => {
			// console.log(`imgBuffer retrieved by app.js: ${imgBuffer}`);

			createARImageTransaction(imgFile, req);
		})
		// createARImageTransaction(getImageFile());
		
	// } 
	// else {
	// 	console.log(`no file uploaded! req.file: ${img1}`);

	// }
})

app.post('/create-contest2', upload.none(), function (req, res) {
		console.log(`txt: ${req.body}`);
	})

// app.post('/create-contest', upload.single('img1'), function(req, res, next) {



// 	let img1 = req.file.img1;
// 	let img2 = req.file.img2;

// 	// let firstImg = req.files.img1;
// 	// let firstImgData = req.files.img1.data; // buffer

// 	console.log('contest form submitted');


// 	console.log(`img1: ${JSON.stringify(img1)}`);
// 	console.log(`img1 type: ${typeof(img1)}`); // str

// 	if (!req.files || Object.keys(req.files).length === 0) {
// 		return res.status(400).send('ERR 400: No files were uploaded.');
// 	}	

// 	// console.log(`firstImgData: ${JSON.stringify(firstImgData)}`); // buffer data
// 	// console.log(`firstImgData type: ${typeof(firstImgData)}`); // object

// 	// 
// 	// console.log(`firstImg type: ${typeof(firstImg)}`); // obj
// 	// console.log(`firstImg val: ${JSON.stringify(firstImg)}`); 

// 	// console.log(`jwk2: ${JSON.stringify(req.session.privateKey)}`);
// 	// console.log(`isLogged? ${req.session.logged}`);

	// io.on('connection', function (socket) {
	// 	// send msg
	//   socket.emit('from app.js', { msg: "private key" });
	//   // receive msg
	//   socket.on('from contest-new', function (data) {
	//     console.log(data.img);
	//   });
	// }); 
	
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;	

// 	// req.send('new contest saved!');
// })

// user logged out
app.all('/logout', function(req, res){
	req.session.destroy()
	// delete req.session;
	console.log('logout hit');
	// return response.redirect('index');
	return res.redirect('/');
});

app.all('/contest/:txid', function(req, res){
	var txid = req.params.txid;
	var url = '';
	var content = 'n/a';
	// var subject = '';
	console.log(`go to contest`);
	arweave.transactions.get(txid).then((transaction) => {
		var data = transaction.get('data', {decode: true, string: true}).split('|');
		// url = data[0];
		
		content = data[0];
		// subject = data[1];
		return res.render('contest', {
			logged: req.session.logged, 
			content: content
		});
	}).catch((error) => {
		console.log(error);
		return res.render('contest');
		// return res.redirect('/');
	});
});

function getContent(content) {
	if (content) {
		return content
	}
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

// $('#create-btn').on('click', () =>

// )

// $('.file-upload').file_upload();

// get user address


// decode tags from transactions
// arweave.transactions.get('bNbA3TEQVL60xlgCcqdz4ZPHFZ711cZ3hmkpGttDt_U').then(transaction => {

// 	transaction.get('tags').forEach(tag => {
//     let privateKey = tag.get('name', {decode: true, string: true});
//     let value = tag.get('value', {decode: true, string: true});
//     console.log(`tags = ${privateKey} : ${value}`);
//   });
// })


// store url on permaweave
// retrieve saved url from permaweave



// var value = "value";


// app.get('/', (req, res) => {
//   renderPage(res);
// })

// function renderPage(res) {
// 	myWallet.getWalletBalance(address).then((balance) => {
// 		myWallet.getAllTxids(address).then((txids) => {

// 		console.log(`balance is: ${balance}`);
// 		console.log(`txids: ${txids}`);

// 			res.render('index', 
// 				{ txids: txids, logged: logged})		
// 		})
// 	})
// }

