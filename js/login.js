// Login addtional scripts.

function OnLogInPressed() {
    var T = document.getElementById("login");
    T.style.display = "block";
	var T = document.getElementById("signup");
    T.style.display = "none";
}

function OnSignUpPressed() {
    var T = document.getElementById("login");
    T.style.display = "none";
	var T = document.getElementById("signup");
    T.style.display = "block";
}

function OnFormSubmitted() {
	console.log("Form submitted?");
}

