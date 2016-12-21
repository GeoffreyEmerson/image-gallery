import template from './image-app.html';
import styles from './image-app.scss';

export default {
  template,
  controller
};

controller.$inject = ['imageService'];
function controller(imageService) {
  this.styles = styles;
  this.viewOptions = ['thumb','full','detail'];
  this.view = 'detail';

/********************
  Startup procedure
*********************/

  this.loading = true;
  imageService
  .get()
  .then( images => {
    this.imageList = images;
    this.loading = false;
  });

/********************
  Component methods
*********************/
  this.viewSelect = function(choice) {
    this.view = choice;
  };

  this.viewSelect = function(choice) {
    if (choice == 'thumb') return 'selected';
  };

  this.add = image => {
    this.loading = true;
    imageService
    .add(image)
    .then( result => {
      this.imageList.push(result);
      this.loading = false;
    })
    .catch( err => {
      console.log('error in image-app add method:',err);
    });
  };

  this.remove = image => {
    this.loading = true;
    imageService
    .remove(image)
    .then( deleted => {
      this.loading = false;
      const index = indexOfId(this.imageList, deleted);
      if (index != -1) this.imageList.splice(index,1);
      else console.log('Image not found in current array:',deleted,this.imageList);
    })
    .catch( err => {
      console.log('Error in image-app remove method:',err);
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
