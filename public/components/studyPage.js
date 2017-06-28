angular.module('flash-card')
.controller('StudyCtrl', function() {

  // this.deck = [{
  //   front: "Question",
  //   back: "Answer"
  // },
  // {
  //   front: "1+1=?",
  //   back: "2"
  // },
  // {
  //   front: "What is the capital of Texas?",
  //   back: "Austin"
  // },
  // {
  //   front: "Here is a much longer question to test text-wrapping in the flash card",
  //   back: "Here is a correspondingly long answer to the long question in order to confirm text-wrapping in the flash card"
  // }];
  // console.log(this.deck)

  this.deck = JSON.parse(localStorage.getItem('currentDeck')).cards;
  console.log("study deck", this.deck)

  this.counter = 0;
  this.front = true;
  this.current = this.deck[0];
  this.showNext = true;
  this.showPrev = false;

  this.handleNext = () => {
    if(this.counter === this.deck.length-2) {
      this.showNext = false;
    }
    this.showPrev = true;
    this.counter++;
    this.front = true;
    this.current = this.deck[this.counter];
  };

  this.handlePrev = () => {
    if(this.counter === 1) {
      this.showPrev = false;
    }
    this.showNext = true;
    this.counter--;
    this.front = true;
    this.current = this.deck[this.counter];
  };

  this.handleFlip = () => {
    this.front = !this.front;
  };

  this.handleRight = () => {
    console.log('right');
  };

  this.handleWrong = () => {
    console.log('wrong');
  };

  this.handleSave = () => {
    console.log('Progress saved');
  };

})
// .component('studyPage', {
//   controller: 'StudyCtrl',
//   templateUrl: './templates/studyPage.html'

// });

