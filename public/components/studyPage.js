angular.module('flash-card')
.controller('StudyCtrl', function() {

  this.counter = 0;
  this.front = true;
  this.back = false;

  this.handleNext = () => {
    this.counter++;
    this.front = true;
    this.back = false;
    console.log(this.counter)
  };

  this.handleFlip = () => {
    if(this.front) {
      this.front = false;
      this.back = true;
    } else {
      this.front = true;
      this.back = false;
    }

    console.log(this.front)
  }

  // this.deck = [{
  //   front: "Question",
  //   back: "Answer"
  // },
  // {
  //   front: "1+1=?",
  //   back: "2"
  // }];

  //set current display object to front of first card:
    // this.display = this.deck[counter][side]

})
.component('studyPage', {
  controller: 'StudyCtrl',
  templateUrl: './templates/studyPage.html',
  bindings: {
    deck: '<'
  }
});

