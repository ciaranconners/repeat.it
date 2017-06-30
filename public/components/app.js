angular.module('flash-card')
.controller('AppCtrl', function($http) {
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
  }

  this.handleDelete = function(deck) {
    var id = deck._id;
    $http.delete('/decks/' + id).then(function() {
      $http.get('/decks').then(function(res) {
        that.data = res.data;
      });
    });
  };
  this.setDecks();
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html',
});
