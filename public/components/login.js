angular.module('login', ['ngRoute'])
.controller('LoginCtrl', function(){

})
.component('login', {
  controller: 'LoginCtrl',
  templateUrl: './templates/login.html' //calling from index.html
});