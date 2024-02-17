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
// x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// method-override
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
})

// app.get('/restaurants/new', (req, res) => {

// })

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  // 本本想找有沒有類似 SELECT * FROM `restaurants` WHERE `id` = id 之類的指令，但是沒有找到
  Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'location', 'phone', 'google_map', 'description'],
    raw: true
  })
    .then((restaurant) => {
      //
      res.render('detail', { restaurant })
    })
    .catch((err) => {
      console.error(err)
    })
})

// listen
app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})