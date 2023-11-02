import {goToPage, ROUTES} from "../../config.js";
import {navbar} from "../Navbar/navbar.js";

export function renderProfileMenu(user)  {
    const navbarElement = document.querySelector("#navbar");
    navbarElement.innerHTML += Handlebars.templates['profileMenu']();

    const formsButton = document.querySelector("#navbar-menu-forms-button")
    formsButton.addEventListener("click", function (e) {
        goToPage(ROUTES.forms);
    });
    const logoutButton = document.querySelector("#navbar-menu-logout-button")
    logoutButton.addEventListener("click", function (e) {
        goToPage(ROUTES.logout);
    });

    const space = document.querySelector("#space-menu");
    space.addEventListener("click", function (e) {
        navbar(user);
    });
}