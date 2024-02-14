'use strict'

//express
const express = require('express');
const app = express();
const port = 3000;

// express-handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views')

// middleware
// static file
app.use(express.static('public'))

// router
app.get('/', (req, res) => {
  res.render('index')
})

// listen
app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})