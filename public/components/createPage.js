angular.module('flash-card')
.controller('CreatePageCtrl', function($http, $location){
  var currentUser = localStorage.getItem('currentUser');
  this.newDeck = {username: currentUser};
  this.newDeck.cards = [];
  this.newCard = {};


  this.addCard = function(newCard) {
    if(!newCard.front || !newCard.back) {
      alert("Please fill out a card");
    } else {
      this.newDeck.cards.push(newCard);
      this.newCard = {};
    }
  };

  this.handleSave = function() {
    if(!this.newDeck.deckname) {
      alert("Please enter a deck name");
    } else {
      console.log('NEW DECK', this.newDeck);
      // post goes back to with user info
      $http.post('/decks?username=' + localStorage.getItem('currentUser'), this.newDeck).then(function() {
        $http.get('/decks', {params: {username: localStorage.getItem('currentUser')}}).then(function(response) {
          localStorage.setItem('decks', JSON.stringify(response.data));
          $location.path('/app');
        });
      });
    }
  };

  this.deleteCard = function(card) {
    var i = this.newDeck.cards.indexOf(card);
    this.newDeck.cards.splice(i,1);
  };

})
.component('createPage', {
  controller: 'CreatePageCtrl',
  templateUrl: './templates/createPage.html' //calling from index.html
});
