import template from './image-thumb.html';
import styles from './image-thumb.scss';

export default {
  template,
  bindings: {
    image: '=',
    remove: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

  this.delete = ($event) => {
    $event.stopPropagation();
    this.remove(this.image);
  };
}

