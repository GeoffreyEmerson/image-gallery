describe('ImageService', () => {
  const assert = chai.assert;

  // This command lets angular mock know we intend to use the same
  // injector multiple times without creating it again each time
  angular.mock.module.sharedInjector();

  // This tells angular mock which set of modules we will be using,
  // and it's where we set up the mocked vaule service defined at
  // the top of the app.
  before(angular.mock.module('services', {apiUrl: '/api'}));

  let $httpBackend = null, imageService = null;

  // Here we specify which factory we want to mock. It must use
  // the format seen here, called Underscore Wrapping. That allows
  // us to use the actual token ('imageService') if we want.
  // Here we also declare that we wish to use the httpBackend
  // service provided by angular mock to catch any api calls and
  // mock the response.
  before(angular.mock.inject( (_imageService_, _$httpBackend_) => {
    imageService = _imageService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    // After each test is run, check to see if there are any
    // missing or extra api calls. It would be important to
    // know if our code was accidentally making more or fewer
    // calls than we wanted.
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('gets images', done => {
    const images = ['Just','Test','Array'];

    // Tell the mocked backend that it should expect to receive
    // a GET request at this address, and that it should simulate
    // a response by handing back the images array.
    $httpBackend
    .expectGET('/api/images')
    .respond(images);

    // Run the service test
    imageService
    .get()
    .then(allImages => {
      assert.deepEqual(allImages, images);
      done();
    })
    .catch(done);

    // The flush command executes the actual GET request that
    // was set up in the test above. It allows the testing
    // environment to simulate async calls. That's why it goes
    // at the end of the synchronous code block.
    $httpBackend.flush();
  });

  it('post images', done => {
    const testImage = {
      title: 'whatever',
      description: 'whatever',
      url: 'whatever'
    };

    $httpBackend
    .expectPOST('/api/images')
    .respond(testImage);

    imageService
    .add(testImage)
    .then(savedImage => {
      assert.deepEqual(savedImage, testImage);
      done();
    })
    .catch(done);

    $httpBackend.flush();
  });

  it('removes images', done => {
    const testImage = {
      title: 'whatever',
      description: 'whatever',
      url: 'whatever',
      _id: '12345'
    };
    const id = '12345';

    $httpBackend
    .expectDELETE(`/api/images/${id}`)
    .respond(testImage);

    imageService
    .remove(testImage)
    .then(removedImage => {
      assert.deepEqual(removedImage, testImage);
      done();
    })
    .catch(done);

    $httpBackend.flush();
  });
});