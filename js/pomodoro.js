const window_handler = require('./js/window_handler');
const settings = require('./js/settings');
const player = require('play-sound')(opts = {});
let modes = Object.freeze(
{
    "POMODORO": 0,
    "SHORT_BREAK": 1,
    "LONG_BREAK": 2
});

let switchCount = 0;
let currentMode = modes.POMODORO;
let timerValue = 0;

function initialize()
{
    document.getElementById("start").addEventListener("click", () =>
    {
        let button = document.getElementById("start");

        if (settings.timer.status == "stopped")
            call_timer(currentMode === modes.POMODORO ? "pomodoro" : "short-break");

        else
        {
            let progressBar = document.getElementById("progress-bar");

            progressBar.setAttribute('aria-valuenow', 0);
            progressBar.style.width = "0%";

            settings.timer.stop();

            switchCount = 0;
            currentMode = modes.POMODORO;

            let minutes = String(document.getElementById("pomodoro-minutes").value).padStart(2, '0');
            let seconds = String(document.getElementById("pomodoro-seconds").value).padStart(2, '0');
            document.getElementById("countdown").innerHTML = minutes + ":" + seconds;
        }

        button.textContent = settings.timer.status == "running" ? "Reset" : "Start";
        button.classList.toggle("btn-success");
        button.classList.toggle("btn-danger");
    });

    document.getElementById("pause").addEventListener("click", () =>
    {
        let button = document.getElementById("pause");

        if (settings.timer.status == "running")
        {
            settings.timer.pause();
            button.classList.toggle("btn-outline-warning");
            button.classList.toggle("btn-warning");
            button.textContent = "Paused";
        }

        else if (settings.timer.status == "paused")
        {
            settings.timer.resume();
            button.classList.toggle("btn-outline-warning");
            button.classList.toggle("btn-warning");
            button.textContent = "Pause";
        }
    });
}

function map(x, in_min, in_max, out_min, out_max)
{
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function call_timer(element_id)
{
    let minutes = +document.getElementById(element_id + "-minutes").value;
    let seconds = +document.getElementById(element_id + "-seconds").value;

    timerValue = (minutes * 60 + seconds) * 1000;

    settings.timer.start((minutes * 60 + seconds) * 1000);
};

function notify(text)
{
    new Notification('Eledoro',
    {
        body: text
    })
}

settings.timer.on('tick', (ms) =>
{
    console.log(ms);
    var min = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    var sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    document.getElementById("countdown").innerHTML = min + ":" + sec;

    let progress = map(ms, 0, timerValue, 100, 0);
    let progressBar = document.getElementById("progress-bar");

    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.style.width = progress + "%";
});

settings.timer.on('done', () =>
{
    if (currentMode === modes.POMODORO)
    {
        if (++switchCount == settings.repeats - 1)
        {
            switchCount = 0;
            currentMode = modes.LONG_BREAK;
            call_timer("long-break");
        }

        else
        {
            currentMode = modes.SHORT_BREAK;
            call_timer("short-break");
        }

        notify("Pomodoro finished. Take a break!");
    }

    else
    {
        currentMode = modes.POMODORO;
        call_timer("pomodoro");

        notify("Time's up! Lets get to work.");
    }

    player.play('./assets/notification.mp3');
});

settings.timer.on('statusChanged', () =>
{
    if (settings.timer.status === "stopped")
    {
        document.querySelectorAll('.setting-container').forEach(element =>
        {
            element.style.opacity = 1;
            element.style.pointerEvents = "unset";
        });
    }
    else
    {
        document.querySelectorAll('.setting-container').forEach(element =>
        {
            element.style.opacity = 0.4;
            element.style.pointerEvents = "none";
        });
    }
});

(function ()
{
    document.onreadystatechange = () =>
    {
        if (document.readyState == "complete")
        {
            window_handler.handle_window_buttons();
            settings.initialize_event_listeners();
            initialize();
        }
    };
})();