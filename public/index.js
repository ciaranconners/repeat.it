// 'routings'

angular.module('flash-card', ['ngRoute'])
.controller('AppCtrl', function(){

})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html' //calling from index.html
});