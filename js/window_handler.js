const {
    BrowserWindow
} = require('electron').remote

function handle_window_buttons() {
    document.getElementById("minimize").addEventListener("click", (e) => {
        BrowserWindow.getFocusedWindow().minimize();
    });

    document.getElementById("maximize").addEventListener("click", (e) => {
        let window = BrowserWindow.getFocusedWindow();
        window.isMaximized() ? window.unmaximize() : window.maximize();
    });

    document.getElementById("close").addEventListener("click", (e) => {
        BrowserWindow.getFocusedWindow().close();
    });
};

module.exports.handle_window_buttons = handle_window_buttons;