import template from './image-app.html';
import styles from './image-app.css';

export default {
  template,
  controller
};

function controller() {
  this.styles = styles;
  this.imageList = [
    {
      title: 'Bunny',
      description: 'A cute bunny.',
      url: 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg'
    }
  ];

  this.viewOptions = ['all','detail','thumb','full'];

  this.selection = 'all';
}