angular.module('flash-card')
.controller('CreatePageCtrl', function($http, $location){
  this.newDeck = {};
  this.newDeck.cards = [];
  this.newCard = {};

  this.addCard = function(newCard) {
    if(!newCard.front || !newCard.back) {
      alert("Please fill out a card")
    } else {
      this.newDeck.cards.push(newCard);
      this.newCard = {};
    }
  }

  this.handleSave = function() {
    if(!this.newDeck.deckname) {
      alert("Please enter a deck name")
    } else {
      console.log(this.newDeck);
      $http.post('/decks', this.newDeck).then(function() {
        $location.path('/');
      });
    }
  }

  this.deleteCard = function(card) {
    var i = this.newDeck.cards.indexOf(card);
    this.newDeck.cards.splice(i,1);
  }

})
.component('createPage', {
  controller: 'CreatePageCtrl',
  templateUrl: './templates/createPage.html' //calling from index.html
});
