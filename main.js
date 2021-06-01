const
{
    app,
    BrowserWindow
} = require('electron');

app.disableHardwareAcceleration();

function createWindow()
{
    const win = new BrowserWindow(
    {
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 500,
        frame: false,
        icon: __dirname + "/assets/icon.png",
        webPreferences:
        {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    win.loadFile('index.html');
    win.maximize();
}

app.whenReady().then(() =>
{
    createWindow()
});

app.on('window-all-closed', function ()
{
    if (process.platform !== 'darwin')
        app.quit();
});