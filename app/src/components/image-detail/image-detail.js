import template from './image-detail.html';

export default {
  template,
  bindings: {
    image: '=',
    remove: '<'
  },
  controller
};

function controller() {

  this.delete = () => {
    this.remove(this.image);
  };

}
