import template from './gallery-thumb.html';
import styles from './gallery-thumb.scss';

export default {
  template,
  bindings: {
    gallery: '=',
    remove: '<'
  },
  controller
};

controller.$inject = ['imageService'];
function controller(imageService) {
  this.styles = styles;

  this.$onInit = () => {
    imageService.get(this.gallery._id)
    .then( results => {
      this.imageList = results;
      console.log('this.gallery:', this.gallery);
      console.log('this.imageList:', this.imageList);
    })
    .catch( error => {
      console.log('Well this is embarassing:', error);
    });
  };

  this.delete = ($event,image) => {
    $event.stopPropagation();
    this.remove(image,this.gallery);
  };
}

