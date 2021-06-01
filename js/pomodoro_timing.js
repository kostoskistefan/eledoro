const settings = require('../js/settings');

const pomodoroEndNotification = () => {
    new Notification('Eledoro', {
        body: "Pomodoro finished. Take a break!"
    })
};

const breakEndNotification = () => {
    new Notification('Eledoro', {
        body: "Time's up! Lets get to work."
    })
};

let started = false;
let modes = Object.freeze({
    "POMODORO": 0,
    "SHORT_BREAK": 1,
    "LONG_BREAK": 2
});

let currentMode = modes.POMODORO;
let switchCount = 0;
let timer;

function initialize() {
    settings.initialize_event_listeners();

    document.getElementById("start").addEventListener("click", (e) => {
        let button = document.getElementById("start");
        started = !started;
        button.innerText = started ? "Reset" : "Start";

        if (started) {
            button.classList.remove("btn-success");
            button.classList.add("btn-danger");

            if (currentMode === modes.POMODORO)
                pomodoro();

            else if (currentMode === modes.SHORT_BREAK)
                short_break();
        } else {
            clearInterval(timer);

            button.classList.remove("btn-danger");
            button.classList.add("btn-success");

            switchCount = 0;
            currentMode = modes.POMODORO;

            let minutes = String(document.getElementById("pomodoro-minutes").value).padStart(2, '0');
            let seconds = String(document.getElementById("pomodoro-seconds").value).padStart(2, '0');
            document.getElementById("countdown").innerHTML = minutes + ":" + seconds;
        }
    });
}

function pomodoro() {
    call_timer("pomodoro");
}

function short_break() {
    call_timer("short-break");
}

function long_break() {
    call_timer("long-break");
}

function call_timer(element_id) {
    let minutes = +document.getElementById(element_id + "-minutes").value;
    let seconds = +document.getElementById(element_id + "-seconds").value;

    start_timer(get_date_from_time(minutes, seconds));
}

function start_timer(countdownTime) {
    timer = setInterval(function pomodoro_logic() {
        var distance = countdownTime - Date.now();

        var min = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
        var sec = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');

        document.getElementById("countdown").innerHTML = min + ":" + sec;

        if (distance <= 0) {
            clearInterval(timer);

            if (currentMode === modes.POMODORO) {
                if (++switchCount == settings.repeats - 1) {
                    switchCount = 0;
                    currentMode = modes.LONG_BREAK;
                    long_break();
                } else {
                    currentMode = modes.SHORT_BREAK;
                    short_break();
                }
                pomodoroEndNotification();
            } else {
                currentMode = modes.POMODORO;
                pomodoro();
                breakEndNotification();
            }
        }

        return pomodoro_logic;
    }(), 1000);
}

function get_date_from_time(minutes, seconds) {
    let now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    now.setSeconds(now.getSeconds() + seconds);
    return new Date(now);
}

module.exports.initialize = initialize;