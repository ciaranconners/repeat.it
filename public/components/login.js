angular.module('flash-card')

.controller('LoginCtrl', function(loginSvc, $location, $http){

  this.login = function() {
    var that = this;
    loginName = this.loginName;
    loginPw = this.loginPw;
    loginSvc.login(loginName, loginPw, function(res) {
      if (res.error) {
        console.error(res.error);
      } else if (res.data === 'OK') {
        $http.get('/decks', {params: {username: loginName}}).then(function(response) {
          localStorage.setItem('currentUser', loginName);
          localStorage.setItem('decks', JSON.stringify(response.data));
          $location.path('/app');
        }, function(error) {console.error(error);});
      } else if (res.data === 'NO') {
        alert('Incorrect username or password, please try again.');
        that.loginName = '';
        that.loginPw = '';
        $('#loginName').focus();
      }
    });
  };

  this.signup = function() {
    var that = this;
    accName = this.accName;
    accPw = this.accPw;
    accVerifyPw = this.accVerifyPw;
    loginSvc.signup(accName, accPw, function(res) {
      if (this.accPw !== this.accVerifyPw && res.data === 'NO') {
        alert('Username taken; please try another username.');
        that.accName = '';
        that.accPw = '';
        that.accVerifyPw = '';
      }
      else if (this.accPw !== this.accVerifyPw) {
        alert('Your passwords do not match; please check and try again.');
        that.accPw = '';
        that.accVerifyPw = '';
      } else if (res.error) {
        console.error(res.error);
      } else if (res.data === 'OK') {
        localStorage.setItem('currentUser', accName);
        localStorage.setItem('decks', {});
        $location.path('/app');
      } else if (res.data === 'NO') {
        alert('Username taken; please try another username.');
        that.accName = '';
        that.accPw = '';
        that.accVerifyPw = '';
        $('#accName').focus();
      }
    });
  };
})

// on signup, if the password don't match AND the username is taken we have to fail twice

.component('login', {
  controller: 'LoginCtrl',
  templateUrl: './templates/login.html' //calling from index.html
})
.service('loginSvc', function($http) {
  this.login = function(username, password, callback) {
    var url = 'http://localhost:3000/login';
    $http.post(url, JSON.stringify({username: username, password:password}))
      .then(function successCallback(response) {
        callback(response);
      },
      function errorCallback(response) {
        callback(response);
      });
  };
  this.signup = function(username, password, callback) {
    var url = 'http://localhost:3000/signup';
    $http.post(url, JSON.stringify({username: username, password:password}))
      .then(function successCallback(response) {
        callback(response);
      },
      function errorCallback(response) {
        callback(response);
      });
  };
});



// PLAN:

// ON LOGIN, GET ALL DECKS AND SAVE TO LOCAL STORAGE
// THE HOME PAGE CAN SET $CTRL.DATA TO THE DECKS SAVED IN LOCAL STORAGE

// WE HAVE TO MAKE SURE TO INCLUDE A CALL TO THE DATABASE WHEN SAVING A DECK,
// IN ORDER TO UPDATE WHAT WE HAVE AS 'DECKS' IN LOCAL STORAGE