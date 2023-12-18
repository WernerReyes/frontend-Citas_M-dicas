import './footer.css';

const footer = () => {
    const footer = document.createElement('footer');
    footer.id = 'footer-private';
    footer.className = 'p-3 border-top position-relative fixed-bottom';
    footer.innerHTML = `
    <div class="container mb-3 mt-3">
        <div class="nombre-clinica d-flex">
            <p><strong>Cliníca Esperanza@</strong></p>
            <p class="ms-2">Todos los derechos reservados</p>
        </div>
        <div class="datos-adicionales d-lg-flex justify-content-evenly align-items-center">
            <p><strong>Direccion:</strong> 123 Calle las Flores</p>
            <p><strong>Distrito:</strong> La molina - Santa Anita</p>
            <p><strong>Telefono:</strong> (04)0800 12 200 </p>
            <p><strong>Correo:</strong> CLINICAESPERANZA@GMAIL.COM</strong></p>
         </div>
    </div>
    `;
    return footer;
};

export default footer;

