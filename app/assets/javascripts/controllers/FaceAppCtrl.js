(function(){
  'use strict';

  angular.module('odiApp.controllers', ['facebook', 'ngCookies'])
    .config(function(FacebookProvider) {
      
      FacebookProvider.init({
          appId      : '1560451627557497',
          xfbml      : true,
          version    : 'v2.3'
        });
      //FacebookProvider.init('1560451627557497');
    })

    .controller('paymentCtrl', ['$scope', 'UserSrv', 'PostDataSrv', '$cookies', '$element', function($scope, UserSrv, PostDataSrv, $cookies, $element){
      
      $scope.Checkout= function(item) {
        var $form = $($element.find('form'));
        var $encypt = $($form.find('#encrypted'));

        UserSrv.data.item = item;
        PostUser(UserSrv.data, $form, $encypt);
        UserSrv.setSession(UserSrv.data.id);
      };

      var PostUser = function (data, form, input){
        var TOKEN = $cookies['XSRF-TOKEN'];
        data.authenticity_token = TOKEN;

        PostDataSrv.postD(data).then(function(dataReturn) {

          console.log(dataReturn.status);

          if( dataReturn.status === "error" ) {
              alert('Sorry, something went wrong. Please try again.');
          }
          else {
            input.attr('value',dataReturn.cryp);
            form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
            form.submit();
          }


        }, function (reason){
          console.log('Reason: '+reason);
        });        

      };

    }])
    
    .controller('authenticationCtrl',['$scope', 'Facebook', 'UserSrv', function($scope, Facebook, UserSrv) {
      $scope.loggedIn = false;
      $scope.userSession = '';

      var shareMyItem = function () {
        var owner = UserSrv.getSession();
        if(owner && owner.name) {
          $scope.userSession = owner.name;
          if(owner.open) {
            $scope.loggedIn = true;
            UserSrv.destroyOpenSession(owner);
          }
        }
      };

      $scope.IntentLog = function () {
        login();
      };

      var login = function() { 
        Facebook.login(function(response) {
          if (response.status === 'connected') {
            $scope.loggedIn = true;
            me();
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

      var me = function() {
        Facebook.api('/me', function(response) {
          UserSrv.data = response;
        });
      };

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

      shareMyItem();
    }])
    .controller('shareMenuCtrl',['$scope','$window', 'Facebook' , function($scope, $window, Facebook){
      
      var message = [ 'Our mission is to take the young crew of riders from the rural community of Mesa de las Tablas to compete in the Maryhill Festival of Speed 2015.',
                      'Help us take this young crew of riders from the rural community of Mesa de las Tablas to compete in the Maryhill Festival of Speed 2015.',
                      'Congratulations! You are the actual owner of this item.Thanks to you, the crew of Venados Longboarding are one step closer to go and compete in the Maryhill Festival of Speed 2015.'];

      $scope.lang = function(lan) {
          if(lan === 'es')
            {
              $window.location.href='?locale=es';
            }
          else{
            $window.location.href='/';
            }
      };


      $scope.shareFacebook =function(messageNumber, pic) {

      var $pic = $('.numberdays').attr('data-day');

      if ($pic === undefined)
      {
        $pic = pic || "imagen_face.jpg";
      }
      else {
        $pic= $pic + '.png';
      }

        Facebook.ui({
          method: 'feed',
          picture: 'http://www.onedollaritem.org/images/'+$pic,
          link: 'http://onedollaritem.org',
          caption: 'A non-profit initiative powered by Patrick Switzer.',
          description: message[messageNumber]
        }, function(response){});
      };
      
    }])
    .controller('emailCtrl',['$scope','emailSrv','$cookies', function($scope, emailSrv, $cookies) {
      $scope.user = {};

      $scope.showModal = function(type){
        $('.modal').show();
      }

      $scope.hideModal = function (){
         $('.modal').fadeOut();
      };

      $scope.send = function(flag) {
        if (flag){
         $scope.user.authenticity_token = $cookies['XSRF-TOKEN'];

         emailSrv.post($scope.user).then(function(data) {
          $scope.user = {};
           $scope.hideModal();
         }, 
          function(data){
            console.log('NotCool');
          });
        }

      };
    }]);
})();