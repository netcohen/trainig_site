const newCalendar = document.getElementById("calendar");
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
const firstDayOfTheMonth = new Date(year, month, day)
    console.log(firstDayOfTheMonth)

};

load();







