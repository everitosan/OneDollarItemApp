(function(){
  'use strict';
  angular
    .module('odiApp.directives',['templates'])
    .directive('apMenuDirective', function MenuDirective (){
      

        function showMobileMenu() {
          $('#menu').toggleClass('menuactive');
        }

        function toggleActive(anchor) {
          $('#menu-links a').removeClass('active');
          $(anchor).addClass('active');
        }

        function animateScroll(event) {
          event.preventDefault();
          scrollTap = true;
          var toHref = $(this).attr('href');
          var scrollInt; 

          

          scrollInt = $(toHref).position().top;
         
          $('body, html').animate({
            scrollTop: scrollInt
          }, 1500, function() {scrollTap = false;});
            
          

          toggleActive(this);
          $('#menu').toggleClass('menuactive');

         
        } 

      function link (scope, element) {
        var $elem = $(element);
        $(window).on('scroll', {element: $elem, EA:'#logo', top:200}, MyScrollAnimate);
        $('#menumobile').on('click', showMobileMenu);
        $('#menu-links a').not('.contact').on('click', animateScroll);
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

      function link (scope, element) {
        var $elem = $(element);
        $(window).on('resize', ressize);
        ressize();
        $(window).on('scroll', {element: $elem, EA:'#counter', top:-200}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'.ornamental', top:-100}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'.whiteroll', top:-50}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'.itemsGreen', top:-50}, MyScrollAnimate);

      }

      var definitionObject = {
        restrict: 'E',
        scope: { days:'@' },
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
        //$('#app').css('height', window.innerHeight ); 

        //$('#deck').css('left',  (window.innerWidth - parseInt($('#deck').css('width')) )/2 );
        
        if(window.innerWidth <= minMobile && window.innerWidth >= minMinMobile ) {
          porcentajeEscala('.relativeContent', porcentualrelativemobile, 'top');
          porcentajeEscala('#deck', 4.421);
        }
        else if(window.innerWidth <= minMinMobile) {
          porcentajeEscala('.relativeContent', porcentualrelativemobile, 'top');
          porcentajeEscala('#deck', 4.890);
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

      function link (scope, element) {
        $(window).on('resize', ressize);
        ressize();
        var $elem=element;
        $(window).on('scroll', {element: $elem, EA:'#about', top:500}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'#about .eye', top:600}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'#about .kid', top:700}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'#about .title', top:850}, MyScrollAnimate);

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

      function link (scope, element) {
        $(window).on('resize', ressize);
        ressize();
        var $elem =  $(element);
        $(window).on('scroll', {element: $elem, EA:'#team', top: 1200}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'#team .ornamental', top: 1500}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'#team .title', top: 1700}, MyScrollAnimate);
        $(window).on('scroll', {element: $elem, EA:'#team .kid', top: 1750}, MyScrollAnimate);

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
        $( event.data.element.find('.containerLightBox') ).fadeOut();
        $( event.data.element.find('.closelightbox') ).fadeOut();
      }

      function showlight(event) {
        $('#menu').css('z-index','0');
        $( event.data.element.find('.containerLightBox') ).fadeIn();
        $( event.data.element.find('.closelightbox') ).fadeIn();
      }


      function nextKid(event) {
        var $ul = $(event.data.element.find('ul'));
        var $active = $($ul.find('.activeTeam'));

        $active.next().addClass('activeTeam');
        $active.removeClass('activeTeam');
        $ul.css('right', (parseInt($ul.css('right')) + parseInt($active.css('width')) ) );
 
        
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
        $ul.css('right', (parseInt($ul.css('right')) - parseInt($active.css('width')) ) );

        $( event.data.element.find('#next')).fadeIn();
        
        if($active.prev().prev().length === 0)
        {
          $( event.data.element.find('#prev')).fadeOut();
        }

      }
      function link(scope, element) {
        var $elem = $(element);
        $( $elem.find('.lightboxbutton')).on('click',{element: $elem }, showlight);
        $( $elem.find('.closelightbox')).on('click',{element: $elem }, hidelight);

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
      var Mytop = 0;

  var minMobile = 815;
  var minMinMobile = 374;

  var scrollTap = false;


 //***// Loader
  $(window).load(function() {
           $('#deck').removeClass('unloaded').addClass('loaded');
           $('#menu').removeClass('unloaded').addClass('loaded');
          });
//***// Loader

  function porcentajeEscala (elem, porcentual, attr) {
    var anchoElemento = parseInt( $(elem).css('width') );
    var factor =  anchoElemento * porcentual;

    $(elem).css(attr||'height', factor);
  }

  function animate(flag, elem) {
    if (flag === 1 ) {
      $( elem ).css('opacity', 1);
    }
    else { 
      $( elem ).css('opacity', 0);
    }
  }

  function MyScrollAnimate(event) {
   // scrollUp()
    
    var Scroll = $(document).scrollTop();
    var $ornamental = $(event.data.element.find(event.data.EA) );

    if (Scroll >= event.data.top) {
      animate(1, event.data.EA);
      }
    else {
      animate(0, event.data.EA);
    }  
  }

  function scrollUp() {

        if( $('#app').scrollTop() > Mytop && !scrollTap){
          Mytop = $('#app').scrollTop();
        }
        else {
          Mytop = 0;
          $('body').scrollTop(Mytop);
        }
      }
})();