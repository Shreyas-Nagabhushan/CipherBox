const { app, BrowserWindow } = require('electron');
const setupIPC = require("./IPCHandler.js")

function createWindow() 
{
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: 
        {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true
        }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('index.html');

    mainWindow.webContents.on('did-finish-load', () => 
    {
        const openedFrom = process.argv[1] || process.argv[0];
        mainWindow.webContents.send("paths", { userData: app.getPath('userData'), appData: app.getPath('appData'), openedFrom: openedFrom});
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin') 
    {
        app.quit();
    }
});

app.on('activate', () => 
{
    if (BrowserWindow.getAllWindows().length === 0) 
    {
        createWindow();
    }
});

setupIPC();