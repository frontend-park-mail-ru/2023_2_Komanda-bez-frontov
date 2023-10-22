import {ROUTES, goToPage} from "../../config.js";

export function navbar(user = null) {
    const navbarElement = document.querySelector("#navbar");
    navbarElement.innerHTML = '';
    if (user) {
        navbarElement.innerHTML = Handlebars.templates['navbar']({user: {username: "carson"}});
        const logoutButton = document.querySelector("#logout-button")
    } else {
        navbarElement.innerHTML = Handlebars.templates['navbar']();
        const loginButton = document.querySelector("#login-button");
        loginButton.addEventListener("click", function (e) {
            goToPage(ROUTES.login);
        });

        const regButton = document.querySelector("#signup-button")
        // loginButton.addEventListener("click", function (e) {
        //     goToPage(ROUTES.login);
        // });

    }
}