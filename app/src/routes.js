routes.$inject = ['$stateProvider','$urlRouterProvider'];

export default function routes($stateProvider,$urlRouterProvider) {
  $stateProvider.state({
    name:'welcome',
    url:'/',
    component:'welcome'
  });

  $stateProvider.state({
    name:'about',
    url:'/about',
    component:'about',
    abstract: true,
    default: '.me'
  });

  $stateProvider.state({
    name:'about.me',
    url:'/me',
    component:'aboutMe'
  });

  $stateProvider.state({
    name:'about.app',
    url:'/app',
    component:'aboutApp'
  });

  $stateProvider.state({
    name:'images',
    url:'/images',
    component:'imageApp'
  });

  $stateProvider.state({
    name:'galleries',
    url:'/galleries',
    component:'galleryApp'
  });

  $urlRouterProvider.otherwise('/');
}