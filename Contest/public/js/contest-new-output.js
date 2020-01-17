(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],2:[function(require,module,exports){
(function (Buffer){
$(document).ready(() => {
	console.log(`doc ready`);
	// $('select>option:eq(2)').prop('selected', true);
	imgUploadHandler(getSelected());

	showUploader();
	// runSocket();

	
})

const appName = 'ARContest';

function imgUploadHandler(mediaType) {
	console.log('imgUploadHandler called');
	if (mediaType=="image") {
		console.log('img selected');

		$(".upld").change(function () {
			console.log('img uploaded');
		    readURL(this);
		});
	} else {
		console.log(`mediaType != image. mediaType is ${mediaType}`);
	}	
}

function getUploader(mediaType) {
	return $(`#${mediaType}-uploader`);
}

// display uploader matching selected media type
function showUploader() {
	let prev = getUploader(getSelected());
	show(prev);

	$('#ftSelector').change(() => {
		let mediaType = getSelected();
		let uploader = getUploader(mediaType);

		console.log(`mediaType: ${mediaType}`);
		// $('#media-type').html(mediaType);

		remove(prev);
		show(uploader);

		console.log(`prev: ${prev.attr('id')}`);
		console.log(`current: ${uploader.attr('id')}`);

		// update previous to current uploader
		// prep for next event change
		prev = uploader; 

		imgUploadHandler(mediaType);

	})
}

function getSelected() {
	let selected = $('select option:selected').val();
	return selected;	
}

function showFields() {
	show(uploader);
}

function processUpload() {
    var filename = $('.ft');
    var reader = new FileReader();

    console.log(`img val: ${$("#image1").val()}`);
    // reader.readAsText(filename.files[0]);
    // reader.onload = function() {
    //     $("#image1").val() = reader.result;
    //     console.log(`img val: ${$("#image1").val()}`);
    // };	
}

function processUpload() {
      var filename = document.getElementById("image-upload-");
      var reader = new FileReader();
      reader.readAsText(filename.files[0]);
      reader.onload = function () {
      document.getElementById("jwk").value = reader.result;
      };
}
 
function readInput(input) {
	
	let firstInput = $('input').first();
	let imgInput = $('#image-uploader>input');

    if (input.files && input.files[0]) {
    	console.log('reading input');

        var reader = new FileReader();

        reader.onload = function (e) {
        	console.log('filereader loaded');

    	  // $('#image1').attr('src', e.target.result);

    	 	imgInput.next('img').attr('src', e.target.result); 
           // firstInput.next('img').attr('src', e.target.result);

           //  let nextImgID = firstInput.next('img').attr('id');


           //  console.log(`nextImgID: ${firstInput.next('img').attr('id')}`);
           //  console.log(`nextImgID: ${JSON.stringify(firstInput.next('img'))}`);
           //  console.log(`e.target.result: ${e.target.result}`);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function readURL(input) {
	// let imgInp = $('#imgInp');
	let upld = $('.upld');
	let imgInput = $('#image-uploader>input');

	let inputID = $(input).attr('id');
	console.log(`inputID: ${inputID}`); // file1, file2
	let fileNum = inputID[inputID.length -1]; // str

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	let img1 = input.files[0];  
		       	
        	// console.log(`e.target.result type: ${typeof(e.target.result)}`); // str
        	console.log('filereader loaded');

        	$(`#image${fileNum}`).attr('src', e.target.result);

        	console.log('img id:' + $(`#image${fileNum}`).attr('id'));
        	console.log(`isFile? ${img1 instanceof File}`) // true
        	console.log(`isBuffer? ${Buffer.isBuffer(img1)}`) // 

        	// console.log(`isBuffer? ${Buffer.isBuffer(Buffer.from(img1))}`);

        	// send buffer via socket
        	runSocket(img1);

        	// user clicked upload btn...
        	// create arweave transaction
    //     	$('#upload-btn').on('click', () => {
    //     		console.log(`upload btn clicked`);

				// let imgTransaction = arweave.createTransaction(
				// 	{data: e.target.result}, 
				// 	req.session.privateKey
				// );    

				// imgTransaction.addTag('type', 'image');
				// imgTransaction.addTag('appName', appName);

			 //    arweave.transactions.sign(transaction, jwk);
			 //    arweave.transactions.post(transaction);

			 //    return true;				

				// console.log(`imgTransaction: ${JSON.stringify(imgTransaction)}`);
				// console.log(`imgTransaction length: ${imgTransaction.length}`);

    //     	})

            // $(`#${inputID}`).next().attr('src', e.target.result);

            // console.log(`next id: ${$(`#${inputID}`).next().attr('id')}`);
        }

        reader.readAsDataURL(input.files[0]);
        // console.log(`readAsDataURL: ${reader.readAsDataURL(input.files[0])}`);
        // console.log(`readAsDataURL type: ${typeof(reader.readAsDataURL(input.files[0]))}`);
    }
}

function runSocket(imgFile) {
	console.log('runSocket called');

  	var socket = io();

	// io.on('connection', function (socket) {
	//   socket.on('from app.js', function (data) {
	//     console.log(data.img);
	//   });		
	  	
	// 	// send msg to app.js
		socket.emit('from contest-new', { img: imgFile });
	// }); 		  

	  // receive msg from app.js
	  // io.on('connection', function (socket) {
		  socket.on('from app.js', function (data) {
		    console.log('from app.js');
		    console.log(data.msg);
		  })

	    // send msg to app.js
	    // (evtName, {detail: msg})
	  
	    // socket.emit(`uploaded img${fileNum}: `, { img: e.target.result });
	    // console.log(`e.target.result val: ${e.target.result}`);
	    // socket.emit('from contest-new', { img: `img has been uploaded: ${e.target.result}` });

	  // }); 	
}

// export const uploadPhoto = async (photo, wallet) => {
//     const transaction = await arweave.createTransaction(
//         {data: photo},
//         wallet
//     );

//     transaction.addTag('App-Name', getAppName());

//     await arweave.transactions.sign(transaction, wallet);
//     await arweave.transactions.post(transaction);

//     return true;
// };

// str -> num; file1
function getFileNum(inputID) {

}





// function getData() {
//     var filename = $('.ft');
//     var reader = new FileReader();
//     reader.readAsText(filename.files[0]);
//     reader.onload = function() {
//         $("#retrieved").value = reader.result;
//     };
// }

function show(elmt) {
	elmt.removeClass('noshow');
	elmt.addClass('show');
}
function remove(elmt) {
	elmt.removeClass('show');
	elmt.addClass('noshow');
}
}).call(this,{"isBuffer":require("../../node_modules/insert-module-globals/node_modules/is-buffer/index.js")})
},{"../../node_modules/insert-module-globals/node_modules/is-buffer/index.js":1}]},{},[2]);
