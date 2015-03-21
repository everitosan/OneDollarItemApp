(function(){
  'use strict';

  angular.module('odiApp.controllers', ['facebook', 'ngCookies'])
    .config(function(FacebookProvider) {
      FacebookProvider.init('1560451627557497');
    })

    .controller('paymentCtrl', ['$scope', 'User', '$http', '$cookies', function($scope, User, $http, $cookies){
      $scope.PaymentPlataform = '';
      
      $scope.paymentMode = function (mode){
        $scope.PaymentPlataform = mode;
      };

      $scope.CloseLightBox = function (){
        $scope.PaymentPlataform='';
        PostData(User.data);
      };

      var PostData = function (data){
        var TOKEN = $cookies['XSRF-TOKEN'];
        data.authenticity_token = TOKEN;
        data.item_id = 1;
        console.log(data);

        $http.post('/donator/prepost', data).
          success(function(data, status, headers, config) {
            console.log(data);
          }).
          error(function(data, status, headers, config) {
            console.log(status);
          });

      };

    }])
    
    .controller('authenticationCtrl',['$scope', 'Facebook', 'User', function($scope, Facebook, User) {
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
          User.data = response;
          setPhoto('http://graph.facebook.com/'+response.id+'/picture?type=small');
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

  }]);
})();