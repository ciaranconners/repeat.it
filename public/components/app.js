angular.module('flash-card')
.controller('AppCtrl', function($http, $timeout) {
  var that = this;
  var currentUser = localStorage.getItem('currentUser');
  this.setDecks = function() {
      that.decks = JSON.parse(localStorage.getItem('decks'));
      console.log('setDecks called. this.decks: ', that.decks);
  };
  this.getDeck = function(deck){
    localStorage.setItem('currentDeck', JSON.stringify(deck));
  };
  this.handleDelete = function(deck) {
    var id = deck._id;
    $http.delete('/decks/' + id).then(function() {
      $http.get('/decks', {params:{username: currentUser}}).then(function(res) {
        localStorage.setItem('decks', JSON.stringify(res.data));
        that.decks = res.data;
        console.log('inside handle delete', localStorage.getItem('decks'));
      }, function(error) {console.error(error);});
    }, function(error) {console.error(error);});
  };
  if (currentUser === null) {
    // this is to make the client-side wait for the public decks to arrive before setting this.decks
    console.log('you are not signed in');
    $timeout(function() {that.setDecks();}, 100);
  } else {
    this.setDecks();
  }
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html',
});
