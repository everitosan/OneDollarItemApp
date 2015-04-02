(function(){
	'use strict';

	angular
		.module('odiApp.directives',['templates'])
		.directive('apMenuDirective', function MenuDirective (){

			function MyScroll(event) {
				var Scroll = (-1) * ($('#deck').position().top) ;

				var inicioAnimacion = 200;
				var ancho_final = 200;
				var rango_animacion = 20;
				var ancho;

				if (Scroll <= inicioAnimacion) {
					ancho = 0;
				}
				else if(Scroll >= inicioAnimacion && Scroll <= (inicioAnimacion + rango_animacion) ) {
					ancho = (Scroll - inicioAnimacion) / rango_animacion * ancho_final ;
				}
				else if ( Scroll > (inicioAnimacion + rango_animacion) ) {
					ancho = ancho_final;
				}

				event.data.logo.css('width', ancho);
			}			

			function link (scope, elem) {
				var $logo = $(elem).find('#logomini li');
				$('#app').on('scroll', {logo: $logo}, MyScroll);
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
		.directive('apCounterDirective', function counterDirective (){


			function link () {
				$('#app').css('height', window.innerHeight ); //#FIX mover al controlador
			}

			var definitionObject = {
				restrict: 'E',
				scope: { content:'@' },
				replace:true,
				templateUrl:'counter.html',
				link: link
			};

			return definitionObject;
		});
})();