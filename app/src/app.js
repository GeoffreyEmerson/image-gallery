import angular from 'angular';
import components from './components';
import services from './services';
import uiRouter from 'angular-ui-router';
import routes from './routes';
import './app.scss';

const app = angular.module('angularApp', [
  components,
  services,
  uiRouter
]);

app.config(routes);

app.value('apiUrl', 'http://localhost:3000/api');
