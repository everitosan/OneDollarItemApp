(function(){
  'use strict';
  angular
    .module('odiApp.directives',['templates'])
    .directive('apMenuDirective', [function MenuDirective (){
      

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

        

        scrollInt = $(toHref).offset().top;
       
        $('body, html').animate({
          scrollTop: scrollInt
        }, 1500, function() {scrollTap = false;});
          
        

        toggleActive(this);
        $('#menu').toggleClass('menuactive');

       
      } 

      function link (scope, element) {
        var $elem = $(element);
        $animatedElements.push({element: $elem, EA:'#logo', top:200});
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
    }])
    .directive('apCounterDirective', [function counterDirective (){
      function ressize() {
        porcentajeEscala('#counter', 1);
      }

      function link (scope, element) {
        var $elem = $(element);
        $(window).on('resize', ressize);
        ressize();
      }

      var definitionObject = {
        restrict: 'E',
        scope: { days:'@' },
        replace:true,
        templateUrl:'counter.html',
        link: link
      };

      return definitionObject;
    }])
    .directive('apAboutDirective', [function AboutDirective() {
      var porcentual = 1.235;
      var porcentualPaddingText = 0.658;

      var porcentualrelative = 0.3011;
      var porcentualrelativemobile = 0.424;


      function ressize() {
        
        //#FIX mover al controlador
        //$('#app').css('height', window.innerHeight ); 

        //$('#deck').css('left',  (window.innerWidth - parseInt($('#deck').css('width')) )/2 );
        
        if(window.innerWidth <= minMobile && window.innerWidth >= minMinMobile ) {
          //porcentajeEscala('.relativeContent', porcentualrelativemobile, 'top');
          porcentajeEscala('#deck', 4.421);
        }
        else if(window.innerWidth <= minMinMobile) {
          //porcentajeEscala('.relativeContent', porcentualrelativemobile, 'top');
          porcentajeEscala('#deck', 4.890);
        }
        else {
          //porcentajeEscala('.relativeContent', porcentualrelative, 'top');
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
          porcentajeEscala('#about .text', 1.045, 'padding-top');
        }
        else {
          porcentajeEscala('#about .text', porcentualPaddingText, 'padding-top');
        }

      }

      function link (scope, element) {
        $(window).on('resize', ressize);
        ressize();
        var $elem=element;

        $animatedElements.push({element: $elem, EA:'#about .title', top:500});
        $animatedElements.push({element: $elem, EA:'#about .eye', top:600});
        $animatedElements.push({element: $elem, EA:'#about .fondo', top:700});
        $animatedElements.push({element: $elem, EA:'#about .kid', top:800});
        $animatedElements.push({element: $elem, EA:'#about .text', top:950});
      }

      var definitionObject = {
        restrict: 'E',
        scope: { title: '@',
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
    }])
    .directive('apTeamDirective', [function TeamDirective() {
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
        $animatedElements.push({element: $elem, EA:'#team .title', top: 1400});
        $animatedElements.push({element: $elem, EA:'#team .fondo', top: 1500});
        $animatedElements.push({element: $elem, EA:'#team .ornamental', top: 1700});
        $animatedElements.push({element: $elem, EA:'#team #gallerybutton', top:1720});
        $animatedElements.push({element: $elem, EA:'#team .kid', top: 1750});
        $animatedElements.push({element: $elem, EA:'#team .text', top:1850});

      }

      var definitionObject = {
        restrict: 'E',
        scope: {
             par1:'@',
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
    }])
    .directive('apShareDirective', [function ShareDirective() {
      var porcentual = 0.8748;

      function ressize() {
        var factor = parseInt( $('#share').css('width') ) * porcentual;
        $('#share').css('height', factor);
      }

      function link (scope, element) {
        $(window).on('resize', ressize);
        ressize();
        var $elem = $(element);
        $animatedElements.push({element: $elem, EA:'#share .support', top: 2300});
        $animatedElements.push({element: $elem, EA:'#share .ornamental', top: 2400});
        $animatedElements.push({element: $elem, EA:'#share .fondo', top: 2500});
      }

      var definitionObject = {
        restrict: 'E',
        replace:true,
        templateUrl:'share.html',
        link: link
      };

      return definitionObject;
    }])
    .directive('apContactDirective', [function ContactDirective() {
    
      function ressize(event) {
        var $form = $('.modal form');
        var margin = (window.innerHeight -parseInt($form.css('height')) ) /2;
        $form.css('margin-top', margin);
      }

      function link(scope, element) {
        var $elem = element;
        $(window).on('resize', ressize);
        $('.link .contact').on('click', ressize);
      }

      var definitionObject = {
        restrict: 'E',
        replace:true,
        templateUrl:'contact.html',
        link: link
      };

      return definitionObject;
    }])
    .directive('apLoaderDirective', [function LoaderDirective() {

      var definitionObject = {
        restrict: 'E',
        replace:true,
        templateUrl:'loader.html'
      };

      return definitionObject;
    }])
    .directive('apLightboxDirective', [function LightboxDirective() {

      var arrPhotos = ['_DSC1915.jpg','_MG_0189.jpg','_MG_0226.jpg','_MG_0339.jpg','_MG_0362.jpg','_MG_0389.jpg','_MG_0393.jpg','_MG_0493.jpg','_MG_0497.jpg','_MG_0520.jpg','_MG_0548.jpg','_MG_0558.jpg','_MG_0563.jpg','_MG_0567.jpg','_MG_0584.jpg','_MG_0614.jpg','_MG_0622.jpg','_MG_0635.jpg','_MG_0644.jpg','_MG_0657.jpg','_MG_0662.jpg','_MG_1915.jpg','_MG_1926.jpg','IMG_0901.jpg','IMG_4036.jpg','IMG_4115.jpg','IMG_4127.jpg','IMG_4150.jpg','IMG_4174.jpg','IMG_4196.jpg','P1050379.jpg'];
      
      function hidelight(event) {
        $('.lightboxbutton').css('z-index', 6);
        $('#menu').css('z-index','100');
        $( event.data.element.find('.containerLightBox') ).fadeOut();
        $( event.data.element.find('.closelightbox') ).fadeOut();
        lightBoxActive = false;
      }

      function showlight(event) {
        var $padre = $( event.data.element.find('ul'));
        var $hijos = $padre.children();

        $('.lightboxbutton').css('z-index', 0);
        $('#menu').css('z-index','0');
        $( event.data.element.find('.containerLightBox') ).fadeIn();
        $( event.data.element.find('.closelightbox') ).fadeIn();

        lightBoxActive = true;

 
        if($padre.css('width') < window.innerWidth) {
          $hijos.css('width', $padre.css('width'));
          $padre.css( 'width', parseInt($padre.css('width'))*$hijos.length);
        }

        if(event.data.element.attr('but') === "photo") {
           loadNextImg();
        }
      }

      function loadNextImg() {
        var nPhotos = $('#photoLightBox ul').children().length;
        nPhotos=nPhotos-1;

        console.log(nPhotos);
        console.log(arrPhotos.length );
        if ( (nPhotos+1) <= arrPhotos.length )
        {
          $('#photoLightBox ul').append('<li> <img src="/images/photos/'+arrPhotos[nPhotos]+'" alt="" /> </li>');
        }
      }


      function nextKid(event) {
        var $ul = $(event.data.element.find('ul'));
        var $active = $($ul.find('.activeTeam'));

        $active.next().addClass('activeTeam');
        $active.removeClass('activeTeam');
        $ul.css('right', (parseInt($ul.css('right')) + parseInt($active.css('width')) ) );
 
        
        $( event.data.element.find('.prev')).fadeIn();

        if(event.data.element.attr('but') === "photo") {
           loadNextImg();
        }
        
        if($active.next().next().length===0)
        {
          $( event.data.element.find('.next')).fadeOut();
        }
      }

      function prevKid(event) {
        var $ul = $(event.data.element.find('ul'));
        var $active = $($ul.find('.activeTeam'));
         console.log($active);

        $active.prev().addClass('activeTeam');
        $active.removeClass('activeTeam');
        $ul.css('right', (parseInt($ul.css('right')) - parseInt($active.css('width')) ) );

        $( event.data.element.find('.next')).fadeIn();
        
        if($active.prev().prev().length === 0)
        {
          $( event.data.element.find('.prev')).fadeOut();
        }

      }
      function link(scope, element) {
        var $elem = $(element);
        $( $elem.find('.lightboxbutton')).on('click',{element: $elem }, showlight);
        $( $elem.find('.closelightbox')).on('click',{element: $elem }, hidelight);

        $($elem.find('.next')).on('click', {element: $elem}, nextKid);
        $($elem.find('.prev')).on('click', {element: $elem}, prevKid);



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
    }]);

  var Mytop = 0;
  var scrollTap = false;
  var lightBoxActive = false;

  var minMobile = 815;
  var minMinMobile = 374;

 //***// Loader
  $(window).load(function() {
     $('#deck').removeClass('unloaded').addClass('loaded');
     $('#menu').removeClass('unloaded').addClass('loaded');

    
     setTimeout(function(){  $('#loader').fadeOut(); }, 2000);

     setTimeout(function(){$('#counter').css('opacity', 1);}, 3000);
     setTimeout(function(){$('#counter .ornamental').css('opacity', 1);}, 3300);
     setTimeout(function(){$('#counter .whiteroll').css('opacity', 1);}, 3450);
     setTimeout(function(){$('#counter .itemsGreen').css('opacity', 1);}, 3800);


});
//***// Loader

  $(window).on('scroll', MyScrollAnimate);
  var $animatedElements = [];

  function porcentajeEscala (elem, porcentual, attr) {
    var anchoElemento = parseInt( $(elem).css('width') );
    var factor =  anchoElemento * porcentual;

    $(elem).css(attr||'height', factor);
  }

  function animate(flag, elem) {

      elem.css('opacity', flag);
 
  }

  function MyScrollAnimate(event) {
    if (!lightBoxActive && window.innerWidth > 1150) {
      var Scroll = $(document).scrollTop();
      angular.forEach($animatedElements, function(value){

        var $domElement = $(value.EA);

        if (this >= value.top && $domElement.css('opacity') === "0") {
          animate(1, $domElement);
          }
        else if (this < value.top && $domElement.css('opacity') === "1"){
          animate(0, $domElement);
        }  
        
      }, Scroll);
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