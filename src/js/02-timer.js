import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {        
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    dateTimeInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if(selectedDates[0].getTime() <= Date.now()) {
            Notify.failure('Please choose a date in the future.', {
                position: 'center-top',
            });
            return;            
        }
        selectedTime = selectedDates[0].getTime();
        refs.startBtn.disabled = false;
    },
};

let intervalId = null;
let selectedTime = null;

function init() {
    refs.startBtn.disabled = true;            
    flatpickr('#datetime-picker', options);
    
    refs.startBtn.addEventListener('click', start);
};

function start() {
    refs.startBtn.removeEventListener('click', start);
    refs.startBtn.textContent = 'Stop';
    refs.startBtn.setAttribute('style', 'background-color: red; border-radius: 3px; border: solid 1px black;');
    refs.startBtn.addEventListener('click', stop);
    refs.startBtn.disabled = false;
    refs.dateTimeInput.disabled = true;
    setTime();
    intervalId = setInterval(setTime, 1000);
};

function setTime() {
    const deltaTime = selectedTime - Date.now();
    const timeComponents = convertMs(deltaTime);

    Object.keys(refs).forEach((key, idx)=> {
        if(idx < 4) {
            refs[key].textContent = addLeadingZero(timeComponents[key]);
        }
    });

    if (deltaTime < 1000) {
        stop();
    }
};

function stop(){
    refs.startBtn.removeEventListener('click', stop);
    refs.startBtn.textContent = 'Start';
    refs.startBtn.removeAttribute('style');
    refs.startBtn.addEventListener('click', start);
    refs.dateTimeInput.disabled = false;
    refs.startBtn.disabled = true;
    clearInterval(intervalId);
    flatpickr('#datetime-picker', {...options, defaultDate: new Date(),});
    reset();
};

function reset() {    
    Object.keys(refs).forEach((key, idx) => {
        if(idx < 4) {
            refs[key].textContent = '00';
        }
    });

};


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

function addLeadingZero (num){
    return num.toString().padStart(2, '0');
}

init();