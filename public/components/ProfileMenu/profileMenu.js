import {ROUTES} from "../../config.js";
import {navbar} from "../Navbar/navbar.js";
import {renderProfile} from "../pages/Profile/profile.js";
import {goToPage} from "../../modules/router.js";

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @param user - Объект с информацией о пользователе.
 * @return {void}
 */
export const renderProfileMenu = (user) =>  {
    if (!user) {
        return
    }
    const navbarElement = document.querySelector("#navbar");
    navbarElement.innerHTML += Handlebars.templates['profileMenu']();

    // Функция убирающая рендер меню, а так же убирающая event listener клика по области вне нее
    const removeProfileMenu = (e) => {
        if (!e.target.classList.contains('profile-menu') &&
            !e.target.parentNode.classList.contains('profile-menu')) {
            document.body.removeEventListener("click", removeProfileMenu)
            navbar(user);
        }
    };
    document.body.addEventListener("click", removeProfileMenu);

    const profileButton = document.querySelector("#navbar-menu-profile-button")
    profileButton.addEventListener("click", (e) => {
        navbar(user);
        document.body.removeEventListener("click", removeProfileMenu)
        renderProfile();
    });
    const formsButton = document.querySelector("#navbar-menu-forms-button")
    formsButton.addEventListener("click",  (e) => {
        navbar(user);
        document.body.removeEventListener("click", removeProfileMenu)
        goToPage(ROUTES.forms);
    });
    const logoutButton = document.querySelector("#navbar-menu-logout-button")
    logoutButton.addEventListener("click",  (e) => {
        document.body.removeEventListener("click", removeProfileMenu)
        goToPage(ROUTES.logout);
    });

};
