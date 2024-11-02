window.onload = async () => {
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
  
    
    const notes = await window.electronAPI.loadNotes();
    notes.forEach(note => addNoteToList(note));
  
    
    window.saveNote = () => {
      const noteText = noteInput.value;
      if (noteText.trim() === '') return;
  
      window.electronAPI.saveNote(noteText);
      addNoteToList(noteText);
      noteInput.value = '';
    };
  
    function addNoteToList(note) {
      const listItem = document.createElement('div');
      listItem.innerText = note;
      listItem.onclick = () => noteInput.value = note;
      notesList.appendChild(listItem);
    }
  };
  