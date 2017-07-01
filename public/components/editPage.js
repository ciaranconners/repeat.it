angular.module('flash-card')
.controller('EditPageCtrl', function($http, $location){

  this.newCard = {plaintextFront: true, plaintextBack: true};

  //***** add more of the default schema ****
  this.deck = JSON.parse(localStorage.getItem('currentDeck'));

  this.addCard = function(newCard) {
    if(!newCard.front || !newCard.back) {
      alert("Please fill out a card");
    } else {
      this.deck.cards.push(this.newCard);
      this.newCard = {plaintextFront: true, plaintextBack: true};
    }
    console.log('this.deck----', this.deck);
  };

  this.handleSave = function() {

    if(!this.deck.deckname) {
      alert("Please enter a deck name");
    } else {

      console.log('this.deck----(23)', this.deck);
      var id = this.deck._id;
      console.log('id----(25)', id);
      console.log('current user----(26)', localStorage.getItem('currentUser'));
      console.log('this.deck.username (27)', this.deck.username);

      $http.put('/decks/', this.deck, {params: {username: localStorage.getItem('currentUser')}}).then(function() {

        $http.get('/decks', {params: {username: localStorage.getItem('currentUser')}}).then(function(response) {
          console.log('current user----(31)', localStorage.getItem('currentUser'));

          console.log('getting decks', response);
          localStorage.setItem('decks', JSON.stringify(response.data));
          $location.path('/app');
        }, function(err) {console.error('handleSave, EDIT', err);});
      }, function(err) {console.error(err);});



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

  this.toggleHighlightFront = function(card) {
    card.plaintextFront = !card.plaintextFront;
  };

  this.toggleHighlightBack = function(card) {
    card.plaintextBack = !card.plaintextBack;
  };

})
.component('editPage', {
  controller: 'EditPageCtrl',
  templateUrl: './templates/editPage.html' //calling from index.html
});


