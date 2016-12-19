import angular from 'angular';
import components from './components';
import services from './services';

const app = angular.module('angularApp', [components,services]);

app.value('apiUrl', 'http://localhost:3000/api');
