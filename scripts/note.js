const $form = document.getElementById('form')
const $clear = document.getElementById('clear')
const $add = document.getElementById('add')
const $search = document.getElementById('search')
const $notes = document.getElementById('notes')

let notesArray = localStorage.getItem('notes')
if (notesArray == null) {
    notesArray = []
} else {
    notesArray = JSON.parse(notesArray)
    displayAllNotes()
}

$clear.addEventListener('click', (event) => {
    event.preventDefault()
    notesArray = []
    $notes.innerHTML = ''
    localStorage.clear()
})


let id = localStorage.getItem('id')
if (id == null) {
    id = 0
}


$add.addEventListener('click', (event) => {
    event.preventDefault()

    let note = {
        id: id,
        title: $form.elements.title.value,
        text: $form.elements.text.value
    }
    id++
    localStorage.setItem('id', id)

    notesArray.push(note)

    $form.elements.title.value = ''
    $form.elements.text.value = ''
    
    displayNote(note)
    saveNotes()
})

$notes.addEventListener('click', (event) => {
    let $btn = event.target
    if ($btn.tagName == "BUTTON") {
        let noteId = $btn.dataset.id
        
        let found = notesArray.findIndex((element) => {
            return element.id == noteId
        })
        notesArray.splice(found, 1)
        saveNotes()
        displayAllNotes()
    }
})


function displayAllNotes() {
    $notes.innerHTML = ''
    notesArray.forEach(note => {
        displayNote(note)
    })
}

function displayNote(note) {
    let $newNote = document.createElement('div')
    $newNote.classList.add('note')

    $newNote.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.text}</p>
    <button data-id="${note.id}">X</button>`

    $notes.append($newNote)
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notesArray))
}
