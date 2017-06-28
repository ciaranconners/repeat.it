angular.module('flash-card')

.controller('LoginCtrl', function(loginSvc){
  this.login = function() {
    console.log('inside login');
    var loginName = this.loginName;
    console.log('loginName', loginName);
    loginSvc.login(this.loginName, this.password, function(res) {
      if (res.error) {
        console.error(res.error);
      } else {
        window.currentUser = this.loginName;
        window.location = 'http://localhost:3000/';
      }
    });
  };

  this.signup = function() {
    loginSvc.login(this.accName, this.accPw, function(res) {
      if (res.error) {
        console.error(res.error);
      } else {
        window.currentUser = this.accName;
        window.location = 'http://localhost:3000/';
      }
    });
  };
})

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

