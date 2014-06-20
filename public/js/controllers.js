angular.module('backdraft.controllers', ['backdraft.services'])

.controller('AppCtrl', function ($scope, User, $location, Authentication) {
			
	$scope.options = [
			{text: 'Logout', action: function () {
				User.logout(function () {
					$scope.currentUser = null;
					$location.path('/');
				});
			}}
		];
	
	$scope.toggleLeft = function () {
			$scope.sideMenuController.toggleLeft();
		};
})

.controller('LoginCtrl', function ($scope, $routeParams, User, $location, Authentication) {
		$scope.registration = {};
		$scope.credentials = {
			email: 'foo@bar.com',
			password: '123456'
		};
	
		$scope.login = function () {
			
			$scope.loginResult = User.login($scope.credentials,
				function (data) {
					var next = $location.nextAfterLogin || '/account';
					$location.nextAfterLogin = null;
					$location.path(next);
				},
				function (res) {
					$scope.loginError = res.data.error;
				}
			);
		};
			
		$scope.register = function () {
			$scope.user = User.register($scope.registration,
				function () {
					$location.path('/login');
				},
				function (res) {
					$scope.registerError = res.data.error;
				}
			);
		};
			
	});
