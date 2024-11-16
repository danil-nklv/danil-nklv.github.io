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

// ТАЙМЕР
const timerIcon = document.getElementById("timerIcon");
const timerPanel = document.getElementById("timerPanel");
const timerInput = document.getElementById("timerInput");
const startTimerButton = document.getElementById("startTimer");
const countdownDisplay = document.getElementById("countdownDisplay");

let timer;
let countdownInterval;

// Открыть/закрыть панель таймера
function toggleTimerPanel() {
    timerPanel.style.display = timerPanel.style.display === "block" ? "none" : "block";
    countdownDisplay.textContent = ""; // Сбрасываем обратный отсчёт
}

// Запуск таймера
function startTimer() {
    clearTimeout(timer);
    clearInterval(countdownInterval);

    const minutes = parseInt(timerInput.value, 10);
    if (isNaN(minutes) || minutes <= 0) {
        countdownDisplay.textContent = "Введите корректное количество минут.";
        return;
    }

    const endTime = Date.now() + minutes * 60 * 1000;
    countdownDisplay.textContent = `Осталось: ${formatTime(minutes * 60)}`;

    countdownInterval = setInterval(() => {
        const timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        countdownDisplay.textContent = `Осталось: ${formatTime(timeLeft)}`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);

    timer = setTimeout(() => {
        stopAllSounds();
        toggleTimerPanel(); // Закрываем панель после завершения
    }, minutes * 60 * 1000);
}

// Остановить все звуки
function stopAllSounds() {
    Howler.stop(); // Остановка всех звуков через Howler.js
}

// Форматирование времени в формате MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Слушатели событий
timerIcon.addEventListener("click", toggleTimerPanel);
startTimerButton.addEventListener("click", startTimer);

const cancelTimerButton = document.getElementById("cancelTimer");

// Отменить таймер
function cancelTimer() {
    clearTimeout(timer); // Останавливаем таймер
    clearInterval(countdownInterval); // Останавливаем обратный отсчёт
    countdownDisplay.textContent = ""; // Очищаем текст обратного отсчёта
    toggleTimerPanel(); // Закрываем панель
}

// Слушатели событий
cancelTimerButton.addEventListener("click", cancelTimer);

const decreaseTimeButton = document.getElementById("decreaseTime");
const increaseTimeButton = document.getElementById("increaseTime");

decreaseTimeButton.addEventListener("click", () => {
    const currentValue = parseInt(timerInput.value, 10);
    timerInput.value = Math.max(currentValue - 1, timerInput.min);
});

increaseTimeButton.addEventListener("click", () => {
    const currentValue = parseInt(timerInput.value, 10);
    timerInput.value = Math.min(currentValue + 1, timerInput.max);
});





