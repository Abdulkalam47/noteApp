const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveNote: (note) => ipcRenderer.send('save-note', note),
  loadNotes: () => ipcRenderer.invoke('load-notes'),
});
