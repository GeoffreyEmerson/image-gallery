import template from './gallery-app.html';
import styles from './gallery-app.scss';

export default {
  template,
  controller
};

controller.$inject = ['galleryService'];
function controller(galleryService) {
  this.styles = styles;

/********************
  Startup procedure
*********************/

  this.loading = true;
  galleryService
  .get()
  .then( galleries => {
    // galleries.push({title:'Demo',description:'Demo Description',_id:'abcd1234'});
    this.galleryList = galleries;
    this.loading = false;
  })
  .catch( error => { console.log('Well this sucks:',error); });

/********************
  Component methods
*********************/
  // this.viewSelect = function(choice) {
  //   this.view = choice;
  // };

  // this.viewSelect = function(choice) {
  //   if (choice == 'thumb') return 'selected';
  // };

  this.add = gallery => {
    this.loading = true;
    galleryService
    .add(gallery)
    .then( result => {
      this.galleryList.push(result);
      this.loading = false;
    })
    .catch( err => {
      console.log('error in gallery-app add method:',err);
    });
  };

  this.remove = gallery => {
    this.loading = true;
    galleryService
    .remove(gallery)
    .then( deleted => {
      this.loading = false;
      const index = indexOfId(this.galleryList, deleted);
      if (index != -1) this.galleryList.splice(index,1);
      else console.log('Gallery not found in current array:',deleted,this.galleryList);
    })
    .catch( err => {
      console.log('Error in gallery-app remove method:',err);
    });
  };

  // Custom function to search by _id in an array of objects
  function indexOfId(arr,item) {
    let index = -1;
    for (let i=0; i<arr.length; i++) {
      if(arr[i]._id == item._id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
