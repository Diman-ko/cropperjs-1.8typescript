import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';


// Получение кнопок и элементов
const uploadButton = document.getElementById('upload-button');
const cropButton = document.getElementById('crop-button');
const downloadButton = document.getElementById('download-button');
const imageUploadInput = document.getElementById('image-upload');
const displayedImage = document.getElementById('displayed-image');
const croppedImage = document.getElementById('image-cropped');
const croppedContainer = document.querySelector('.cropped-container');

let cropper;

// Обработчик загрузки изображения
uploadButton.addEventListener('click', () => {
    imageUploadInput.click(); // Открывает окно выбора файла
});

imageUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        displayedImage.src = e.target.result;
        initializeCropper();
    };

    reader.readAsDataURL(file);
});

// Инициализация Cropper
function initializeCropper() {
    if (cropper) {
        cropper.destroy();
    }
    cropper = new Cropper(displayedImage, {
        aspectRatio: 16 / 9,  // Можешь выбрать другое соотношение сторон
        viewMode: 1,
        autoCropArea: 0.5,
        responsive: true,
    });
}

// Обрезка изображения
cropButton.addEventListener('click', () => {
    const canvas = cropper.getCroppedCanvas();
    croppedImage.src = canvas.toDataURL();
    croppedContainer.style.display = 'block'; // Показывает обрезанное изображение
});

// Скачивание обрезанного изображения
downloadButton.addEventListener('click', () => {
    const canvas = cropper.getCroppedCanvas();
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'cropped-image.png';
    link.click();
});
