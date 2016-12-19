const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Image = require('../models/image');

router
  .get('/', (req, res, next) => {
    let query = {};
    if(req.query) query = req.query;

    Image.find(query)
    .select('title description url')
    .lean()
    .then( images => res.send(images) )
    .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Image.findById(req.params.id)
    .select('title description url')
    .lean()
    .then( image => res.send(image) )
    .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Image(req.body).save()
    .then( saved => res.send(saved) )
    .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Image.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then( saved => res.send(saved) )
    .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Image.findByIdAndRemove(req.params.id)
    .then( deleted => res.send(deleted) )
    .catch(next);
  });

module.exports = router;
