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

        }]);
})();