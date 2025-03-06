const $form = document.getElementById('form')
const $clear = document.getElementById('clear')
const $add = document.getElementById('add')
const $search = document.getElementById('search')
const $notes = document.getElementById('notes')
const $results = document.getElementById('results')


let notesArray = localStorage.getItem('notes')
if (notesArray == null) {
    notesArray = []
} else {
    notesArray = JSON.parse(notesArray)
    displayNotes(notesArray)
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

    let now = new Date()

    let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear()

    let hours = now.getHours()
    let minutes = now.getMinutes()

    if (hours < 10) {
        hours = "0" + hours
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }

    let time = hours + ":" + minutes

    let note = {
        id: id,
        title: $form.elements.title.value,
        text: $form.elements.text.value,
        timestamp: date + " - " + time
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
        displayNotes(notesArray)
    }
})

let timer = null
$search.addEventListener('keydown', (event) => {
    if (timer != null) {
        clearTimeout(timer)
    }
    
    timer = setTimeout(search, 500)
})

function search() {
    let query = $search.value.toLowerCase()

    if (query == '') {
        displayNotes(notesArray)
        $results.innerText = ''
        return
    }

    let matches = []
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].title.toLowerCase().includes(query)) {
            matches.push(notesArray[i])
        } else if (notesArray[i].text.toLowerCase().includes(query)) {
            matches.push(notesArray[i])
        }
    }
    
    displayNotes(matches, true)

    $results.innerText = "Search results: " + matches.length
}



function displayNotes(array, highlight = false) {
    $notes.innerHTML = ''
    array.forEach(note => {
        displayNote(note, highlight)
    })
}

function displayNote(note, highlight = false) {
    let $newNote = document.createElement('div')
    $newNote.classList.add('note')

    if (highlight) {
        $newNote.classList.add('highlight')
    }

    $newNote.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.text}</p>
    <p class="timestamp">${note.timestamp}</p>
    <button data-id="${note.id}">X</button>`

    $notes.append($newNote)
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notesArray))
}
