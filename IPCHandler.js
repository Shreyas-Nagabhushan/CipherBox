const { app, ipcMain, dialog } = require('electron');
const path = require('path');

function setupIPC()
{
    ipcMain.on('get-path', (event, type) => 
    {
        event.returnValue = app.getPath(type);
    });

    ipcMain.handle('open-folder', async () => 
    {
        const result = await dialog.showOpenDialog({properties: ['openDirectory']});
        return result.filePaths[0] || ''; 
    });

    ipcMain.handle('open-file', async () => 
    {
        const result = await dialog.showOpenDialog({properties: ['openFile']});
        return result.filePaths[0] || ''; 
    }); 
}

module.exports = setupIPC;