// Загрузка звуков с помощью Howler.js
var rainSound = new Howl({
    src: ['sounds/rain1.mp3'], // Путь к звуку дождя
    loop: true, // Звук будет зациклен
    volume: 0 // Начальная громкость (по умолчанию 0)
});

var fireSound = new Howl({
    src: ['sounds/fire1.mp3'], // Путь к звуку огня
    loop: true, // Звук будет зациклен
    volume: 0 // Начальная громкость (по умолчанию 0)
});

// Получаем элементы ползунков и переключателя
var rainSlider = document.getElementById('rainSlider');
var fireSlider = document.getElementById('fireSlider');
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

// Функция для обновления состояния переключателя
function updateSwitchState() {
    // Если хотя бы один ползунок активен, включаем переключатель
    toggleSwitch.checked = rainSlider.value > 0 || fireSlider.value > 0;
}

// Обработчик изменения состояния переключателя
toggleSwitch.addEventListener('change', function() {
    if (!toggleSwitch.checked) {
        // Если переключатель выключен, сбрасываем ползунки и останавливаем звуки
        rainSlider.value = 0;
        fireSlider.value = 0;
        rainSound.stop();
        fireSound.stop();
    }
});
