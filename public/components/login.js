angular.module('flash-card')

.controller('LoginCtrl', function(loginSvc, $location){

  this.login = function() {
    loginName = this.loginName;
    loginPw = this.loginPw;
    loginSvc.login(loginName, loginPw, function(res) {
      if (res.error) {
        console.error(res.error);
      } else if (res.data === 'OK') {
        window.currentUser = loginName;
        $location.path('/app');
      } else if (res.data === 'NO') {
        alert('incorrect username or password, please try again');
      }
    });
  };

  this.signup = function() {
    accName = this.accName;
    accPw = this.accPw;
    accVerifyPw = this.accVerifyPw;
    console.log(accName);
    loginSvc.signup(accName, accPw, function(res) {
      if (this.accPw !== this.accVerifyPw) {
        alert('your passwords do not match; please check and re-try');
      }

      if (res.error) {
        console.error(res.error);
      } else if (res.data === 'OK') {
        window.currentUser = this.accName;
        $location.path('/app');
      } else if (res.data === 'NO') {
        alert('username taken');
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

