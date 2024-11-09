const { ipcRenderer } = require('electron');

export async function openFolderSelectionDialog()
{
    return await ipcRenderer.invoke('open-folder');
}
