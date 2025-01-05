const { ipcRenderer } = require('electron');

export async function openFolderSelectionDialog()
{
    return await ipcRenderer.invoke('open-folder');
}

export async function openFileSelectionDialog()
{
    return await ipcRenderer.invoke('open-file');
}
