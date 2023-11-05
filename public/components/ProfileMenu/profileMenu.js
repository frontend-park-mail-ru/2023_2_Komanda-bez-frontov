'use strict'

import {goToPage, ROUTES} from "../../config.js";
import {navbar} from "../Navbar/navbar.js";
import {renderProfile} from "../pages/Profile/profile.js";

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @param user - Объект с информацией о пользователе.
 * @return {void}
 */
export function renderProfileMenu(user)  {
    if (!user) {
        return
    }
    const navbarElement = document.querySelector("#navbar");
    navbarElement.innerHTML += Handlebars.templates['profileMenu']();

    // Функция убирающая рендер меню, а так же убирающая event listener клика по области вне нее
    function removeProfileMenu (e) {
        if (!e.target.classList.contains('navbar-profile-menu') &&
            !e.target.parentNode.classList.contains('navbar-profile-menu')) {
            document.body.removeEventListener("click", removeProfileMenu)
            navbar(user);
        }
    }
    // Таймаут для того, чтобы событие не произошло сразу, как только addEventListener вызовется
    window.setTimeout(() => {
        document.body.addEventListener("click", removeProfileMenu);
    }, 0)

    const profileButton = document.querySelector("#navbar-menu-profile-button")
    profileButton.addEventListener("click", function (e) {
        navbar(user);
        document.body.removeEventListener("click", removeProfileMenu)
        renderProfile();
    });
    const formsButton = document.querySelector("#navbar-menu-forms-button")
    formsButton.addEventListener("click", function (e) {
        navbar(user);
        document.body.removeEventListener("click", removeProfileMenu)
        goToPage(ROUTES.forms);
    });
    const logoutButton = document.querySelector("#navbar-menu-logout-button")
    logoutButton.addEventListener("click", function (e) {
        document.body.removeEventListener("click", removeProfileMenu)
        goToPage(ROUTES.logout);
    });

}