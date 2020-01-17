const logoutClicked = 'not yet';

module.exports = {
    // add:add,
    // logoutClicked:logoutClicked
    init:init
}
// const appEntry = require('../../app.js');

// $(document).ready(() => {
// 	init();

// })



// const logoutClicked = () =>
// 	logoutBtn.on('click', () => {
// 		return true;
// }

// window.onload = init;

// document.addEventListener("DOMContentLoaded", function(event) {
function init() {
	let logoutBtn = document.getElementById('#logout');

	console.log('doc ready');
	// console.log(`userLoggedIn: ${userLoggedIn}`);

		logoutBtn.addEventListener('click', () => {
			// if (req.session.logged) {
			// 	console.log('user logged in');
			// 	req.session.destroy()
			// 	// return res.redirect('/');
			// } else {
				// console.log('Already logged out!');
				console.log('logout clicked!');
				logoutClicked = 'yes';
			// }
		})

	if (logoutBtn) {
		console.log('logoutBtn');
	} else {
		console.log('no logoutBtn');
	}
}
// });