const chalk = require('chalk')
const { debug } = require('console')
const fs= require('fs')
const { title } = require('process')
const getNotes = () => 'Your notes....'

const addNote = (title,body) =>{
    const notes = loadNotes()
    //const duplicatedNotes = notes.filter((note) => note.title == title)
    const duplicatedNote = notes.find((note) => note.title == title)
    
    debugger

    if(!duplicatedNote){
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
        console.log("New note added")
    }else{
        console.log("Note title taken")
    }
}

const removeNote = (title, body) =>{
    console.log(title,body)
    const notes = loadNotes()
    console.log(notes)
    const notesToKeep = notes.filter((note) => note.title != title)
    if (notes.length > notesToKeep.length ){
        saveNote(notesToKeep)
        console.log(chalk.green("Note removed"))
    }else{
        console.log(chalk.red('No Notes found'))
    }
}

const ListNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach(element => {
        console.log(element.title)
    });
}
const saveNote = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const readNote = (title) => {
    const notes = loadNotes()
    notes.forEach(note => {
        if (note.title == title){
            console.log(note)
        }
    })
    const foundNotes = notes.find(note => note.title == title)
    if(foundNotes){
        console.log(chalk.inverse(foundNotes.title))
        console.log(foundNotes.body)
    }else{
        console.log(chalk.red.inverse("Note not found"))
    }
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    ListNotes: ListNotes,
    readNote: readNote
}