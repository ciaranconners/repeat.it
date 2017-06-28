angular.module('flash-card')
.controller('CreatePageCtrl', function(){
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
    }
    console.log(this.newDeck)
  }
})
.component('createPage', {
  controller: 'CreatePageCtrl',
  templateUrl: './templates/createPage.html' //calling from index.html
});