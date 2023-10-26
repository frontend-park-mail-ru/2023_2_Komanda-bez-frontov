import {ROUTES} from '../config.js'


const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
export class API {

    async isAuth() {
        try {
            const url = ROUTES.main.url;

            const response = await fetch(url, {method: GET_METHOD});

            const res = await response;
            const parseRes = await res.json();

            let isAuthorized = false;
            let authorizedUserEmail = '';

            if (res.ok) {
                isAuthorized = true;
                authorizedUserEmail = parseRes.currentUser.email;
            }

            return {isAuthorized, authorizedUserEmail};
        } catch (e) {
            console.log("Ошибка метода isAuth:", e);
            throw(e);
        }
    }

    async userLogin(email, password) {
        try {
            const url = ROUTES.login.url;

            const response = await fetch(url, {
                method: POST_METHOD,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const  res = await response;
            const parseRes = await res.json();

            let isLoggedIn = false;
            let authorizedUserEmail = '';

            if (res.ok) {
                isLoggedIn = true;
                authorizedUserEmail = parseRes.currentUser.email;
            }

            return {isLoggedIn, authorizedUserEmail};
        } catch (e) {
            console.log("Ошибка метода userLogin:", e);
            throw(e);
        }
    }

    async userSignup(name, username, email, password, repeat_password) {
        try {
            const url = ROUTES.signup.url;

            const response = await fetch(url, {
                method: POST_METHOD,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, username, email, password, repeat_password}),
            });

            const res = await response;
            const parseRes = await res.json();

            let isSignup = false;
            let registeredUserEmail = '';

            if (res.ok) {
                isSignup = true;
                registeredUserEmail = parseRes.currentUser.email;
            }

            return {isSignup, registeredUserEmail};
        } catch (e) {
            console.log("Ошибка метода userSignup:", e);
            throw(e);
        }
    }
}