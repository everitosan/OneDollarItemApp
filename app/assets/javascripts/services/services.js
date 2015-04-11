(function () {
    'use strict';

    // Registro
    angular
        .module('odiApp.services',[])
        .factory("UserSrv", function UserSrv(){
        	return { 
        		data:{}
        	};
        })
        .factory('PostDataSrv', ['$http', '$q', function PostDataSrv($http, $q) {
        	
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