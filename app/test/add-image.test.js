describe('AddImage component', () => {
  const assert = chai.assert;

  angular.mock.module.sharedInjector();

  // mocking the components module, which contains the addImage component
  before(angular.mock.module('components'));

  let $component = null;
  let component = null;
  before( angular.mock.inject( $componentController => {
    $component = $componentController;
    // grab the addImage component for testing
    component = $component('addImage');
  }));

  it('calls add through submit method', done => {
    // Mock the contents of the add image form
    component.title = 'Test Image';
    component.description = 'Description of the test image';
    component.url = 'http://example.com/test.jpg';

    // Mock the add method, which is defined elsewhere
    component.add = function(item) {
      const intendedResult = {
        title: component.title,
        description: component.description,
        url: component.url
      };
      assert.deepEqual(item,intendedResult);
      done();
    };

    // Run the test on the submit method
    component.submit();

  });

});
