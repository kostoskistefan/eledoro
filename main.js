const {
    app,
    BrowserWindow
} = require('electron');

app.disableHardwareAcceleration();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    win.loadFile('index.html');
    win.maximize();
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit();
});