describe( 'Image component', () => {
  const assert = chai.assert;

  // this will hold our image "store"
  const images = [
    { title: 'Test Image1', description: 'Description of image 1', url: 'http://example.com/test1.jpg' },
    { title: 'Test Image2', description: 'Description of image 2', url: 'http://example.com/test2.jpg' }
  ];

  const image = { title: 'Test Image3', description: 'Description of image 3', url: 'http://example.com/test3.jpg' };

  const imageService = {
    get() {
      return Promise.resolve(images);
    },
    add(image) {
      return Promise.resolve(image);
    },
    remove(image) {
      images.splice(images.indexOf(image),1);
      return Promise.resolve(image);
    }
  };

  angular.mock.module.sharedInjector();

  // mocking the components module, which contains the imageApp component
  before(angular.mock.module('components'));

  let $component = null;
  let component = null;
  before( angular.mock.inject( $componentController => {
    $component = $componentController;
    // grab the imageApp component for testing, and inject our mocked imageService
    component = $component('imageApp', { imageService });
  }));

  it('loads images', done => {
    setTimeout(() => {
      assert.equal(component.imageList, images);
      done();
    },1);
  });

  it('adds an image', done => {
    component.add(image);
    setTimeout(() => {
      assert.equal(images.length, 3);
      assert.equal(images[2], image);
      done();
    },1);
  });

  it('removes an image', done => {
    component.remove(image);
    setTimeout(() => {
      assert.equal(images.length, 2);
      done();
    },0);
  });

});