angular.module('flash-card')
.controller('AppCtrl', function($http) {
  var that = this;
  $http.get('../data/data.json').then(function(res) {
    that.data = res.data;
  });


  this.getDeck = function(deck){
    localStorage.setItem('currentDeck', JSON.stringify(deck));
    console.log(JSON.stringify(deck.cards))
  }

  this.current = localStorage.getItem('currentDeck')



  //something like below later on for click event
  // deckSvc.setDeck(currentDeck) //variable in the html
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html',
})
// .service("deckSvc", function () {
//   var _currentDeck = {};          //internally in the service
//   return {
//     getDeck: function () {
//       return _currentDeck;
//     },
//     setDeck: function (value) {
//       _currentDeck = value;
//     }
//   };
// })
// this.$watch(function () { return deckSvc.getDeck(); }, function (newValue, oldValue) {
//   if (newValue !== null) {
//     //update Controller2's xxx value
//     this.currentDeck = newValue;
//     // _currentDeck = newValue; //?
//   }
// }, true);





//what is our current problem?

/*
  Should we come back to here later?

  pass in a id and retrieve the deck from DB

  How do we figure this out...



*/
