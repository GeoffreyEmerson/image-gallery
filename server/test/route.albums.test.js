process.env.MONGODB_URI = 'mongodb://localhost/image-gallery-test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');
const request = chai.request(app);
const Image = require('../lib/models/image');

describe('Albums route', () => {

  before( done => {
    const drop = () => {
      // Test carefully if you reuse this. The done() call swallows errors.
      //  This is needed because mongo throws an error if the Collection doesn't exist yet.
      connection.db.dropCollection('albums', () => done() );
    };

    if (connection.readyState === 1) drop();
    else {
      connection.on('open', drop);
    }
  });

  const testAlbum1 = {
    __v: 0,
    title: 'Test Album',
    description: 'Description of test album'
  };

  it('/GET all', done => {
    request
    .get('/api/albums')
    .then(res => {
      assert.deepEqual(res.body, []);
      done();
    })
    .catch(done);
  });

  it('/POST first item', done => {
    request
    .post('/api/albums')
    .send(testAlbum1)
    .then(res => {
      const album = res.body;
      assert.ok(album._id);
      testAlbum1._id = album._id;
      testAlbum1.images = album.images;
      done();
    })
    .catch(done);

  });

  it('/GET by id', done => {
    request
    .get(`/api/albums/${testAlbum1._id}`)
    .then(res => {
      const album = res.body;
      assert.deepEqual(album, testAlbum1);
      done();
    })
    .catch(done);
  });

  it('/GET all after post', done => {
    request
    .get('/api/albums')
    .then(res => {
      assert.deepEqual(res.body, [ testAlbum1 ]);
      done();
    })
    .catch(done);
  });

  it('/POST second item', done => {
    request
    .post('/api/albums')
    .send({ title: 'Test Album 2', description: 'Another album description.'})
    .then(res => {
      assert.ok(res.body._id);
      assert.equal(res.body.title,'Test Album 2');
      assert.equal(res.body.description,'Another album description.');
      done();
    })
    .catch(done);
  });

  it('/GET by query property', done => {
    request
    .get('/api/albums')
    .query({title: 'Test Album'})
    .then(res => {
      assert.deepEqual(res.body, [ testAlbum1 ]);
      done();
    })
    .catch(done);
  });

  it('/PUT image into album', done => {
    let testImage = new Image({title:'Test Image',description:'A description',url:'http://test.com'});
    testImage.save()
    .then( saved => {
      testImage = saved;
      return request
      .put(`/api/albums/${testAlbum1._id}/add/${testImage._id}`);
    })
    .then( res => {
      assert.ok(res.body._id);
      assert.equal(res.body.title,'Test Album');
      assert.equal(res.body.images[0],testImage._id);
      done();
    })
    .catch(done);
  });

});
