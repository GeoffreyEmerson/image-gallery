const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
//const Image = require('../models/image');
const Album = require('../models/album');

router
  .get('/', (req, res, next) => {
    let query = {};
    if(req.query) query = req.query;

    Album.find(query)
    .lean()
    .then( albums => res.send(albums) )
    .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Album.findById(req.params.id)
    .lean()
    .then( album => res.send(album) )
    .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Album(req.body).save()
    .then( saved => res.send(saved) )
    .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Album.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then( saved => res.send(saved) )
    .catch(next);
  })

  .put('/:id/add/:image', bodyParser, (req, res, next) => {
    Album.findById(req.params.id)
    .then( album => {
      album.images.push(req.params.image);
      return Album.findByIdAndUpdate(album._id, album, {new:true});
    })
    .then( saved => res.send(saved) )
    .catch(next);
  })

  .put('/:id/remove/:image', bodyParser, (req, res, next) => {
    Album.findById(req.params.id)
    .then( album => {
      album.images.splice(arrayIndexOf(req.params.image),1);
      return Album.findByIdAndUpdate(album._id, album, {new:true});
    })
    .then( saved => res.send(saved) )
    .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Album.findByIdAndRemove(req.params.id)
    .then( deleted => res.send(deleted) )
    .catch(next);
  });

module.exports = router;
