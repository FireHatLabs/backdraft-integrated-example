angular.module('backdraft', [
	'ngRoute', 'ngAnimate', 'bdServices', 'backdraft.services', 'backdraft.controllers'
])

.config(function ($compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})

.config(function ($routeProvider, $locationProvider, $httpProvider) {
    var isAuthenticated = function($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
      $http.get(apiUri + '/authenticate').success(function(auth){
        if (auth.auth.authenticated === true) {
          $timeout(deferred.resolve, 0);
          $rootScope.authenticated = true;
          $rootScope.currentUser = auth.user;
        } else {
          $rootScope.message = "You must log in.";
          $timeout(function(){deferred.reject();}, 0);
          $rootScope.authenticated = false;
          $location.url('/login');
        }
      });
      return deferred.promise;
    };



		$routeProvider.when('/account', {
			templateUrl: '/api/template/account',
			controller: 'AppCtrl',
      resolve: {
        loggedin: isAuthenticated
      }
		});

		$routeProvider.when('/register', {
			templateUrl: 'register.html',
			controller: 'LoginCtrl'
		});

		$routeProvider.when('/login', {
			templateUrl: 'login.html',
			controller: 'LoginCtrl'
		});

		$routeProvider.otherwise({
			redirectTo: '/login'
		});

  // Intercept 401 responses and redirect to login screen
		$httpProvider.interceptors.push(function ($q, $location, Authentication) {
      return function(promise) {
        return promise.then(
            function (response) {
              return response;
            },

            function (response) {
              if (response.status === 401) {
                Authentication.currentUser = null;
                // save the current location so that login can redirect back
                $location.nextAfterLogin = $location.path();
                $location.path('/login');
              }
            
              return $q.reject(response);
            }
        );
      }
    });  
      
	})

.run(function ($rootScope, $location, $window, Authentication) {
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			console.log('Authentication.currentUser', Authentication.currentUser);
			console.log('$location.path()', $location.path());
		});

    $rootScope.logout = function() {
      $rootScope.message = "Logged out.";
      $http.post('/logout');
    }
	});

