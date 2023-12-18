import './top-bar.css';

const topBar = () => { 
    const topBar = document.createElement('div');
    topBar.id = 'topBar';
    topBar.className = 'd-flex align-items-center fixed-top';
    topBar.innerHTML = `
        <div id="topbar" class="d-flex align-items-center fixed-top">
            <div class="container d-flex align-items-center justify-content-center justify-content-md-between">
                <div class="align-items-center d-none d-md-flex">
                    <i class="bi bi-clock"></i> Lunes - Domingo, 8AM a 12PM
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-phone"></i> Telefono (04)0800 12 200
                </div>
            </div>
        </div>
    `;

    return topBar;
}

export default topBar;