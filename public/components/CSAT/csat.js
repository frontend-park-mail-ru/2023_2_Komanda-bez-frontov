export const renderCSAT = (html_path) => {
    const csat = document.querySelector('#csat');
    csat.innerHTML = Handlebars.templates.csat_iframe();


};

export const removeCSAT = () => {
    const csat = document.querySelector('#csat');
    if (csat) {
        csat.innerHTML = '';
    }
};

const stars = document.querySelectorAll(".fa-star");
stars.forEach((star) => {
    star.addEventListener('click', () => {
        let starRating = parseInt(star.id[star.id.length - 1]);

        for (let i = 1; i <= starRating; ++i) {
            let cycleStar = document.querySelector(`#fa-star-${i}`);
            if (!cycleStar.classList.contains('checked')) {
                cycleStar.classList.add('checked');
            }
        }

        for (let i = starRating + 1; i <= 5; ++i) {
            let cycleStar = document.querySelector(`#fa-star-${i}`);
            if (cycleStar.classList.contains('checked')) {
                cycleStar.classList.remove('checked');
            }
        }
    });
});

const closeButton = document.querySelector('#csat-container__close-button');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        window.top.postMessage('close', '*');
    });
}

const laterButton = document.querySelector('#btn1');
if (laterButton) {
    laterButton.addEventListener('click', () => {
        window.top.postMessage('close', '*');
    });
}



