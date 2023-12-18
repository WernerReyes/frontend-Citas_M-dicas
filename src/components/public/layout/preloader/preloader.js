import './preloader.css';

const preloader = () => {
    const preload = document.createElement('a');
    preload.className = 'back-to-top d-flex align-items-center justify-content-center';
    preload.href = '#app';
    preload.innerHTML = `
       <i class="bi bi-arrow-up-short"></i>
    `;
    
    return preload;

}


export default preloader;