import {initialRouter} from './modules/router.js';
import './resources/handlebars_import.js';

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
        .catch((err) => console.log(err));
}

initialRouter();
