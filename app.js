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

//database
const db = require('./models')
const Restaurant = db.Restaurant

// method-override
const methodOverrid = require('method-override')

// middleware
// static file
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverrid('_method'))

// router
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image'],
    raw: true
  })
    .then((restaurants) => {
      res.render('restaurants', { restaurants })
    })
    .catch((err) => {
      console.error(err)
    })
  // res.render('restaurants')
})

// listen
app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})