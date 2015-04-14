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

    .controller('paymentCtrl', ['$scope', 'UserSrv', 'PostDataSrv', '$cookies', '$window', function($scope, UserSrv, PostDataSrv, $cookies, $window){
      $scope.donateData = {};
      

      $scope.CloseLightBox = function (id_item){
        $scope.PaymentPlataform='';
        UserSrv.data.item_id= id_item;
        PostData(UserSrv.data);
      };

      $scope.Checkout= function(des, ipn_url) {
        var values = {
            "business" : 'eve.smda-facilitator@gmail.com',
            "cmd" : '_donations',
            "upload" : 1,
            "return" : 'http://localhost:3000/',
            "amount" : '1.34',
            "quantity": 1, 
            "item_name" : des,
            "address_override" : 1,
            "email" : $scope.donateData.email,
            "notify_url": ipn_url
        };

        $window.location.href = "https://www.sandbox.paypal.com/cgi-bin/webscr?"+  $.param(values);
      };

      var PostData = function (data){
        var TOKEN = $cookies['XSRF-TOKEN'];
        data.authenticity_token = TOKEN;

        PostDataSrv.postD(data).then(function(dataReturn) {
          console.log(dataReturn);
        }, function (reason){
          console.log('Reason: '+reason);
        });        

      };

    }])
    
    .controller('authenticationCtrl',['$scope', 'Facebook', 'UserSrv', function($scope, Facebook, UserSrv) {
      $scope.loggedIn = false;

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

    }])
    .controller('shareMenuCtrl',['$scope','$window', 'Facebook' , function($scope, $window, Facebook){
      
      var message = [ 'Our mission is to take the young crew of riders from the rural community of Mesa de las Tablas to compete in the Maryhill Festival of Speed 2015.',
                      'Help us take this young crew of riders from the rural community of Mesa de las Tablas to compete in the Maryhill Festival of Speed 2015.'];

      $scope.lang = function(lan) {
          if(lan === 'es')
            {
              $window.location.href='?locale=es';
            }
          else{
            $window.location.href='/';
            }
      };


      $scope.shareFacebook =function(messageNumber) {

      var $pic = $('.numberdays').attr('data-day');

        Facebook.ui({
          method: 'feed',
          picture: 'http://www.onedollaritem.org/images/'+$pic+'.png',
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