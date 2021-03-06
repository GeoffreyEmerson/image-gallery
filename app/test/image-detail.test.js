describe('ImageDetail component', () => {
  const assert = chai.assert;

  angular.mock.module.sharedInjector();

  // mocking the components module, which contains the imageDetail component
  before(angular.mock.module('components'));

  let $component = null;
  let component = null;
  before( angular.mock.inject( $componentController => {
    $component = $componentController;
    // grab the imageDetail component for testing
    component = $component('imageDetail');
  }));

  it('calls remove through delete method', done => {
    // Mock the current image
    component.image = {title: 'Test Image'};

    // Mock the remove method, which is defined elsewhere
    component.remove = function(item) {
      assert.equal(item,component.image);
      done();
    };

    // Run the test on the delete method
    component.delete();

  });

});
