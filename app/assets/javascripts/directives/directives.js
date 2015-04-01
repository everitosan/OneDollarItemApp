(function(){
	'use strict';

	angular
		.module('odiApp.directives',[])
		.directive('apMenuDirective', function MenuDirective (){
			var definitionObject = {
				restrict: 'E',
				scope: { content:'@' },
				replace:true,
				templateUrl:'templates/menu.html'
			};

			return definitionObject;
		});
})();