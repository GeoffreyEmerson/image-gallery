import template from './gallery-detail.html';
import './gallery-detail.scss';

export default {
  template,
  bindings: {
    gallery: '=',
    remove: '<'
  },
  controller
};

function controller() {

  this.delete = ($event) => {
    $event.stopPropagation();
    this.remove(this.gallery);
  };

}
