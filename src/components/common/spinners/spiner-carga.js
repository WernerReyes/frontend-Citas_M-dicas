import './spinners.css';

const spinnerCarga = () => {
    const divSpinner = document.createElement('div');
    divSpinner.id = 'spinner';
    divSpinner.classList.add('spinner-container', 'd-none');
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    divSpinner.appendChild(spinner);

    return divSpinner;
};

export default spinnerCarga;


export const showSpinner = () => document.getElementById('spinner').classList.remove('d-none');

export const hideSpinner = () => document.getElementById('spinner').classList.add('d-none');
  