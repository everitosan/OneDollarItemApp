(function () {
    'use strict';

    // Registro
    angular
        .module('odiApp.services',[])
        .factory("UserSrv", function UserSrv(){
            
            function setSession(name) {
                var obj = {};
                obj.name = name;
                obj.open = true;
                localStorage.setItem('UserFacebook', JSON.stringify(obj) );
            }

            function getSession() {
                var UserFacebook = localStorage.getItem('UserFacebook');
                return JSON.parse(UserFacebook);
            }

            function destroyOpenSession(obj) {
                obj.open = false;
                localStorage.setItem('UserFacebook', JSON.stringify(obj) );
            }
        	return { 
        		data:{},
                setSession: setSession,
                getSession: getSession,
                destroyOpenSession: destroyOpenSession
        	};
        })
        .factory('PostDataSrv', ['$http', '$q','$window', function PostDataSrv($http, $q, $window) {

            var localStorage = $window.localStorage;

        	function postD (dataPost){
        		var deferred = $q.defer();
        		$http.post('/donator/prepost', dataPost)
        			.success(function (data){
        				deferred.resolve(data);
        			})
        			.error(function(data) {
		            	deferred.reject(data);
		          	});

        		return deferred.promise;
        	}

           
        	return {
        		postD: postD
        	}

        }])
        .factory('emailSrv',['$http', '$q', function emailSrv($http, $q) {
            function post (dataPost){
                var deferred = $q.defer();
                $http.post('/mailer/contact', dataPost)
                    .success(function (data){
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            }

            return {
                post: post
            }
        }] );
})();