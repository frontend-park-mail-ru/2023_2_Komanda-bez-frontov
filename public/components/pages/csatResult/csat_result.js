import {API} from "../../../modules/api.js";
import {removeMessage, renderMessage} from '../../Message/message.js';
import {STORAGE} from '../../../modules/storage.js';
import {ROUTES} from '../../../config.js';
import {goToPage} from '../../../modules/router.js';


export const renderCsatResults = async () => {
    removeMessage();

    const api = new API();

    if (!STORAGE.user) {
        goToPage(ROUTES.login, 0, true);
        renderMessage('Вы не авторизованы!', true);
        return;
    }

    const rootElement = document.querySelector('#root');
    rootElement.innerHTML = Handlebars.templates.csat_result();


    let ratings;
    //     { "rating":5 },
    //     { "rating":4 },
    //     { "rating":3 },
    //     { "rating":2 },
    //     { "rating":1 },
    // ]

    try {
        const res = await api.getCsatResult();
        ratings = res.ratings;
    } catch (e) {
        if (e.toString() !== 'TypeError: Failed to fetch') {
            renderMessage('Ошибка сервера. Попробуйте позже.', true);
            return;
        }
        renderMessage('Потеряно соединение с сервером', true);

    }

    ratings.forEach((rating) => {
        let ratingInput = document.querySelector(`#rating_${rating.rating}`)
        if (ratingInput) {
            ratingInput.innerHTML = (parseInt(ratingInput.innerText) + 1).toString();
        }
    })
};