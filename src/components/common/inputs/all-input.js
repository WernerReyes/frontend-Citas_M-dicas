export const createInput = ({ id, placeholder, validations=[], classes, type="text", labelText }) => {
    const container = document.createElement('div');
    container.className = classes;
    const label = document.createElement('label');
    label.classList.add('form-label');
    label.setAttribute('for', id);
    label.textContent = labelText;
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.id = id;
    input.type = type;
    input.placeholder = placeholder;
    const feedback = document.createElement('div');
    feedback.classList.add('invalid-feedback');
    
    if(validations.length) {
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
    }

    // Add content to container
    if (labelText) {
        container.appendChild(label);
    }
    container.appendChild(input);
    container.appendChild(feedback);

    return container;

}
