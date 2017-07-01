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


  // console.log("shuffled deck", this.shuffledDeck);

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

    setTimeout(() => {
    this.highlightingHelperFn();
  }, 100);
  };

  this.handlePrev = () => {
    if(this.counter === 1) {
      this.showPrev = false;
    }
    this.showNext = true;
    this.counter--;
    this.front = true;
    this.current = this.shuffledDeck[this.counter];

    setTimeout(() => {
    this.highlightingHelperFn();
  }, 100);
  };

  this.handleFlip = () => {
    this.front = !this.front;
    this.flipped = !this.flipped;
    console.log(this.front);
    console.log(this.plaintextFront);
    console.log(this.plaintextBack);

    setTimeout(() => {
    this.highlightingHelperFn();
  }, 100);
  };

  this.highlightingHelperFn = () => {
    if (this.front === true && this.current.plaintextFront === false || this.front === false && this.current.plaintextBack === false ) {
      // our logic here
      var card = document.getElementsByClassName("studycard");
      var cardHTML = card[0].childNodes[0];
      var content = cardHTML.innerHTML; //the h1 value

      var newCodeTag = document.createElement('code');

      cardHTML.parentNode.insertBefore(newCodeTag, cardHTML); // add code tag in next to h1
      newCodeTag.innerHTML = content; // copy the content
      cardHTML.parentNode.removeChild(cardHTML); // remove the h1

      // now we have a <code>stuff user typed</code> for each item

      var newPreTag = document.createElement('pre');
      newCodeTag.parentNode.insertBefore(newPreTag, newCodeTag); // add pre next to code
      newPreTag.appendChild(newCodeTag); // make code a child of pre

      // hopefully we have:
      // <pre>
      //   <code>stuff user typed</code>
      // </pre>
      //
      // where the old h1 used to be

      // change two quick default styles for this card:
      newPreTag.parentNode.setAttribute("style", "padding:10px; text-align: left;");

      hljs.highlightBlock(newPreTag);
    }
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

  // initialize the first card to check for whether to highlight
  setTimeout(() => {
    this.highlightingHelperFn();
  }, 300);
});

