angular.module('flash-card')
.controller('EditPageCtrl', function($http, $location){
  var that = this;
  this.showEdit = false;

  this.newCard = {};
  this.deck = JSON.parse(localStorage.getItem('currentDeck'));

  this.addCard = function(newCard) {
    if(!newCard.front || !newCard.back) {
      alert("Please fill out a card")
    } else {
      this.deck.cards.push(this.newCard);
      this.newCard = {};
    }
  }

  this.activateEdit = function(card) {
    this.showEdit = !this.showEdit;
  }

  this.handleSave = function() {

    if(!this.deck.deckname) {
      alert("Please enter a deck name")
    } else {
      var id = this.deck._id;
      $http.put('/decks/', this.deck, {params: {username: localStorage.getItem('currentUser')}}).then(function() {
        $http.get('/decks', {params: {username: localStorage.getItem('currentUser')}}).then(function(response) {
          console.log('getting decks', response);
          localStorage.setItem('decks', JSON.stringify(response.data));
          $location.path('/app');
        });
      });
    }

  }

  this.deleteCard = function(card) {
    var i = this.deck.cards.indexOf(card);
    this.deck.cards.splice(i,1);
  }
})
.component('editPage', {
  controller: 'EditPageCtrl',
  templateUrl: './templates/editPage.html' //calling from index.html
});


