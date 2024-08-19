const box = document.querySelector('.box');
const borderRadiusInput = document.querySelector('#border-radius');
const borderWidthInput = document.querySelector('#border-width');
const borderColorInput = document.querySelector('#border-color');
const backgroundColorInput = document.querySelector('#background-color');
const imageUploadInput = document.querySelector('#image-upload');
const imageSizeInput = document.querySelector('#image-size');
const imagePositionXInput = document.querySelector('#image-position-x');
const imagePositionYInput = document.querySelector('#image-position-y');
const textInput = document.querySelector('#text-input');
const textSizeInput = document.querySelector('#text-size');
const textPositionXInput = document.querySelector('#text-position-x');
const textPositionYInput = document.querySelector('#text-position-y');
const textBorderColorInput = document.querySelector('#text-border-color');
const textBackgroundColorInput = document.querySelector('#text-background-color');
const downloadBtn = document.querySelector('#download-btn');

const textOverlay = document.querySelector('#text-overlay');

function updateBox() {
    box.style.borderRadius = `${borderRadiusInput.value}px`;
    box.style.borderWidth = `${borderWidthInput.value}px`;
    box.style.borderColor = borderColorInput.value;
    box.style.backgroundColor = backgroundColorInput.value;

    textOverlay.textContent = textInput.value;
    textOverlay.style.fontSize = `${textSizeInput.value}px`;
    textOverlay.style.color = textBorderColorInput.value;
    textOverlay.style.backgroundColor = textBackgroundColorInput.value;

    textOverlay.style.left = `${textPositionXInput.value}%`;
    textOverlay.style.top = `${textPositionYInput.value}%`;

    const scale = imageSizeInput.value / 100;
    box.style.backgroundSize = `${scale * 100}% ${scale * 100}%`;
    box.style.backgroundPosition = `${imagePositionXInput.value}% ${imagePositionYInput.value}%`;
}

borderRadiusInput.addEventListener('input', updateBox);
borderWidthInput.addEventListener('input', updateBox);
borderColorInput.addEventListener('input', updateBox);
backgroundColorInput.addEventListener('input', updateBox);
imageSizeInput.addEventListener('input', updateBox);
imagePositionXInput.addEventListener('input', updateBox);
imagePositionYInput.addEventListener('input', updateBox);
textInput.addEventListener('input', updateBox);
textSizeInput.addEventListener('input', updateBox);
textPositionXInput.addEventListener('input', updateBox);
textPositionYInput.addEventListener('input', updateBox);
textBorderColorInput.addEventListener('input', updateBox);
textBackgroundColorInput.addEventListener('input', updateBox);

imageUploadInput.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = () => {
        box.style.backgroundImage = `url(${reader.result})`;
        updateBox();
    };
    reader.readAsDataURL(event.target.files[0]);
});

downloadBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = box.offsetWidth;
    canvas.height = box.offsetHeight;
    ctx.canvas.width = box.offsetWidth;
    ctx.canvas.height = box.offsetHeight;
    
    if (box.style.backgroundImage) {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawTextAndBorder(ctx);
            downloadCanvas(canvas);
        };
        img.src = box.style.backgroundImage.slice(5, -2);
    } else {
        ctx.fillStyle = box.style.backgroundColor || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawTextAndBorder(ctx);
        downloadCanvas(canvas);
    }
});

function drawTextAndBorder(ctx) {
    ctx.strokeStyle = box.style.borderColor;
    ctx.lineWidth = parseInt(borderWidthInput.value, 10);
    ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (textInput.value) {
        ctx.font = `${textSizeInput.value}px Arial`;
        ctx.fillStyle = textOverlay.style.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textX = (canvas.width * parseInt(textPositionXInput.value, 10)) / 100;
        const textY = (canvas.height * parseInt(textPositionYInput.value, 10)) / 100;
        ctx.fillText(textInput.value, textX, textY);
        ctx.strokeStyle = textBorderColorInput.value;
        ctx.lineWidth = 2;
        ctx.strokeText(textInput.value, textX, textY);
    }
}

function downloadCanvas(canvas) {
    const link = document.createElement('a');
    link.download = 'customized-box.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
updateBox();
