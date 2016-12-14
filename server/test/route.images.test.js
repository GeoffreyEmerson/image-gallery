const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');
const request = chai.request(app);

describe('Images route', () => {

  before( done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else {
      connection.on('open', drop);
    }
  });

  const testImage1 = {
    title: 'Test Image',
    description: 'Description of test image',
    url: 'http://example.com/example.jpg'
  };

  it('/GET all', done => {
    request
    .get('/api/images')
    .then(res => {
      assert.deepEqual(res.body, []);
      done();
    })
    .catch(done);
  });

  it('/POST first item', done => {
    request
    .post('/api/images')
    .send(testImage1)
    .then(res => {
      const image = res.body;
      assert.ok(image._id);
      testImage1._id = image._id;
      done();
    })
    .catch(done);

  });

  it('/GET by id', done => {
    request
    .get(`/api/images/${testImage1._id}`)
    .then(res => {
      const image = res.body;
      assert.deepEqual(image, testImage1);
      done();
    })
    .catch(done);
  });

  it('/GET all after post', done => {
    request
    .get('/api/images')
    .then(res => {
      assert.deepEqual(res.body, [ testImage1 ]);
      done();
    })
    .catch(done);
  });

  it('/POST second item', done => {
    request
    .post('/api/images')
    .send({ title: 'Test Image 2', description: 'Another image description.', url: 'http:example.com/example2.jpg'})
    .then(res => {
      assert.ok(res.body._id);
      done();
    })
    .catch(done);
  });

  it('/GET by query property', done => {
    request
    .get('/api/images')
    .query({title: 'Test Image'})
    .then(res => {
      assert.deepEqual(res.body, [ testImage1 ]);
      done();
    })
    .catch(done);
  });

});
