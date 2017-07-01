angular.module('flash-card')
.controller('AppCtrl', function($http, $location) {
  var that = this;

  var currentUser = localStorage.getItem('currentUser');
  var decks = localStorage.getItem('decks');

  this.setDecks = function() {
    that.decks = JSON.parse(decks);
    console.log('setDecks called');
    console.log('this.decks: ', that.decks);
  };

  this.getDeck = function(deck){
    localStorage.setItem('currentDeck', JSON.stringify(deck));
  };

  this.handleDelete = function(deck) {
    var id = deck._id;
    $http.delete('/decks/' + id).then(function() {
      $http.get('/decks', {params:{username: currentUser}}).then(function(res) {
        that.decks = res.data;
      }, function(error) {console.error(error);});
      // we need to include a user identifier with the get request
    }, function(error) {console.error(error);});
  };

  this.setDecks();
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html',
});
