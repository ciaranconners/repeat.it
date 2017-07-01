angular.module('flash-card')
.controller('StudyCtrl', function($http, $location) {

  //Implement deck shuffle so user can study cards in random order
  var shuffleDeck = function(deck) {
    for (var i = 0; i < deck.length; i++) {
      var random = Math.floor(Math.random()*(deck.length-i)) + i;
      var switchedCard = deck[random];
      deck[random] = deck[i];
      deck[i] = switchedCard;
    }
    return deck;
  };

  //Grab the entire deck object so we have access to the deck id for saving later
  this.deck = JSON.parse(localStorage.getItem('currentDeck'));

  //Use the shuffle function on the stored card deck
  this.shuffledDeck = shuffleDeck(this.deck.cards);


  console.log("shuffled deck", this.shuffledDeck);

  if(this.shuffledDeck.length === 1) {
    this.showNext = false;
  } else {
    this.showNext = true;
  }

  this.counter = 0;
  this.front = true;
  this.flipped = false;
  this.current = this.shuffledDeck[0];
  this.showPrev = false;

  this.handleNext = () => {
    if(this.counter === this.shuffledDeck.length-2) {
      this.showNext = false;
    }
    this.showPrev = true;
    this.counter++;
    this.front = true;
    this.flipped = false;
    this.current = this.shuffledDeck[this.counter];
  };

  this.handlePrev = () => {
    if(this.counter === 1) {
      this.showPrev = false;
    }
    this.showNext = true;
    this.counter--;
    this.front = true;
    this.current = this.shuffledDeck[this.counter];
  };

  this.handleFlip = () => {
    this.front = !this.front;
    this.flipped = !this.flipped;
  };

  this.handleRight = () => {
    console.log('right');
  };

  this.handleWrong = () => {
    console.log('wrong');
  };

  this.handleSave = () => {
    var id = this.deck._id;
    var that = this;
    this.shuffledDeck.forEach(function(card) {
      for (var i = 0; i < that.deck.cards.length; i++) {
        if (that.deck.cards[i].front === card.front && that.deck.cards[i].back === card.back) {
          that.deck.cards[i] = card;
        }
      }
    });
    $http.put('/decks/', this.deck).then(function() {
      $location.path('/app');
    });
  };

});

