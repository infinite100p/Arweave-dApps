const Arweave = require('arweave/node');

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

// const add = function(x, y){
//     return x+y;
// }

module.exports = {
    // add:add,
    getWalletBalance:getWalletBalance,
    getAllTxids:getAllTxids,
    getTransactionData:getTransactionData,
    getWalletAddress: getWalletAddress,
    getTxStatus: getTxStatus,
    getAllTxData: getAllTxData
}

async function getWalletAddress(jwk) {
    return arweave.wallets.jwkToAddress(jwk);
}

// function getAllPortfolioTransactions = async (address) => {
//     const query = {
//         op: 'and',
//         expr1: {
//             op: 'equals',
//             expr1: 'from',
//             expr2: walletAddress
//         },
//         expr2: {
//             op: 'equals',
//             expr1: 'App-Name',
//             expr2: getAppName()
//         }
//     };
// }

// get data for each transaction id in array
function getAllTxData(txids) {
	let allTxData = [];
	txids.forEach((txid) =>  {
		arweave.transactions.getData(txid).then(data => {
			allTxData.push(data);
		})	
	})
	console.log(`allTxData: ${JSON.stringify(allTxData)}`)
	return allTxData;
}

// get all tags for transaction
function getTxTags(address) {
	const transaction = arweave.transactions.get(address).then(transaction => {

		// get transaction tags
		transaction.get('tags').forEach(tag => {
			let key = tag.get('name', {decode: true, string: true});	
			let value = tag.get('value', {decode: true, string: true});
			console.log(`tags -> ${key} : ${value}`);	

		})
	})
}

// get all txids of address
async function getAllTxids(address) {
	const query = {
		op: 'equals',
		expr1: 'from',
		expr2: address
	};

	const txids = await arweave.arql(query);

	// const res = await arweave.api.post('arql', query);

	// let txids = [];

	console.log(`txids: ${JSON.stringify(txids)}`);
	console.log(`txids count: ${txids.length}`);
	// ["r4ArnEPyIH3ZvJ39PpMM1WpvVYr0F6G3X6nfravTb24","ml4T6DLrdK0SU4oD_hMYrxMsYqd9ULSN_J8LDbb-_F4","5CsGV2RgZrzGgIUlWfvbe9QNTT8bgS7ko3gEL96kU2Y","RhB_QF-BQ6z68t26Dc8aPWrfTw_7p3jNxiWiRYdzf8M"]
	

	// if(txids && txids.length > 0) {
	// 	txids = await Promise.all(res.data.map(async txid => {
	// 		return txid;
	// 	}));
	// }
	return txids;	
}

// get the balance of a wallet address
function getWalletBalance(address) {
	let dfd = jQuery.Deferred();
	// let balance;

	arweave.wallets.getBalance(address).then((balance) => {
	    let winston = balance;
	    let ar = arweave.ar.winstonToAr(balance);

	    balance = ar + ' AR';

	    console.log(winston + ' winston');
	    //125213858712

	    console.log(ar + ' AR');

	    dfd.resolve(balance);
	    //0.125213858712
	})
	return dfd.promise();
}

// Get the data decoded as string data for all txids
function getTransactionData(txids) {
	let dfd = jQuery.Deferred();

	let allTxData = [];

	const transaction = arweave.transactions.get('r4ArnEPyIH3ZvJ39PpMM1WpvVYr0F6G3X6nfravTb24').then(transaction => {
		console.log(`last transaction data: ${JSON.stringify(transaction)}`);
	})

	txids.forEach(txid => {
		let txObj = {};

		arweave.transactions.getData(txid, {decode: true, string: true}).then(data => {
			txObj.txid = txid;
			txObj.data = data;

			// allTxData = await Promise.all(allTxData.push({txObj}));

			// allTxData.push(data);

			allTxData.push({txObj});

		  // console.log(`data for ${txid}: ${data}`);
		  console.log(`allTxData: ${JSON.stringify(allTxData)}`);
		  // console.log(`allTxData length: ${allTxData.length}`);

		  // Promise.all([promise1, promise2, promise3]).then(function(values) {
			 //  console.log(values);
		  // });
		  dfd.resolve(allTxData);

		});
		// console.log(`allTxData length: ${allTxData.length}`);

		// return allTxData;
		
	})

	return dfd.promise();
}

function getTxStatus(txid) {
	let dfd = jQuery.Deferred();
	arweave.transactions.getStatus(txid).then((statusObj) => {
		let status = JSON.stringify(statusObj.status);
	    console.log(`Tx Id: ${txid} status: ${status}`); // 200
	    dfd.resolve(status);
	})	

	return dfd.promise();
}
