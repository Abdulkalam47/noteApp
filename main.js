const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const notesFile = path.join(app.getPath('userData'), 'notes.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  win.loadFile('index.html');
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('save-note', (event, note) => {
  const notes = loadNotes();
  notes.push(note);
  fs.writeFileSync(notesFile, JSON.stringify(notes));
});

ipcMain.handle('load-notes', () => loadNotes());

function loadNotes() {
  if (!fs.existsSync(notesFile)) return [];
  const data = fs.readFileSync(notesFile, 'utf-8');
  return JSON.parse(data);
}
