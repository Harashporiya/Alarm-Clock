function getDateTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var timearea = 'AM';

    if (hour >= 12) {
        timearea = 'PM';
    }

    if (hour > 12) {
        hour = hour - 12;
    }

    else if (hour === 0) {
        hour = 12;
    }

    if (hour.toString().length === 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length === 1) {
        minute = '0' + minute;
    }
    if (second.toString().length === 1) {
        second = '0' + second;
    }

    var dateTime = hour + ':' + minute + ':' + second + ' ' + timearea;
    return dateTime;


}


setInterval(function () {
    var currentTime = getDateTime();
    document.getElementById("time").innerHTML = currentTime;
},);


const hour = document.getElementById('hour');
for (let i = 12; i > 0; i--) {
    let val;
    if (i < 10) {
        val = `0${i}`
    }
    else {
        val = i;
    }
    let option = `<option value="${val}">${val}</option>`;
    hour.insertAdjacentHTML("beforeend", option);
}


const minute = document.getElementById('minute');
for (let i = 59; i >= 0; i--) {
    let val;
    if (i < 10) {
        val = `0${i}`
    }
    else {
        val = i;
    }
    let option = `<option value="${val}">${val}</option>`;
    minute.insertAdjacentHTML("beforeend", option);
}


const second = document.getElementById('second');
for (let i = 59; i >= 0; i--) {
    let val;
    if (i < 10) {
        val = `0${i}`
    }
    else {
        val = i;
    }
    let option = `<option value="${val}">${val}</option>`;
    second.insertAdjacentHTML("beforeend", option);
}


const zone = document.getElementById('zone');

for (let i = 2; i > 0; i--) {
    let ampm;
    if (i === 1) {
        ampm = "AM"
    } else {
        ampm = "PM"
    }

    let option = `<option value="${ampm}">${ampm}</option>`;
    zone.insertAdjacentHTML("beforeend", option);
}

class Time {

    constructor(hour, minute, second, zone) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.zone = zone;
        this.audio = new Audio('alarmaudio.wav');
    }


    displayTime() {
        const timeDetails = `<p>Alarm set time out ${this.hour}:${this.minute}:${this.second}  ${this.zone}</p>`;
        console.log(timeDetails);
        document.getElementById('settime').innerHTML = timeDetails;
    }

    setAlarm() {
        const currentTime = getDateTime().split(' ')[0];
        const alarmTime = `${this.hour}:${this.minute}:${this.second}`;

        if (currentTime === alarmTime && this.zone === getDateTime().split(' ')[1]) {
            this.audio.play();
        }
    }


}


const alarmAudio = document.getElementById('alarmAudio');
const set = document.getElementById('set');
const btn = document.getElementById('btn');
const clear = document.getElementById('clear');
const settime = document.getElementById('settime');
clear.style.display = 'none';


btn.addEventListener('click', function () {
    btn.style.display = 'none';
    zone.style.display = 'none';
    hour.style.display = 'none';
    minute.style.display = 'none';
    second.style.display = 'none';
    set.style.display = 'none';
    clear.style.display = 'block';


    const hourValue = document.getElementById('hour').value;
    const minuteValue = document.getElementById('minute').value;
    const secondValue = document.getElementById('second').value;


    const newAlarm = new Time(hourValue, minuteValue, secondValue, zone.value);
    newAlarm.displayTime();
    
    
    setInterval(() => {
        newAlarm.setAlarm();
    });


    document.getElementById('hour').value = '';
    document.getElementById('minute').value = '';
    document.getElementById('second').value = '';

})


clear.onclick = function () {
    window.location.reload();
}