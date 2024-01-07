import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
    btn.disabled = true;

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let userSelectedDate = '';

const datePicker = flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= new Date().getTime()) {
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight'
            });
            btn.setAttribute('disabled', true);
        } else {
            btn.removeAttribute('disabled');
            userSelectedDate = selectedDates[0];
        }
    },
});

input.addEventListener('focus', () => {
  datePicker.config.defaultDate = new Date();
});

let intervalId;

btn.addEventListener('click', () => {
  const currentTime = new Date().getTime();
  const selectedTime = userSelectedDate.getTime();
  let countdownInterval = selectedTime - currentTime;

  const time = convertMs(countdownInterval);
  updateTimerDisplay(time);

  intervalId = setInterval(() => {
    countdownInterval -= 1000;
    const updatedTime = convertMs(countdownInterval);
    updateTimerDisplay(updatedTime);

    if (countdownInterval <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
  btn.disabled = true;
  input.disabled = true;
  console.log(countdownInterval);
  setTimeout(disabledInput, countdownInterval);
});

const disabledInput = () => {
  input.disabled = false;
};

function updateTimerDisplay(time) {
  daysTimer.textContent = addLeadingZero(time.days);
  hoursTimer.textContent = addLeadingZero(time.hours);
  minutesTimer.textContent = addLeadingZero(time.minutes);
  secondsTimer.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

