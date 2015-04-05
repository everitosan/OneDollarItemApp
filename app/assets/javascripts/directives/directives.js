(function(){
	'use strict';

	var minMobile = 815;
	function porcentajeEscala (elem, porcentual, attr) {
		var anchoElemento = parseInt( $(elem).css('width') );
		var factor =  anchoElemento * porcentual;

		$(elem).css(attr||'height', factor);
	}

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
			var porcentual = 0.3011;
			var porcentualmobile = 0.424;

			function escala () {
				if(window.innerWidth <= minMobile) {
					return porcentualmobile;
				}
				return porcentual;
			}

			function ressize() {
				porcentajeEscala('.relativeContent', escala(), 'top');
				porcentajeEscala('#counter', 1);
				porcentajeEscala('#deck', 3.06);
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
			var porcentual = 1.235;
			var porcentualPaddingText = 0.658;

			function ressize() {

				if(window.innerWidth >= minMobile) {
					porcentajeEscala('#about', porcentual);
				}
				else {
					$('#about').css('height','auto');
				}

				if (parseInt($('#about').css('width') ) >= 633){
					porcentajeEscala('#about .text', 1, 'padding-top');
				}
				else {
					porcentajeEscala('#about .text', porcentualPaddingText, 'padding-top');
				}

			}

			function link () {
				$(window).on('resize', ressize);
				ressize();
			}

			var definitionObject = {
				restrict: 'E',
				scope: { title: '@',
						 title2: '@',
						 par1: '@',
						 par2: '@'},
				replace:true,
				transclude: true,
				templateUrl:'about.html',
				link: link
			};

			return definitionObject;
		})
		.directive('apTeamDirective', function TeamDirective() {
			var porcentual = 1.229;

			function ressize() {
				porcentajeEscala('#team', porcentual);
			}

			function link () {
				$(window).on('resize', ressize);
				ressize();
			}

			var definitionObject = {
				restrict: 'E',
				scope: { content:'@' },
				replace:true,
				templateUrl:'team.html',
				link: link
			};

			return definitionObject;
		})
		.directive('apShareDirective', function ShareDirective() {
			var porcentual = 0.8748;

			function ressize() {
				var factor = parseInt( $('#share').css('width') ) * porcentual;
				$('#share').css('height', factor);
			}

			function link () {
				$(window).on('resize', ressize);
				ressize();
			}

			var definitionObject = {
				restrict: 'E',
				scope: { content:'@' },
				replace:true,
				templateUrl:'share.html',
				link: link
			};

			return definitionObject;
		});
})();