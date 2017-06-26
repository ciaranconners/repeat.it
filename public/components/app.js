angular.module('flash-card')

.controller('AppCtrl', function() {
  this.deck = [{
    front: "Question",
    back: "Answer"
  },
  { front: "1+1=?",
    back: "2"
    }]
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html' //calling from index.html
});
