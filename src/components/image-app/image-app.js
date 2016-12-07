import template from './image-app.html';

export default {
  template,
  controller
};

function controller() {
  this.imageList = [
    {
      title: 'Bunny',
      description: 'A cute bunny.',
      url: 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg'
    }
  ];
}