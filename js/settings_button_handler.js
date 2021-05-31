(function () {
    function initialize_event_listeners() {
        let elements = ["pomodoro", "short-pause", "long-pause"];
        let periods = ["minute", "second"];

        for (let i = 0; i < elements.length; i++) {
            const label = elements[i];

            for (let j = 0; j < periods.length; j++) {
                let period = periods[j];

                let limit = j === 0 ? 29 : 59;

                document.getElementById(label + "-" + period + "-up").addEventListener("click", (e) => {
                    let element = document.getElementById(label + "-" + period + "s");
                    increaseTime(element, limit);
                });

                document.getElementById(label + "-" + period + "-down").addEventListener("click", (e) => {
                    let element = document.getElementById(label + "-" + period + "s");
                    decreaseTime(element, limit);
                });
            }
        }
    };

    function increaseTime(element, timeLimit) {
        let currentminute = +element.value;

        let minimum = timeLimit === 29 ? 4 : -1;

        if (currentminute >= timeLimit)
            currentminute = minimum;

        element.value = String(currentminute + 1).padStart(2, '0');
    }

    function decreaseTime(element, timeLimit) {
        let currentminute = +element.value;

        let minimum = timeLimit === 29 ? 5 : 0;

        if (currentminute <= minimum)
            currentminute = timeLimit + 1;

        element.value = String(currentminute - 1).padStart(2, '0');
    }

    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            initialize_event_listeners();
        }
    };
})();