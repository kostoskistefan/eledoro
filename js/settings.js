const Tiny_Timer = require('tiny-timer');
const timer = new Tiny_Timer();

let repeats = 4;

function initialize_event_listeners()
{
    let elements = ["pomodoro", "short-break", "long-break"];
    let periods = ["minute", "second"];

    for (let i = 0; i < elements.length; i++)
    {
        const label = elements[i];

        for (let j = 0; j < periods.length; j++)
        {
            let period = periods[j];

            let limit = j === 0 ? 29 : 59;

            document.getElementById(label + "-" + period + "-up").addEventListener("click", (e) =>
            {
                if (timer.status === "stopped")
                {
                    let element = document.getElementById(label + "-" + period + "s");
                    increase_time(element, limit);

                    if (label === "pomodoro")
                        update_countdown_display();
                }
            });

            document.getElementById(label + "-" + period + "-down").addEventListener("click", (e) =>
            {
                if (timer.status === "stopped")
                {
                    let element = document.getElementById(label + "-" + period + "s");
                    decrease_time(element, limit);

                    if (label === "pomodoro")
                        update_countdown_display();
                }
            });
        }
    }

    document.getElementById("repeat-up").addEventListener("click", (e) =>
    {
        let element = document.getElementById("repeats");

        if (+element.value < 10)
            element.value++;

        repeats = element.value;
    });

    document.getElementById("repeat-down").addEventListener("click", (e) =>
    {
        let element = document.getElementById("repeats");

        if (+element.value > 1)
            element.value--;

        repeats = element.value;
    });
};

function update_countdown_display()
{
    let minutes = String(document.getElementById("pomodoro-minutes").value).padStart(2, '0');
    let seconds = String(document.getElementById("pomodoro-seconds").value).padStart(2, '0');
    document.getElementById("countdown").innerHTML = minutes + ":" + seconds;
}

function increase_time(element, timeLimit)
{
    let currentminute = +element.value;

    let minimum = timeLimit === 29 ? 4 : -1;

    if (currentminute >= timeLimit)
        currentminute = minimum;

    element.value = String(currentminute + 1).padStart(2, '0');
}

function decrease_time(element, timeLimit)
{
    let currentminute = +element.value;

    let minimum = timeLimit === 29 ? 5 : 0;

    if (currentminute <= minimum)
        currentminute = timeLimit + 1;

    element.value = String(currentminute - 1).padStart(2, '0');
};

module.exports.initialize_event_listeners = initialize_event_listeners;
module.exports.repeats = repeats;
module.exports.timer = timer;