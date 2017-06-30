angular.module('flash-card')
.controller('EditPageCtrl', function($http, $location){

  this.newCard = {};
  this.deck = JSON.parse(localStorage.getItem('currentDeck'));

  this.addCard = function(newCard) {
    if(!newCard.front || !newCard.back) {
      alert("Please fill out a card")
    } else {
      this.deck.cards.push(this.newCard);
      this.newCard = {};
    }
  };

  this.handleSave = function() {

    if(!this.deck.deckname) {
      alert("Please enter a deck name")
    } else {
      var id = this.deck._id;
      $http.put('/decks/' + id, this.deck).then(function() {
        $location.path('/');
      });
    }
  };

  this.deleteCard = function(card) {
    var i = this.deck.cards.indexOf(card);
    this.deck.cards.splice(i,1);
  };

  this.moveUp = function(card) {
    var index = this.deck.cards.indexOf(card);
    if(index === 0) {
      return;
    } else {
      var temp = this.deck.cards[index - 1];
      this.deck.cards[index - 1] = this.deck.cards[index];
      this.deck.cards[index] = temp;
    }
  };

  this.moveDown = function(card) {
    var index = this.deck.cards.indexOf(card);
    if(index === this.deck.cards.length-1) {
      return;
    } else {
      var temp = this.deck.cards[index + 1];
      this.deck.cards[index + 1] = this.deck.cards[index];
      this.deck.cards[index] = temp;
    }
  };
})
.component('editPage', {
  controller: 'EditPageCtrl',
  templateUrl: './templates/editPage.html' //calling from index.html
});
