angular.module('flash-card')
.controller('AppCtrl', function($http) {
  var that = this;
  $http.get('../data/data.json').then(function(res) {
    that.data = res.data;
  });
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html',
});
