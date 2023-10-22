import {ROUTES} from '../config.js'


const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
export class API {
    async isAuth() {
        try {
            const url = ROUTES.main.url;

            const response = await fetch(url, {method: GET_METHOD});

            const res = await response.json();

            let isAuthorized = false;
            let email = '';

            if (res.status === 200) {
                isAuthorized = true;
                email = res.body.email;
            }

            return {isAuthorized, email};
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

            const res = await response.json();

            let isLoggedIn = false;
            let email = '';

            if (res.status === 201) {
                isLoggedIn = true;
                email = res.body.email;
            }

            return {isLoggedIn, email};
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

            const res = await response.json();

            let isSignup = false;
            let username = '';

            if (res.status === 201) {
                isSignup = true;
                username = res.body.username;
            }

            return {isSignup, username};
        } catch (e) {
            console.log("Ошибка метода userSignup:", e);
            throw(e);
        }
    }
}