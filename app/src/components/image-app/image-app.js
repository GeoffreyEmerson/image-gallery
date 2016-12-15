import template from './image-app.html';
import styles from './image-app.css';

export default {
  template,
  controller
};

controller.$inject = ['imageService'];
function controller(imageService) {
  this.styles = styles;

  imageService
  .get()
  .then( images => {
    this.imageList = images;
    console.log('imageList on load:',this.imageList);
  });

  this.viewOptions = ['all','detail','thumb','full'];

  this.selection = 'all';
}