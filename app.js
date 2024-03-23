'use strict'

//express
const express = require('express');
const app = express();
const port = 3000;

// router
const router = require('./routes')

// express-handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views')



// method-override
const methodOverrid = require('method-override')

// middleware
// static file
app.use(express.static('public'))

// method-override
app.use(methodOverrid('_method'))
// bodyParser & x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
app.use(router)

// listen
app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})