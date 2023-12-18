import './modal-base.css';

export const modalBase = (id, contentHeader, contentBody) => {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal fade';
    modalContainer.id = id;
    modalContainer.tabIndex = '-1';

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-dialog-centered modal-lg';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header mb-0';

    const modalTitleContainer = document.createElement('div');
    modalTitleContainer.className = 'modal-title-container';
    if (contentHeader) {
        modalTitleContainer.appendChild(contentHeader);
    }

    const modalButtonClose = document.createElement('button');
    modalButtonClose.type = 'button';
    modalButtonClose.className = 'btn-close';
    modalButtonClose.setAttribute('data-bs-dismiss', 'modal');
    modalButtonClose.setAttribute('aria-label', 'Close');

    modalButtonClose.onclick = () => {
        const modalElement = document.getElementById(id);
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    };

    modalHeader.appendChild(modalTitleContainer);
    modalHeader.appendChild(modalButtonClose);

    // Modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    if (contentBody) {
        modalBody.appendChild(contentBody);
    }

    // Add modal header and body to modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    // Add modal content to modal dialog
    modalDialog.appendChild(modalContent);

    // Add modal dialog to modal container
    modalContainer.appendChild(modalDialog);

    return modalContainer;

};

// Función para actualizar el contenido del modal
export const updateModalContent = (id, contentHeader, contentBody) => {
    // Buscar el modal por su id
    const modal = document.getElementById(id);

    // Buscar los contenedores de contenido del modal
    const modalHeaderContainer = modal.querySelector('.modal-title-container');
    const modalBody = modal.querySelector('.modal-body');

    // Limpiar los contenedores de contenido
    modalHeaderContainer.innerHTML = '';
    modalBody.innerHTML = '';

    // Insertar el nuevo contenido
    modalHeaderContainer.appendChild(contentHeader);
    modalBody.appendChild(contentBody);
}

