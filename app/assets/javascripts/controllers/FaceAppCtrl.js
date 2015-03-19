(function(){
	'use strict';

	angular.module('odiApp', ['ngRoute', 'facebook'])
		.config(function(FacebookProvider){
			FacebookProvider.init('1560451627557497');
		})
		.controller('FaceAppCtrl', 
			function FaceAppCtrl ($scope, Facebook) {
				$scope.login = function(){
					Facebook.login(function(response){
						console.log(response);
					});
				};

				$scope.getLoginStatus = function() {
			      Facebook.getLoginStatus(function(response) {
			        if(response.status === 'connected') {
			          $scope.loggedIn = true;
			        } else {
			          $scope.loggedIn = false;
			        }
			      });
			    };

			    $scope.getLoginStatus = function() {
			      Facebook.getLoginStatus(function(response) {
			        if(response.status === 'connected') {
			          $scope.loggedIn = true;
			        } else {
			          $scope.loggedIn = false;
			        }
			      });
			    };

			    $scope.$watch(function() {
				  // This is for convenience, to notify if Facebook is loaded and ready to go.
				  return Facebook.isReady();
				}, function(newVal) {
				  // You might want to use this to disable/show/hide buttons and else
				  $scope.facebookReady = true;
				});

			});
})();