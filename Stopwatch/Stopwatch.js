const timeDisplay = document.getElementById('timeDisplay');
const datePicker = document.getElementById('datePicker');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

let startTime = 0;
let running = false;
let interval;

function formatTime(ms) {
    const date = new Date(ms);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateDateDisplay() {
    const datePicker = document.getElementById('datePicker');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    datePicker.value = `${year}-${month}-${day}`;
}

async function updateTimeDisplay() {
    while (running) {
        startTime += 1000;
        timeDisplay.textContent = formatTime(startTime);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

startButton.addEventListener('click', () => {
    if (!running) {
        running = true;
        updateTimeDisplay();
    }
});

stopButton.addEventListener('click', () => {
    running = false;
});

resetButton.addEventListener('click', () => {
    running = false;
    startTime = 0;
    timeDisplay.textContent = '00:00:00';
});

// Initial setup
updateDateDisplay();
