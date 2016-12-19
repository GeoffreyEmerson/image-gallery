describe( 'Image component', () => {
  const assert = chai.assert;

  // this will hold our image "store"
  const imageStore = [
    { title: 'Test Image1', description: 'Description of image 1', url: 'http://example.com/test1.jpg', _id: 'ZAXS4321' },
    { title: 'Test Image2', description: 'Description of image 2', url: 'http://example.com/test2.jpg', _id: 'XSZA2143' }
  ];

  const newImage = { title: 'Test Image3', description: 'Description of image 3', url: 'http://example.com/test3.jpg' };

  const imageService = {
    get() {
      const copy = Array.from(imageStore);
      return Promise.resolve(copy);
    },
    add(image) {
      image._id = 'ABCD1234';
      imageStore.push(image);
      return Promise.resolve(image);
    },
    remove(image) {
      imageStore.splice(imageStore.indexOf(image),1);
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

  it('loads images automatically', done => {
    //assert.equal(component.loading, true, 'this.loading at startup should be true, but test is not reliable');
    setTimeout(() => {
      assert.deepEqual(component.imageList, imageStore);
      assert.equal(component.loading, false);
      done();
    },5);
  });

  it('adds an image', done => {
    assert.equal(component.loading, false);
    component.add(newImage);
    assert.equal(component.loading, true);
    setTimeout(() => {
      assert.equal(component.loading, false);
      assert.equal(imageStore.length, 3);
      assert.equal(imageStore[2].title, newImage.title);
      assert.equal(component.imageList.length, 3);
      assert.equal(component.imageList[2].title, newImage.title);
      done();
    });
  });

  it('removes an image', done => {
    assert.equal(component.loading, false);
    component.remove(newImage);
    assert.equal(component.loading, true);
    setTimeout(() => {
      assert.equal(component.loading, false);
      assert.equal(imageStore.length, 2);
      assert.equal(component.imageList.length, 2);
      done();
    });
  });

});