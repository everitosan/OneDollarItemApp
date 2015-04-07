(function(){
  'use strict';

  angular.module('odiApp.controllers', ['facebook', 'ngCookies'])
    .config(function(FacebookProvider) {
      FacebookProvider.init('1560451627557497');
    })

    .controller('paymentCtrl', ['$scope', 'UserSrv', 'PostDataSrv', '$cookies', function($scope, UserSrv, PostDataSrv, $cookies){
      $scope.PaymentPlataform = '';
      
      $scope.paymentMode = function (mode){
        $scope.PaymentPlataform = mode;
      };

      $scope.CloseLightBox = function (id_item){
        $scope.PaymentPlataform='';
        UserSrv.data.item_id= id_item;
        PostData(UserSrv.data);
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
    .controller('langCtrl',['$scope','$window' , function($scope, $window){
      $scope.lang = function(lan) {
          if(lan === 'es')
            {
              $window.location.href='?locale=es';
            }
          else{
            $window.location.href='/';
            }
      }

    
      


    }]);
})();