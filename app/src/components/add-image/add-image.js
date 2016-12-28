import template from './add-image.html';
import styles from './add-image.scss';

export default {
  template,
  bindings: {
    add: '<'
  },
  controller
};

controller.$inject = ['galleryService'];
function controller(galleryService) {
  this.styles = styles;
  this.title = 'TestBunny1';
  this.description = 'This is the test bunny.';
  this.url = 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg';

  galleryService.get()
  .then( result => {
    this.albums = result;
    this.selectedAlbum = this.albums[0];
  })
  .catch( error => { console.log('Well this sucks:', error);});

  this.submit = () => {
    this.add({title: this.title, description:this.description, url:this.url});
  };
}
