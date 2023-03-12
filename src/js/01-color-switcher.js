const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onChangeColor);
stopBtn.addEventListener('click', onStopChangeColor)

let intervalId = null;

stopBtn.disabled = true;

function onChangeColor() {
    makeBackgroundColor();
    intervalId = setInterval(() => {
        makeBackgroundColor();
    }, 1000);
}

function onStopChangeColor() {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function makeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}