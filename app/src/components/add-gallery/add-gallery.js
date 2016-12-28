import template from './add-gallery.html';
import styles from './add-gallery.scss';

export default {
  template,
  bindings: {
    add: '<'
  },
  controller
};

function controller() {
  this.styles = styles;
  this.title = 'Bunny Album';
  this.description = 'This is the test bunny album.';

  this.submit = () => {
    this.add({title: this.title, description:this.description});
  };
}
