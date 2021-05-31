(function () {
    // Retrieve remote BrowserWindow
    const {BrowserWindow} = require('electron').remote

    function init() {
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

    document.onreadystatechange =  () => {
        if (document.readyState == "complete") {
            init();
        }
    };
})();