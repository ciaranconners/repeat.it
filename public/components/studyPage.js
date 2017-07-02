angular.module('flash-card')
.controller('StudyCtrl', function($http, $location, $timeout) {

  //-------------------------------------------------------------------
  // Initialization

  var shuffleDeck = function(deck) {
    for (var i = 0; i < deck.length; i++) {
      var random = Math.floor(Math.random()*(deck.length-i)) + i;
      var switchedCard = deck[random];
      deck[random] = deck[i];
      deck[i] = switchedCard;
    }
    return deck;
  };

  //Grab entire deck for access to the deck _id property for saving
  this.deck = JSON.parse(localStorage.getItem('currentDeck'));
  this.shuffledDeck = shuffleDeck(this.deck.cards);

  this.showPrev = false;
  if(this.shuffledDeck.length === 1) {
    this.showNext = false;
  } else {
    this.showNext = true;
  }

  this.current = this.shuffledDeck[0];
  this.front = true;
  this.flipped = false;

  this.counter = 0;

  //-------------------------------------------------------------------
  // Methods

  this.handleNext = () => {
    if(this.counter === this.shuffledDeck.length-2) {
      this.showNext = false;
    }
    this.showPrev = true;
    this.counter++;
    this.current = this.shuffledDeck[this.counter];
    this.front = true;
    this.flipped = false;

    $timeout(() => {
      this.highlightingHelperFn();
    }, 100);
  };

  this.handlePrev = () => {
    if(this.counter - 1 === 0) {
      this.showPrev = false;
    }
    this.showNext = true;
    this.counter--;
    this.current = this.shuffledDeck[this.counter];
    this.flipped = false;
    this.front = true;

    $timeout(() => {
      this.highlightingHelperFn();
    }, 100);
  };

  this.handleFlip = () => {
    this.front = !this.front;
    this.flipped = !this.flipped;

    $timeout(() => {
      this.highlightingHelperFn();
    }, 100);
  };

  // These buttons are not currently present on the page in this iteration
  /*  this.handleRight = () => {
      console.log('right');
    };

    this.handleWrong = () => {
      console.log('wrong');
    };*/

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

  //-------------------------------------------------------------------------------------
  /*  This function essentially:
   *    - checks if a given card is displaying a side that needs to be styled as code
   *    - grabs the content of the card
   *    - creates a new <code> element
   *    - copies the data in
   *    - inserts the new <code> element into the DOM and removes the old <h1>
   *    - similarly wraps the <code> element in a newly created <pre> element
   *    - applies a few basic styles
   *
   *  This function is run under four conditions: when a card is fliped, when 'next' or
   *  or 'previous' buttons are clicked, and when the very first card is loaded for the
   *  study session.
   */
  this.highlightingHelperFn = () => {
    if (this.front === true && this.current.plaintextFront === false || this.front === false && this.current.plaintextBack === false) {

      var card = document.getElementsByClassName("studycard"); // card is an HTMLCollection object
      var cardHTML = card[0].childNodes[0]; // the h1 in which we displayed the user input
      var content = cardHTML.innerHTML; // the value of the h1

      var newCodeTag = document.createElement('code');

      cardHTML.parentNode.insertBefore(newCodeTag, cardHTML); // add code tag in next to h1
      newCodeTag.innerHTML = content; // copy the content
      cardHTML.parentNode.removeChild(cardHTML); // remove the h1

      // now we have a <code>stuff user typed</code> for each item

      var newPreTag = document.createElement('pre');
      newCodeTag.parentNode.insertBefore(newPreTag, newCodeTag); // add pre next to code
      newPreTag.appendChild(newCodeTag); // make code a child of pre

      // now we have:
      // <pre>
      //   <code>stuff user typed</code>
      // </pre>
      //
      // where the old h1 used to be

      // change a few quick default styles for this card:
      newPreTag.parentNode.setAttribute("style", "padding:10px; text-align: left; overflow: hidden; overflow-y: scroll;");

      hljs.highlightBlock(newPreTag);
    }
  };
  //-------------------------------------------------------------------------------------

  // Check whether the front side of the first card requires code styling
  $timeout(() => {
    this.highlightingHelperFn();
  }, 300);
});
