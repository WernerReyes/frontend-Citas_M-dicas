import './inputs.css';

export const createSubmitInput = ({ value, divClasses, disabled }) => {
    const div = document.createElement('div');
    div.className = divClasses;
    const input = document.createElement('input');
    input.type = 'submit';
    input.value = value;
    input.disabled = disabled;
    
    div.appendChild(input);

    return div;
};