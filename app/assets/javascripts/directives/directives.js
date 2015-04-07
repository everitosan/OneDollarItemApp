(function(){
	'use strict';
	var Mytop = 0;

	var minMobile = 815;
	function porcentajeEscala (elem, porcentual, attr) {
		var anchoElemento = parseInt( $(elem).css('width') );
		var factor =  anchoElemento * porcentual;

		$(elem).css(attr||'height', factor);
	}

	angular
		.module('odiApp.directives',['templates'])
		.directive('apMenuDirective', function MenuDirective (){
			function scrollUp() {

				if( $('#app').scrollTop() > Mytop ){
					Mytop = $('#app').scrollTop();
				}
				else {
				 	Mytop = 0;
					$('body').scrollTop(Mytop);
				}
			}

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

				scrollUp();
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
			function ressize() {
				porcentajeEscala('#counter', 1);
			}

			function link () {
				$(window).on('resize', ressize);
				ressize();
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

			var porcentualrelative = 0.3011;
			var porcentualrelativemobile = 0.424;


			function ressize() {
				
				//#FIX mover al controlador
				$('#app').css('height', window.innerHeight ); 
				
				if(window.innerWidth <= minMobile) {
					porcentajeEscala('.relativeContent', porcentualrelativemobile, 'top');
					porcentajeEscala('#deck', 4.421);
				}
				else {
					porcentajeEscala('.relativeContent', porcentualrelative, 'top');
					porcentajeEscala('#deck', 3.06);
				}
				//#FIX mover al controlador

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
						 par2: '@',
						 howq1: '@',
						 howa1: '@',						 
						 howq2: '@',
						 howa2: '@',						 
						 howq3: '@',
						 howa3: '@',						 
						 howq4: '@',
						 howa4: '@',						 
						 howq5: '@',
						 howa5: '@'
						},
				replace:true,
				transclude: true,
				templateUrl:'about.html',
				link: link
			};

			return definitionObject;
		})
		.directive('apTeamDirective', function TeamDirective() {
			var porcentual = 1.268;
			var porcentualPaddingText = 0.839;
			function ressize() {



				if(window.innerWidth >= minMobile) {
					porcentajeEscala('#team', porcentual);
				}
				else {
					$('#team').css('height','auto');
				}

				if (parseInt($('#team').css('width') ) >= 633){
					porcentajeEscala('#team .text', 1.48, 'padding-top');
				}
				else {
					porcentajeEscala('#team .text', porcentualPaddingText, 'padding-top');
				} 
			}

			function link () {
				$(window).on('resize', ressize);
				ressize();
			}

			var definitionObject = {
				restrict: 'E',
				scope: { par1:'@',
						 par2:'@',
						 par3:'@', 
						 irvingdes:'@', 
						 irvinginfo:'@', 
						 hectordes:'@', 
						 hectorinfo:'@', 
						 gerardodes:'@', 
						 gerardoinfo:'@', 
						 ulisesdes:'@', 
						 ulisesinfo:'@' 
						},
				transclude: true,
				replace: true,
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
				replace:true,
				templateUrl:'share.html',
				link: link
			};

			return definitionObject;
		})
		.directive('apLightboxDirective', function LightboxDirective() {
			function hidelight(event) {
				$('#menu').css('z-index','100');
				$( event.data.element.find('.lightbox') ).fadeOut();
				$( event.data.element.find('.closelightbox') ).fadeOut();
			}

			function showlight(event) {
				$('#menu').css('z-index','0');
				$( event.data.element.find('.lightbox') ).fadeIn();
				$( event.data.element.find('.closelightbox') ).fadeIn();
			}

			function ressize(event) {
				$( event.data.element.find('.lightbox')).css('height', window.innerHeight);
			}

      function nextKid(event) {
        var $ul = $(event.data.element.find('ul'));
        var $active = $($ul.find('.activeTeam'));

        $active.next().addClass('activeTeam');
        $active.removeClass('activeTeam');
        $ul.css('right', (parseInt($ul.css('right')) + window.innerWidth) );
        hideButtons();
        
        $( event.data.element.find('#prev')).fadeIn();
        
        if($active.next().next().length===0)
        {
          $( event.data.element.find('#next')).fadeOut();
        }
      }
      function prevKid(event) {
        var $ul = $(event.data.element.find('ul'));
        var $active = $($ul.find('.activeTeam'));

        $active.prev().addClass('activeTeam');
        $active.removeClass('activeTeam');
        $ul.css('right', (parseInt($ul.css('right')) - window.innerWidth) );

        $( event.data.element.find('#next')).fadeIn();
        
        if($active.prev().prev().length === 0)
        {
          $( event.data.element.find('#prev')).fadeOut();
        }

      }

      function hideButtons() {

      }

      function link(scope, element) {
        var $elem = $(element);
        $( $elem.find('.lightboxbutton')).on('click',{element: $elem }, showlight);
        $( $elem.find('.closelightbox')).on('click',{element: $elem }, hidelight);
        $(window).on('resize', {element: $elem }, ressize);

        $($elem.find('#next')).on('click', {element: $elem}, nextKid);
        $($elem.find('#prev')).on('click', {element: $elem}, prevKid);


			}			

			var definitionObject = {
				restrict: 'E',
				priority: 1,
				scope: {but:'@'},
				replace: true,
				transclude: true,
				templateUrl:'lightBox.html',
				link: link
			};

			return definitionObject;
		});
})();