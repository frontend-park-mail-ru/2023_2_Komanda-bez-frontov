import {ROUTES, goToPage} from "../../config.js";

export function navbar(user = null)  {
    const navbarElement = document.querySelector("#navbar");
    navbarElement.innerHTML = '';
    if (user) {
        navbarElement.innerHTML = Handlebars.templates['navbar'](user);
        const logoutButton = document.querySelector("#navbar-logout-button")
        logoutButton.addEventListener("click", function (e) {
            goToPage(ROUTES.logout);
        });
    } else {
        navbarElement.innerHTML = Handlebars.templates['navbar']();
        const loginButton = document.querySelector("#navbar-login-button");
        loginButton.addEventListener("click", function (e) {
            goToPage(ROUTES.login);
        });

        const signupButton = document.querySelector("#navbar-signup-button")
        signupButton.addEventListener("click", function (e) {
            goToPage(ROUTES.signup);
        });

    }
}