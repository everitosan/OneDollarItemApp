(function(){
	'use strict';

	angular
		.module('odiApp.directives',['templates'])
		.directive('apMenuDirective', function MenuDirective (){
			function MyScroll () {
				console.log('aa');
			}

			function link (scope, elem) {
				var $logo =$(elem).find('#logomini');
				$('#app').on('scroll', MyScroll);
			}

			var definitionObject = {
				restrict: 'E',
				scope: { content:'@' },
				replace:true,
				templateUrl:'menu.html',
				link:link
			};

			return definitionObject;
		})
		.directive('apAppDirective', function apDirective (){
			function link () {
				$('#app').css('max-height', window.innerHeight );
			}

			var definitionObject = {
				restrict: 'E',
				scope: { content:'@' },
				replace:true,
				templateUrl:'app.html',
				link: link
			};

			return definitionObject;
		});
})();