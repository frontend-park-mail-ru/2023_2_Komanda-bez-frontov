import {initialRouter} from './modules/router.js';
import './resources/handlebars_import.js';

navigator.serviceWorker?.register('/sw.js').catch(console.error);

initialRouter();
