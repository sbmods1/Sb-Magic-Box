const box = document.querySelector('.box');
const borderRadiusInput = document.querySelector('#border-radius');
const borderRadiusValue = document.querySelector('#border-radius-value');
const borderWidthInput = document.querySelector('#border-width');
const borderWidthValue = document.querySelector('#border-width-value');
const borderColorInput = document.querySelector('#border-color');
const backgroundColorInput = document.querySelector('#background-color');
const imageUploadInput = document.querySelector('#image-upload');
const textInput = document.querySelector('#text-input');
const textSizeInput = document.querySelector('#text-size');
const textSizeValue = document.querySelector('#text-size-value');
const textOverlay = document.querySelector('#text-overlay');
const downloadBtn = document.querySelector('#download-btn');

function updateBox() {
    box.style.borderRadius = `${borderRadiusInput.value}px`;
    borderRadiusValue.textContent = `${borderRadiusInput.value}px`;

    box.style.borderWidth = `${borderWidthInput.value}px`;
    borderWidthValue.textContent = `${borderWidthInput.value}px`;

    box.style.borderColor = borderColorInput.value;
    box.style.backgroundColor = backgroundColorInput.value;

    textOverlay.textContent = textInput.value;
    textOverlay.style.fontSize = `${textSizeInput.value}px`;
    textSizeValue.textContent = `${textSizeInput.value}px`;
}

borderRadiusInput.addEventListener('input', updateBox);
borderWidthInput.addEventListener('input', updateBox);
borderColorInput.addEventListener('input', updateBox);
backgroundColorInput.addEventListener('input', updateBox);
textInput.addEventListener('input', updateBox);
textSizeInput.addEventListener('input', updateBox);

imageUploadInput.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = () => {
        box.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(event.target.files[0]);
});

downloadBtn.addEventListener('click', () => {
    html2canvas(box).then(canvas => {
        const link = document.createElement('a');
        link.download = 'customized-box.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Initialize with default values
updateBox();
