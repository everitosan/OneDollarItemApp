(function(){
	'use strict';

	angular
		.module('odiApp.directives',['templates'])
		.directive('apMenuDirective', function MenuDirective (){

			function MyScroll(event) {
				var Scroll = (-1) * ($('#deck').position().top) ;

				var inicioAnimacion = 200;
				var ancho_final = 1;
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

				event.data.logo.css('opacity', ancho);
			}			

			function link (scope, elem) {
				var $logo = $(elem).find('#logo');
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
			var porcentual = .3011;
			
			function ressize() {
				var factor = parseInt($('body').css('width')) * porcentual;
				$('.relativeContent').css('top', factor);

				$('#counter').css('height', $('#counter').css('width'));
			}

			function link () {
				$(window).on('resize', ressize);
				ressize();
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
		})
		.directive('apAboutDirective', function AboutDirective() {
			var porcentual = 1.192;

			function ressize() {
				var factor = parseInt( $('#about').css('width') ) * porcentual;
				$('#about').css('height', factor);
			}

			function link () {
				$(window).on('resize', ressize);
				ressize();
			}

			var definitionObject = {
				restrict: 'E',
				scope: { content:'@' },
				replace:true,
				templateUrl:'about.html',
				link: link
			};

			return definitionObject;
		});
})();