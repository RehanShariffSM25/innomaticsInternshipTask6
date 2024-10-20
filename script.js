// DOM Elements
const noteForm = document.getElementById('task-form');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const categoryInput = document.getElementById('note-category');
const addNoteBtn = document.getElementById('add-note-btn');
const searchInput = document.getElementById('search-input');
const notesList = document.getElementById('notes-list');
const noNotesMessage = document.getElementById('no-notes-message');
const filterBtns = document.querySelectorAll('.filter-btn');

// Notes Array and LocalStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to render notes
// Function to render notes
function renderNotes(notesToRender) {
    notesList.innerHTML = '';

    if (notesToRender.length === 0) {
        noNotesMessage.style.display = 'block';
    } else {
        noNotesMessage.style.display = 'none';

        notesToRender.forEach((note, index) => {
            const noteItem = document.createElement('li');
            noteItem.classList.add('note-item');

            // Add a class for the category to apply color-coded background
            switch (note.category) {
                case 'Work':
                    noteItem.classList.add('work');
                    break;
                case 'Personal':
                    noteItem.classList.add('personal');
                    break;
                case 'Study':
                    noteItem.classList.add('study');
                    break;
                case 'Others':
                    noteItem.classList.add('others');
                    break;
                default:
                    break;
            }

            noteItem.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <small>Category: ${note.category}</small>
                <div class="note-actions">
                    <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
                </div>
            `;
            notesList.appendChild(noteItem);
        });
    }
}

// Add Note
addNoteBtn.addEventListener('click', function () {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const category = categoryInput.value;

    if (title && content && category) {
        notes.push({ title, content, category });
        localStorage.setItem('notes', JSON.stringify(notes));
        titleInput.value = '';
        contentInput.value = '';
        categoryInput.value = '';
        renderNotes(notes);
    } else {
        alert('Please fill out all fields.');
    }
});

// Delete Note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes(notes);
}

// Edit Note
function editNote(index) {
    const noteToEdit = notes[index];
    titleInput.value = noteToEdit.title;
    contentInput.value = noteToEdit.content;
    categoryInput.value = noteToEdit.category;

    deleteNote(index);
}

// Search Notes
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.content.toLowerCase().includes(searchTerm)
    );
    renderNotes(filteredNotes);
});

// Filter by Category
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const category = btn.getAttribute('data-category');
        const filteredNotes = category === 'all' ? notes : notes.filter(note => note.category === category);
        renderNotes(filteredNotes);
    });
});

// Initial render
renderNotes(notes);
