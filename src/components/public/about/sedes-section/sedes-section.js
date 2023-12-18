import './sedes-section.css';

const sectionSedes = () => {
    const section = document.createElement('section');
    section.id = 'sedes';
    section.innerHTML = `
        <div class="container">
            <div class="section-title">
                <h2>Estamos cerca de ti y tu familia</h2>
                <p>Conoce nuestras sedes</p>
            </div>
            <div class="mb-5 position-relative img-inicio">
                <img src="/assets/img/agregadas/imgnosotros-01.png" alt="imagen-Sedes">
                <h2 class="position-absolute top-50 start-50 translate-middle text-primary fw-bold">Sede Santa Anita</h2>
            </div>
            <div class="position-relative img-inicio">
                <img src="/assets/img/agregadas/imgnosotros-02.png" alt="imagen-Sedes">
                <h2 class="position-absolute top-50 start-50 translate-middle text-primary fw-bold">Sede la Molina</h2>
            </div>
        </div>
    `;
    return section;
};

export default sectionSedes;