const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dev'
})

connection.connect((error) => {
    if (error) console.log(error)
    console.log('Dtb connection')
})

app.listen(8001, () => console.log('\n This server is running'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    connection.query('SELECT * FROM book', (error, result) => {
        if (error) console.log(error)
        response.json(result)
    })
})

// app.get('/', (request, response) => {
//     response.json({ name: "Lukman sefriyanto" })
// })

app.post('/', (request, response) => {

    const data = {
        name: request.body.name,
        writer: request.body.writer,
        description: request.body.description,
        publisher: request.body.publisher,
        year: request.body.year,
        stock: request.body.stock,
        genre: request.body.genre,
        created_at: new Date(),
        updated_at: new Date()

    }
    connection.query('INSERT INTO book SET ?', data, (error, result) => {
        if (error) console.log(error)

        response.json(result)
    })
})
    // app.post('/', (request, response) => {
    //     const name = request.body.name
    //     const data = {
    //         name: request.body.name,
    //         location: request.body.location,
    //         company: request.body.company
    //     }

//     response.json({ data })
// })