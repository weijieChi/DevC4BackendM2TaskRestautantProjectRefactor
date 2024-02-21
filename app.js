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

// method-override
app.use(methodOverrid('_method'))
// bodyParser & x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/resraurants', (req, res) => {
  const data = (req.body)
  return Restaurant.create(data)
    .then(() => {
      res.redirect('/restaurants')
    })
    .catch((err) => {
      console.error(err)
    })
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

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  console.log(id)
  Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'location', 'phone', 'google_map', 'description'],
    raw: true
  })
    .then((restaurant) => {
      res.render('edit', { restaurant })
    })
    .catch((err) => {
      console.error(err)
    })
})

app.put('/resraurants/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  Restaurant.update(data, { where: { id } })
    .then(() => {
      res.redirect(`/restaurants/${id}`)
    })
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.destroy({ where: { id } })
    .then(() => {
      res.redirect('/restaurants')
    })
    .catch((err) => {
      console.error(err)
    })
})

// listen
app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})