'use strict'

// 引用 Express 與 Express 路由器
const express = require('express');
const router = express.Router();

//database
const db = require('../models');
const Restaurant = db.Restaurant;

router.get('/new', (req, res) => {
  res.render('new')
});

router.post('/', (req, res) => {
  const data = (req.body)
  return Restaurant.create(data)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
    });
});

router.get('/', (req, res) => {
  Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image'],
    raw: true
  })
    .then((restaurants) => {
      res.render('restaurants', { restaurants })
    })
    .catch((err) => {
      console.error(err)
    });
});

router.get('/:id', (req, res) => {
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
    });
});

router.get('/:id/edit', (req, res) => {
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
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  Restaurant.update(data, { where: { id } })
    .then(() => {
      res.redirect(`/${id}`)
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.destroy({ where: { id } })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
    });
});

module.exports = router;