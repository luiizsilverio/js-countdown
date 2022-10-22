const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('datepicker');

const countdownEl = document.getElementById('countdown');
const countdownTitleEl = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Take values from Form
function updateCountdown(e) {
  e.preventDefault();
  // countdownTitle = e.srcElement[0].value;
  // countdownDate = e.srcElement[1].value;
  countdownTitle = countdownForm.titulo.value;
  countdownDate = countdownForm.datepicker.value;

  if (countdownDate === '') {
    alert('Informe uma data');
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    // const days = Math.floor(distance / day);
    // const hours = Math.floor((distance % day) / hour);
    // const minutes = Math.floor((distance % hour) / minute);
    // const seconds = Math.floor((distance % minute) / second);
    
    // calcula n.o de dias
    let delta = Math.abs(distance / 1000);
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calcula n.o de horas
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calcula n.o de minutos
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // o que sobra são os segundos
    const seconds = Math.round(delta % 60);

    console.log('d:', days, 'h:', hours, 'm:', minutes, 's:', seconds)

    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} terminou às ${countdownDate}`;
      completeEl.hidden = false;
    } else {    
      countdownTitleEl.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;  
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

function reset() {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
