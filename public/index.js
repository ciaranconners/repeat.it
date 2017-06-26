// 'routings'

angular.module('flash-card', ['ngRoute'])

.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $routeProvider.
      when('/', {
        templateUrl: './templates/app.html',
        controller: 'AppCtrl'
      }).
      when('/login', {
        templateUrl: './templates/login.html',
        controller: 'LoginCtrl'
      }).
      when('/create', {
        templateUrl: './templates/createPage.html',
        controller: 'CreatePageCtrl'
      }).
      when('/edit', {
        templateUrl: './templates/editPage.html',
        controller: 'EditPageCtrl'
      }).
      when('/study', {
        templateUrl: './templates/studyPage.html',
        controller: 'StudyCtrl'
      });
  }
]);