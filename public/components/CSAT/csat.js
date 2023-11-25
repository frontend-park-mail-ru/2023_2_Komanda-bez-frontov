export const renderCSAT = () => {
    const csat = document.querySelector('#csat');
    csat.innerHTML = Handlebars.templates.csat_iframe();
};

export const removeCSAT = () => {
    const csat = document.querySelector('#csat');
    csat.innerHTML = '';
};