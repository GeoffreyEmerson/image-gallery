const {assert} = chai;

describe('Image service', () => {

  beforeEach(angular.mock.module('services', {apiUrl: '/api'}));

  let $httpBackend = null, imageService = null;

  beforeEach(angular.mock.inject((_imageService_, _$httpBackend_) => {
    imageService = _imageService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    //Go back and look at this
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('gets images', done => {
    const images = [1,2,3];

    $httpBackend
    .expectGET('/api/images')
    .respond(images);

    imageService
    .get()
    .then(allImages => {
      assert.deepEqual(allImages, images);
      done();
    })
    .catch(done);

    $httpBackend.flush();
  });

  it('post images', done => {
    const newImage = {
      title: 'whatever',
      description: 'whatever',
      url: 'whatever'
    };

    $httpBackend
    .expectPOST('/api/images')
    .respond(newImage);

    imageService
    .add(newImage)
    .then(savedImage => {
      assert.deepEqual(savedImage, newImage);
      done();
    })
    .catch(done);

    $httpBackend.flush();
  });

  it('removes images', done => {
    const newImage = {
      title: 'whatever',
      description: 'whatever',
      url: 'whatever',
      id: '12345'
    };
    const id = '12345';

    $httpBackend
    .expectDELETE(`/api/images/${id}`)
    .respond(newImage);

    imageService
    .remove(id)
    .then(delImage => {
      assert.deepEqual(delImage, newImage);
      done();
    })
    .catch(done);

    $httpBackend.flush();
  });
});