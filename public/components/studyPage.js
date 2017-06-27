angular.module('flash-card')
.controller('StudyCtrl', function() {

  this.deck = [{
    front: "Question",
    back: "Answer"
  },
  {
    front: "1+1=?",
    back: "2"
  }];

  this.counter = 0;
  this.front = true;
  this.current = this.deck[0];

  this.handleNext = () => {
    this.counter++;
    this.front = true;
    this.current = this.deck[this.counter]
  };

  this.handlePrev = () => {
    this.counter--;
    this.front = true;
    this.current = this.deck[this.counter]
  };

  this.handleFlip = () => {
    this.front = !this.front
  };

  this.handleRight = () => {
    console.log('right');
  };

  this.handleWrong = () => {
    console.log('wrong');
  };
})
// .component('studyPage', {
//   controller: 'StudyCtrl',
//   templateUrl: './templates/studyPage.html'

// });

