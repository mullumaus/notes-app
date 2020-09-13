const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const add = require('./utils.js')
const notes = require('./notes.js')

console.log(add(1,1))
console.log(notes.getNotes())

console.log(validator.isEmail('helloworld@gmail.com'))
console.log(validator.isURL('example.com'))
console.log(chalk.green('Success!'))

//get the user input
/*
command = process.argv[2]
switch (command){
    case 'add':
        console.log("adding node")
    case 'remove':
        console.log("removing node")
}*/

// user process to get user input
console.log(process.argv)

//create add command 
yargs.command({
    command: 'add',
    describe: 'Add a new node',
    builder: {
        title: {
            describe: "note title",
            demandOption: true, //must provided
            type: 'string'
        },
        body: {
            descibe:"Note body",
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        // console.log("adding a new node!",argv.title)
        // console.log("Body:"+argv.body)
        notes.addNote(argv.title, argv.body)
    }
})
//create remove command
yargs.command({
    command: 'remove',
    describe:'Remove a node',
    builder: {
        title: {
            describe: "note tilte",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title,argv.body)
    }
})
//create list command 
yargs.command({
    command: 'list',
    describe: 'list nodes',
    handler: function(){
        notes.ListNotes()
    }
})
//create read command
yargs.command({
    command:'read',
    describe:'Read node',
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.readNote(argv.title)
    }
})
yargs.version('1.2.0')
console.log(yargs.argv)

yargs.parse

//////////////////////////////////////////////////
