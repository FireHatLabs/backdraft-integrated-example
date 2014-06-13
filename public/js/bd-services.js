'use strict';

var apiUri = 'http://127.0.0.1:3000/api';
var module = angular.module('bdServices', []);

/////////////////////////////////////////////////////////////////////////////

module.factory('Authentication', function (){
  var status = {
    authenticated: false,
    manager: false,
    currentUser: {}
  };

  return status;
});

module.factory('Token', function ($q, $window, $location, Authentication){
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    requestError: function (rejection) {
      return $q.reject(rejection);
    },
    response: function (response) {
      if (response != null && response.status == 200 && $window.sessionStorage.token && !Authentication.authenticated) {
        Authentication.authenticated = true;
      }
      return response || $q.when(response)
    },
    responseError: function (rejection) {
      if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || Authentication.authenticated)) {
        delete $window.sessionStorage.token;
        Authentication.authenticated = false;
        $location.path("/login");
      }

      return $q.reject(rejection);
    }
  };
});

module.factory('User', function ($http) {
  return {
    login: function (username, password) {
      return $http.post(apiUri + '/login', {username: username, password: password});
    },
    logout: function (rejection) {
      return $http.post(apiUri + '/logout');
    },
    register: function (username, password, passwordConfirmation) {
      return $http.post(apiUri + '/register', {username: username, password: password, passwordConfirmation: passwordConfirmation });
    }
  };
});