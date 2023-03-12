import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('#datetime-picker');
const btnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

btnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      btnRef.disabled = true;
    } else {
      btnRef.disabled = false;
    }
  },
};

flatpickr(inputRef, options);

btnRef.addEventListener('click', onMakeCountdown);

let delta = null;
let intervalId = null;

function onMakeCountdown() {
  btnRef.disabled = true;
  calculateTime();
  intervalId = setInterval(() => calculateTime(), 1000);
}

function calculateTime() {
  delta = new Date(inputRef.value) - Date.now();

  if (delta > 0) {
    const timeObject = convertMs(delta);

    daysRef.textContent = addLeadingZero(timeObject.days);
    hoursRef.textContent = addLeadingZero(timeObject.hours);
    minutesRef.textContent = addLeadingZero(timeObject.minutes);
    secondsRef.textContent = addLeadingZero(timeObject.seconds);
  } else {
    clearInterval(intervalId);
    Notify.success('time is up');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}