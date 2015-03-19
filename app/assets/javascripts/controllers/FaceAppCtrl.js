(function(){
	'use strict';

	angular.module('odiApp', ['ngRoute'])
		.controller('FaceAppCtrl', 
			function FaceAppCtrl ($scope) {
				  window.fbAsyncInit = function() {
				    FB.init({
				      appId      : '1560451627557497',
				      xfbml      : true,
				      version    : 'v2.2'
				    });
				  };

				  (function(d, s, id){
				     var js, fjs = d.getElementsByTagName(s)[0];
				     if (d.getElementById(id)) {return;}
				     js = d.createElement(s); js.id = id;
				     js.src = "//connect.facebook.net/en_US/sdk.js";
				     fjs.parentNode.insertBefore(js, fjs);
				   }(document, 'script', 'facebook-jssdk'));
			});
})();