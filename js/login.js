// Login addtional scripts.

function OnLogInPressed() {
    var T = document.getElementById("login");
    T.style.display = "block";
	var T = document.getElementById("signup");
    T.style.display = "none";

	var T = document.getElementById("signup-button-mode-choice");
	T.classList.remove("chosen-mode");
	var T = document.getElementById("login-button-mode-choice");
	T.classList.add("chosen-mode");
}

function OnSignUpPressed() {
    var T = document.getElementById("login");
    T.style.display = "none";
	var T = document.getElementById("signup");
    T.style.display = "block";

	var T = document.getElementById("login-button-mode-choice");
	T.classList.remove("chosen-mode");
	var T = document.getElementById("signup-button-mode-choice");
	T.classList.add("chosen-mode");
}

function OnFormSubmitted() {
	console.log("Form submitted?");
}

var observer = new MutationObserver(function(mutations) {
  // Check if the desired elements are available in the DOM
  var element1Exists = document.getElementById('login') !== null;
  var element2Exists = document.getElementById('signup') !== null;

  // If both elements are available, disconnect the observer and execute the code
  if (element1Exists && element2Exists) {
    observer.disconnect();
    OnSignUpPressed();
  }
});

var urlFragment = window.location.hash.substring(1);
if (urlFragment.includes('signup')) {
	// Start observing mutations in the entire document
	observer.observe(document, { childList: true, subtree: true });
}
