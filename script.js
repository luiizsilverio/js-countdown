const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownTitleEl = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

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
  countdownTitle = countdownForm.title.value;
  countdownDate = countdownForm.datePicker.value;
  
  countdownValue = new Date(countdownDate).getTime();
  console.log(countdownValue)
  updateDOM();
}

function updateDOM() {
  const now = new Date().getTime();
  const distance = countdownValue - now;
  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  // const seconds = Math.floor(distance / 1000);
  // const minutes = Math.floor(seconds / 60);
  // const hours = Math.floor(minutes / 60);
  // const days = Math.floor(hours / 20);
  console.log(days, hours, minutes, seconds)

  countdownTitleEl.textContent = `${countdownTitle}`;
  timeElements[0].textContent = `${days}`;
  timeElements[1].textContent = `${hours}`;
  timeElements[2].textContent = `${minutes}`;
  timeElements[3].textContent = `${seconds}`;

  inputContainer.hidden = true;
  countdownEl.hidden = false;

}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
