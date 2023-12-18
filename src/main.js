import 'bootstrap/dist/css/bootstrap.min.css';

import handleRouteChange from "./routers/route";

const divApp = document.getElementById('app');

// Escuchamos el evento de cambio de ruta
window.addEventListener('hashchange', () => {
    handleRouteChange(divApp);
});

// Inicializamos la carga de contenido
handleRouteChange(divApp);

