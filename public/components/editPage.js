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
    var id = this.deck._id;
    $http.put('/decks/' + id, this.deck).then(function() {
      $location.path('/');
    });
  }

})
.component('editPage', {
  controller: 'EditPageCtrl',
  templateUrl: './templates/editPage.html' //calling from index.html
});
