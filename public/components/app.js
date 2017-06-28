angular.module('flash-card')
.controller('AppCtrl', function($http) {
  var that = this;
  $http.get('../data/data.json').then(function(res) {
    that.data = res.data;
  });

  this.getDeck = function(deck){
    localStorage.setItem('currentDeck', JSON.stringify(deck));
    console.log(JSON.stringify(deck))
  }

  this.current = localStorage.getItem('currentDeck') // find out what this is

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
