(function(){
	'use strict';

	angular.module('odiApp', ['ngRoute', 'facebook'])
		.config(function(FacebookProvider) {
	     // Set your appId through the setAppId method or
	     // use the shortcut in the initialize method directly.
	     FacebookProvider.init('1560451627557497');
	  })
		.controller('authenticationCtrl', function($scope, Facebook) {
			$scope.user = {};
			$scope.loggedIn = false;

	    $scope.IntentLog = function () {
	    	$scope.login();
	    };

			$scope.login = function() { 
		  	Facebook.login(function(response) {
		  		
		  		if (response.status === 'connected'){
		  			$scope.loggedIn = true;
		  			$scope.me();
		  		}
		  		else if (response.status === 'not_authorized') {
	        	$scope.loggedIn = false;
	        	$scope.auth = false;
	        }
	        else {
	        	$scope.loggedIn = false;
	        }
		  	}, {scope:'public_profile, email'});
			};

	    $scope.me = function() {
	      Facebook.api('/me', function(response) {
	        $scope.user = response;
	        setDatatoPostgresql();
	        setPhoto('http://graph.facebook.com/'+response.id+'/picture?type=small');
	      });
	    };

	    function setDatatoPostgresql() {
	    	console.log($scope.user);
	    }

	    function setPhoto (url){
	    	var photoElement = document.getElementById('photoUrl');
	    	photoElement.src = url;
	    }

      $scope.getLoginStatus = function() {
		    Facebook.getLoginStatus(function(response) {
		      if(response.status === 'connected') {
		        $scope.loggedIn = true;
		      }
		      else {
		        $scope.loggedIn = false;
		      }
		    });
		  };

	});
})();