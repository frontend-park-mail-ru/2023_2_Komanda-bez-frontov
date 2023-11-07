import {API} from "../../modules/api.js";
import {STORAGE} from "../../index.js";
import {renderMessage} from "../Message/message.js";

/**
 * Функция для получения и сохранения аватарки текущего пользователя.
 *
 * @async
 * @function
 * @return {void}
 */
export async function getAuthAvatar() {
    if (!STORAGE.user) {
        return
    }
    try {
        const api = new API();
        const res = await api.getAvatar(STORAGE.user.username);
        if (res.status === 200) {
            STORAGE.avatar = res.avatar;
        }
    } catch(e) {
        if (e.toString() === 'TypeError: Failed to fetch') {
            renderMessage('Потеряно соединение с сервером', true)
        }
    }
}
