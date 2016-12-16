import template from './image-app.html';
import styles from './image-app.css';

export default {
  template,
  controller
};

controller.$inject = ['imageService'];
function controller(imageService) {
  this.styles = styles;
  this.loading = true;

  imageService
  .get()
  .then( images => {
    this.imageList = images;
    this.loading = false;

  });

  this.viewOptions = ['all','detail','thumb','full'];

  this.selection = 'all';

  this.add = function(image) {
    this.loading = true;
    imageService
    .add(image)
    .then( image => {
      this.imageList.push(image);
      this.loading = false;
    });
  };

  this.remove = function(image) {
    this.loading = true;
    imageService
    .remove(image._id)
    .then( image => {
      this.loading = false;
      const index = this.imageList.indexOf(image);
      if (index != -1) this.imageList.splice(index,1);
    });
  };
}
