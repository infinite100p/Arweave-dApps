
var clickCount = 0;

// document.addEventListener("DOMContentLoaded", (event)  => {
$(document).ready(() => {
    let loginBtn = $('#login-btn'); // submit private key loginBtn
    
    if (loginBtn) {
        if (clickCount === 0) {
            loginBtn.click(); // temp autologin: privatekeyfile
        }
        loginBtnClickListener(loginBtn, clickCount);
    }

    console.log(`index doc ready`);
})

function getData() {
    var filename = document.getElementById("privateKey");
    var reader = new FileReader();
    reader.readAsText(filename.files[0]);
    reader.onload = function() {
        document.getElementById("jwk").value = reader.result;
    };
}

// track login loginBtn click
function loginBtnClickListener(loginBtn, clickCount) {
    $(loginBtn).on('click', () => { 
        clickCount = clickCount++;
    })
}