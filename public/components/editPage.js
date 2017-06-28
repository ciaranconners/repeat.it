angular.module('flash-card')
.controller('EditPageCtrl', function($http){
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
    // $http.post('../data/data.json', this.deck).then(function(res) {
    //   console.log('success');
    // });
    console.log(this.deck)

    // in future this will save to db
  }

})
.component('editPage', {
  controller: 'EditPageCtrl',
  templateUrl: './templates/editPage.html' //calling from index.html
});
