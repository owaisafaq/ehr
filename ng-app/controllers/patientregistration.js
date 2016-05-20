var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientRegistrationController', ['$rootScope', '$scope', '$window', 'PatientRegistration', 'Countries', 'States', function ($rootScope, $scope, $window, PatientRegistration, Countries, States) {
    $rootScope.pageTitle = "EHR - Patient Registration";
    $scope.PI = {};
    Countries.get({token: $window.sessionStorage.token}, countrySuccess, countryFailed);
    function countrySuccess(res){
    	if(res.status ==  true){
    		console.log(res);
    		$scope.countries = res.data;
    	}else{
    		console.log(res);
    	}
    }

    function countryFailed(error){
    	console.log(error);
    }

    $scope.countrySelect = function(id){
    	if(id != undefined && id != ''){
    		States.get({token: $window.sessionStorage.token, countryID: id}, stateSuccess, stateFailed);
    	}
    	function stateSuccess(res){
	    	if(res.status ==  true){
	    		console.log(res);
	    		$scope.countries = res;
	    	}else{
	    		console.log(res);
	    	}
	    }
	    function stateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.submit = function(PI){
    	console.log(PI);
    };
}]);
