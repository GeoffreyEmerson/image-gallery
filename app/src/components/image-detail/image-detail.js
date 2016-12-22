import template from './image-detail.html';
import './image-detail.scss';

export default {
  template,
  bindings: {
    image: '=',
    remove: '<'
  },
  controller
};

function controller() {

  this.delete = ($event) => {
    $event.stopPropagation();
    this.remove(this.image);
  };

}
