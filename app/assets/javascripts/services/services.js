(function () {
    'use strict';

    // Registro
    angular
        .module('odiApp.services',[])
        .factory("User", function User(){
        	return { 
        		data:{}
        	};
        });
})();