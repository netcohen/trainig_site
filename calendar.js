const Calendar = document.getElementById("calendar");
const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];



function load() {

    const dt = new Date();

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const daysInMonth = new Date(year, month +1, 0).getDate();
const firstDayOfTheMonth = new Date(year, month, 1)
const dateString = firstDayOfTheMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
});

const paddingDays = weekDays.indexOf(dateString.split(', ')[0]);   
document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

for (let i=1; i<=paddingDays+daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    if(i>paddingDays) {
        daySquare.innerText = i - paddingDays;

        daySquare.addEventListener('click',() => console.log('click'));

    } else {
        daySquare.classList.add('padding')
    }

Calendar.appendChild(daySquare);    

}
    console.log(paddingDays)

};

load();







