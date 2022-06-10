const Calendar = document.getElementById("calendar");
const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const newEventModel = document.getElementById('newEventModal');
const deleteEventModel = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modelBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput')

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];



function openModel(date) {
clicked = date;

const eventForDay = events.find(e=> e.date === clicked)

if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModel.style.display = 'block'
} else {
    newEventModel.style.display = 'block';
}

backDrop.style.display = 'block'
}



function load() {

    const dt = new Date();
    if(nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav)
    }

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
Calendar.innerHTML= '';

for (let i=1; i<=paddingDays+daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    const dayString = `${i-paddingDays}/${month + 1}/${year}` 
    if(i>paddingDays) {
        daySquare.innerText = i - paddingDays;
    
        const eventForDay = events.find(e=> e.date === dayString)

        if( i - paddingDays === day && nav === 0) {
            daySquare.id = "currentDay"
        }

        if(eventForDay) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = eventForDay.title;
            daySquare.appendChild(eventDiv)
        }

        daySquare.addEventListener('click',() => openModel(`${i-paddingDays}/${month + 1}/${year}`));

    } else {
        daySquare.classList.add('padding')
    }

Calendar.appendChild(daySquare);    

}

};

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModel.style.display = 'none';
    deleteEventModel.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = 'null';
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');
        events.push({
            date: clicked,
            title: eventTitleInput.value,
        })

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }else{
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal()
}

function initButton() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++
        load();
    });
    document.getElementById('backButton').addEventListener('click', () => {
        nav--
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButton();
load();







