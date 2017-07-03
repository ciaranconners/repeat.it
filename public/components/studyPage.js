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

  var resetConditionToInitialState = {
    'handleNext' : function (studyControllerVariables) {
      var that = studyControllerVariables;
      if (that.counter === that.shuffledDeck.length - 2) {
        that.showNext = false;
      }
      that.showPrev = true;
      that.counter++;
      this.setToInitialState(studyControllerVariables);
    },
    'handlePrev' : function (studyControllerVariables) {
      var that = studyControllerVariables;
      if (that.counter - 1 === 0) {
        that.showPrev = false;
      }
      that.showNext = true;
      that.counter--;
      this.setToInitialState(studyControllerVariables);
    },
    'setToInitialState' : function (studyControllerVariables) {
      var that = studyControllerVariables;
      that.front = true;
      that.flipped = false;
      that.current = that.shuffledDeck[that.counter];
      that.highlightingHelperFn(that.current.front);
    }
  }

  this.handleNext = () => {
    resetConditionToInitialState['handleNext'](this);
  };

  this.handlePrev = () => {
    resetConditionToInitialState['handlePrev'](this);
  };

  this.handleFlip = () => {
    this.front = !this.front;
    this.flipped = !this.flipped;

    if (this.front === true && this.flipped === false) {
      this.highlightingHelperFn(this.current.front);
    } else {
      this.highlightingHelperFn(this.current.back);
    }
  };


  this.highlightingHelperFn = (flashCardQuestion) => {
    $timeout(() => {

      if (this.front === true && this.current.plaintextFront === false || this.front === false && this.current.plaintextBack === false) {
        // our logic here
        var card = document.getElementsByClassName("studycard");
        var cardHTML = card[0].childNodes[0];
        var content = flashCardQuestion || cardHTML.innerHTML; //the h1 value
        var newCodeTag = document.createElement('code');

        cardHTML.parentNode.insertBefore(newCodeTag, cardHTML); // add code tag in next to h1
        newCodeTag.innerHTML = content; // copy the content
        cardHTML.parentNode.removeChild(cardHTML); // remove the h1

        // now we have a <code>stuff user typed</code> for each item

        var newPreTag = document.createElement('pre');
        newCodeTag.parentNode.insertBefore(newPreTag, newCodeTag); // add pre next to code
        newPreTag.appendChild(newCodeTag); // make code a child of pre
        // newCodeTag.parentNode.removeChild(newCodeTag.childNodes[0]); // remove the h1
        newPreTag.parentNode.setAttribute("style", "padding:10px; text-align: left; overflow: hidden; overflow-y: scroll;");
        hljs.highlightBlock(newPreTag);
      }
    }, 1);
  };
  //-------------------------------------------------------------------------------------

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
  this.highlightingHelperFn();
});
