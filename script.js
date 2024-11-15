// Включаем поддержку мобильных устройств для Howler.js
Howler.mobileAutoEnable = true;

// Проверка для iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Инициализация звуков после взаимодействия пользователя
function enableSounds() {
    rainSound.play(); // Попытка воспроизведения звука дождя
    fireSound.play(); // Попытка воспроизведения звука огня

    // Проверяем, играют ли звуки
    if (rainSound.playing() || fireSound.playing()) {
        console.log("Звуки активированы");
    } else if (isIOS()) {
        alert("На iOS звуки могут не воспроизводиться в беззвучном режиме. Пожалуйста, выключите его.");
    }

    // Убираем обработчик после активации звуков
    document.body.removeEventListener('click', enableSounds);
}

// Добавляем обработчик клика на тело страницы
document.body.addEventListener('click', enableSounds);
var rainSound = new Howl({
    src: ['sounds/rain1.mp3'], // Путь к звуку дождя
    loop: true, // Звук будет зациклен
    volume: 0 // Начальная громкость 
});

var wavesSound = new Howl({
    src: ['sounds/waves.mp3'], // Путь к звуку огня
    loop: true, // Звук будет зациклен
    volume: 0 // Начальная громкость 
});

var fireSound = new Howl({
    src: ['sounds/fire1.mp3'], // Путь к звуку огня
    loop: true, // Звук будет зациклен
    volume: 0 // Начальная громкость 
});

var birdsSound = new Howl({
    src: ['sounds/birds.mp3'], // Путь к звуку огня
    loop: true, // Звук будет зациклен
    volume: 0 // Начальная громкость 
});


// Получаем элементы ползунков и переключателя
var rainSlider = document.getElementById('rainSlider');
var wavesSlider = document.getElementById('wavesSlider');
var fireSlider = document.getElementById('fireSlider');
var birdsSlider = document.getElementById('birdsSlider');
var toggleSwitch = document.querySelector('.ios7-switch input');

// Обработчик для ползунка дождя
rainSlider.addEventListener('input', function() {
    var volume = rainSlider.value / 100; // Преобразуем значение ползунка в диапазон от 0 до 1
    rainSound.volume(volume); // Устанавливаем громкость для дождя
    if (volume > 0 && !rainSound.playing()) {
        rainSound.play(); // Запускаем звук, если громкость больше 0
    } else if (volume === 0) {
        rainSound.stop(); // Останавливаем звук, если громкость равна 0
    }
    updateSwitchState();
});

// Обработчик для ползунка волн
wavesSlider.addEventListener('input', function() {
    var volume = wavesSlider.value / 100; // Преобразуем значение ползунка в диапазон от 0 до 1
    wavesSound.volume(volume); // Устанавливаем громкость для дождя
    if (volume > 0 && !wavesSound.playing()) {
        wavesSound.play(); // Запускаем звук, если громкость больше 0
    } else if (volume === 0) {
        wavesSound.stop(); // Останавливаем звук, если громкость равна 0
    }
    updateSwitchState();
});

// Обработчик для ползунка огня
fireSlider.addEventListener('input', function() {
    var volume = fireSlider.value / 100; // Преобразуем значение ползунка в диапазон от 0 до 1
    fireSound.volume(volume); // Устанавливаем громкость для огня
    if (volume > 0 && !fireSound.playing()) {
        fireSound.play(); // Запускаем звук, если громкость больше 0
    } else if (volume === 0) {
        fireSound.stop(); // Останавливаем звук, если громкость равна 0
    }
    updateSwitchState();
});

// Обработчик для ползунка птичек
birdsSlider.addEventListener('input', function() {
    var volume = birdsSlider.value / 100; // Преобразуем значение ползунка в диапазон от 0 до 1
    birdsSound.volume(volume); // Устанавливаем громкость для огня
    if (volume > 0 && !birdsSound.playing()) {
        birdsSound.play(); // Запускаем звук, если громкость больше 0
    } else if (volume === 0) {
        birdsSound.stop(); // Останавливаем звук, если громкость равна 0
    }
    updateSwitchState();
});

// Функция для обновления состояния переключателя
function updateSwitchState() {
    // Если хотя бы один ползунок активен, включаем переключатель
    toggleSwitch.checked = rainSlider.value > 0 || wavesSlider.value > 0 || fireSlider.value > 0 || birdsSlider.value > 0;
}

// Обработчик изменения состояния переключателя
toggleSwitch.addEventListener('change', function() {
    if (!toggleSwitch.checked) {
        // Если переключатель выключен, сбрасываем ползунки и останавливаем звуки
        rainSlider.value = 0;
        wavesSlider.value = 0;
        fireSlider.value = 0;
        birdsSlider.value = 0;
        rainSound.stop();
        wavesSound.stop();
        fireSound.stop();
        birdsSound.stop();
    }
});






