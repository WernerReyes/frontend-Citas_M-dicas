import { topBar } from "../../components/common";
import URLS_APP from "../../urls-app";
import { redirecToPage } from "../../utils/common";

const accessDeniedPage = (container) => {
    container.className = ('d-flex justify-content-center align-items-center min-vh-100')

    // Create the topbar and header components
    const topbar = topBar();

    // <--! Content -->
    const main = document.createElement('main');
    main.id = 'main';
    main.className = 'd-flex flex-column items-center justify-center h-screen';
    
    const div = document.createElement('div');
    div.className = 'alert text-center w-100';
    div.innerHTML = `
     <h2>Access Denied</h2>
        <p>You don't have access to this page.</p>
    `

    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Login';
    button.onclick = () => redirecToPage(URLS_APP.LOGIN_USER)
    
    main.appendChild(div);
    main.appendChild(button);
    // <--! Content --> 

    // Create a document fragment
    const fragment = document.createDocumentFragment();
    fragment.appendChild(topbar);
    fragment.appendChild(main);

    container.appendChild(fragment);
}

export default accessDeniedPage;