const window_handler = require('./js/window_handler');
const pomodoro_timing = require('./js/pomodoro_timing');

(function () {
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            window_handler.handle_window_buttons();
            pomodoro_timing.initialize();
        }
    };
})();