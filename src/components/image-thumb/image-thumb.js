import template from './image-thumb.html';
import styles from './image-thumb.css';

export default {
  template,
  bindings: {
    image: '='
  },
  controller
};

function controller() {
  this.styles = styles;
}

