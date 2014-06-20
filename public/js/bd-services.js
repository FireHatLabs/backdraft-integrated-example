'use strict';

var apiUri = 'http://127.0.0.1:3000/api';
var module = angular.module('bdServices', []);

/////////////////////////////////////////////////////////////////////////////

module.factory('Authentication', function (){
  var status = {
    manager: false
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
    login: function (credentials, next, err) {
      $http.post(apiUri + '/login', credentials).
          success(function(data, status, headers, config) {
            next(data);
          }).
          error(function(data, status, headers, config) {
            next(data);
          });
    },
    logout: function (rejection, next, err) {
      return $http.post(apiUri + '/logout').success(next());
    },
    register: function (registration, next, err) {
      $http.post(apiUri + '/register', registration).
          success(next());
    },
    current: function (next, err) {
      $http.get(apiUri + '/user').
          success(function(data, status, headers, config) {
              next(data.user);
          });
    }
  };
});