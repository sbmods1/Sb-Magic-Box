const box = document.querySelector('.box');
const borderRadiusInput = document.querySelector('#border-radius');
const borderRadiusValue = document.querySelector('#border-radius-value');
const borderWidthInput = document.querySelector('#border-width');
const borderWidthValue = document.querySelector('#border-width-value');
const borderColorInput = document.querySelector('#border-color');
const backgroundColorInput = document.querySelector('#background-color');

function updateBox() {
    box.style.borderRadius = `${borderRadiusInput.value}px`;
    borderRadiusValue.textContent = `${borderRadiusInput.value}px`;
    
    box.style.borderWidth = `${borderWidthInput.value}px`;
    borderWidthValue.textContent = `${borderWidthInput.value}px`;
    
    box.style.borderColor = borderColorInput.value;
    box.style.backgroundColor = backgroundColorInput.value;
}

borderRadiusInput.addEventListener('input', updateBox);
borderWidthInput.addEventListener('input', updateBox);
borderColorInput.addEventListener('input', updateBox);
backgroundColorInput.addEventListener('input', updateBox);

// Initialize with default values
updateBox();