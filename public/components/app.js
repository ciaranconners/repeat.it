angular.module('flash-card')
.controller('AppCtrl', function($http) {
  var that = this;

  var currentUser = localStorage.getItem('currentUser');

  // $http.get('/decks', {params: {username: currentUser}}).then(function(res) {
  //     console.log(res);
  //     that.data = res.data;
  // });

  this.getDeck = function(deck){
    localStorage.setItem('currentDeck', JSON.stringify(deck));
  }

  this.handleDelete = function(deck) {
    var id = deck._id;
    $http.delete('/decks/' + id).then(function() {
      $http.get('/decks').then(function(res) {
        that.data = res.data;
      });
    });
  };

})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html',
});
