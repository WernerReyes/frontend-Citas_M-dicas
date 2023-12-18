export const createTextAreaInput = (id, label, validations) => {
    const container = document.createElement('div');
    container.classList.add('form-floating', 'mb-3');

    const input = document.createElement('textarea');
    input.classList.add('form-control');
    input.style = 'height: 200px';
    input.id = id;
    input.name = id;

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', id);
    labelElement.textContent = label;

    const feedback = document.createElement('div');
    feedback.classList.add('invalid-feedback');

    input.addEventListener('input', (e) => {
        const value = e.target.value;
        let errorMessage = '';

        for (let i = 0; i < validations.length; i++) {
            errorMessage = validations[i](value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            input.classList.add('is-invalid');
            feedback.textContent = errorMessage;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    // Add content to container
    container.appendChild(input);
    container.appendChild(labelElement);
    container.appendChild(feedback);

    return container;
};
