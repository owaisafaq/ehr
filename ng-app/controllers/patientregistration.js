var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientRegistrationController', ['$rootScope', '$scope', '$window', 'PatientRegistration', 'Countries', 'States', 'GetLocalGovermentArea', 'City', 'DropDownData', function ($rootScope, $scope, $window, PatientRegistration, Countries, States, GetLocalGovermentArea, City, DropDownData) {
    $rootScope.pageTitle = "EHR - Patient Registration";
    $scope.PI = {};
    $scope.contactAddressCountries = [];
    $scope.permanentAddressCountries = [];
    $scope.addressContactCities = [];
    $scope.addressPerminentCities = [];
    $scope.nextOfKinCountries = [];
    $scope.contactAddressStates = [];
    $scope.permanentAddressStates = [];
    $scope.patientInfolocalGovtArea = [];
    $scope.addresslocalGovtArea = [];
    $scope.employerCountries = [];
    $scope.nextOfKinCities = [];
    $scope.nextOfKinStates = [];
    $scope.employerStates = [];
    $scope.employerCities = [];
    $scope.dropDownData = [];
    Countries.get({token: $window.sessionStorage.token}, countrySuccess, countryFailed);

    function countrySuccess(res){
    	if(res.status ==  true){
    		//$scope.contactAddress.countries = res.data;
    		angular.copy(res.data, $scope.contactAddressCountries);
    		angular.copy(res.data, $scope.permanentAddressCountries);
    		angular.copy(res.data, $scope.nextOfKinCountries);
    		angular.copy(res.data, $scope.employerCountries);
    	}else{
    		$scope.countries = '';
    		$scope.states = '';
    		permanent_state = '';
    		console.log(res);
    	}
    }

    function countryFailed(error){
    	console.log(error);
    }

	DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFailed);

	function dropDownSuccess(res) {
		if(res.status == true){
			angular.copy(res.data, $scope.dropDownData);
			console.log($scope.dropDownData.maritial_status[0].name);
			$scope.PI = {martial_status : $scope.dropDownData.maritial_status[0].name};
			console.log($scope.PI.martial_status);
		}
	}

	function dropDownFailed(error) {
		console.log(error);
	}

    // Address
    $scope.addressStateByCountry = function(id, flag){
    	if(id != "null"){
			States.get({token: $window.sessionStorage.token, country_id: id}, stateSuccess, stateFailed);
    	}else{
			if(flag){
				$scope.PI.permanent_country = "null";
				$scope.PI.permanent_state = "null";
    			$scope.permanentAddressStates = [];
    			$scope.addressPerminentCities = [];
    			$scope.PI.permanent_city = 'null';
    		}else{
    			$scope.addressContactCities = [];
    			$scope.PI.patient_city = "null";
    			$scope.PI.patient_state = "null";
    			$scope.contactAddressStates = [];
    			$scope.PI.local_goverment_area = "null";
    			$scope.addresslocalGovtArea = [];
    		}
		}
    	function stateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.contactAddressStates);
    			angular.copy(res.data, $scope.permanentAddressStates);
	    	}/*else{
	    		
	    	}*/
	    }
	    function stateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.addressLocalGovtAreaByStates = function(state, flag){
    	console.log(state);
    	if(state != "null"){
    		GetLocalGovermentArea.get({token: $window.sessionStorage.token, state_id: state}, LGASuccess, LGAFailed);
    		City.get({token: $window.sessionStorage.token, state_id: state}, citySuccess, cityFailed);
    		function LGASuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.patientInfolocalGovtArea);
    				angular.copy(res.data, $scope.addresslocalGovtArea);
    			}else{
    				console.log(111);
    			}
    		}
    		function LGAFailed(error){
    			console.log(error);
    		}

    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.addressContactCities);
    				angular.copy(res.data, $scope.addressPerminentCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			if(flag){
				$scope.PI.patient_local_goverment_area = "null";
    			$scope.patientInfolocalGovtArea = [];
    		}else{
    			$scope.PI.local_goverment_area = "null";
    			$scope.addresslocalGovtArea = [];
    		}
    	}
    }

    // Next of Kin
    $scope.nextOfKinStateByCountry = function(id){
    	if(id != "null"){
			States.get({token: $window.sessionStorage.token, country_id: id}, nextOfKinStateSuccess, nextOfKinStateFailed);
    	}else{
			$scope.PI.kin_state = "null";
			$scope.nextOfKinStates = [];
			$scope.PI.kin_city = "null";
			$scope.nextOfKinCities = [];
		}
    	function nextOfKinStateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.nextOfKinStates);
	    	}/*else{
	    		
	    	}*/
	    }
	    function nextOfKinStateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.nextOfKinCityByStates = function(states){
    	console.log(states);
    	if(states != "null"){
    		City.get({token: $window.sessionStorage.token, state_id: states}, citySuccess, cityFailed);
    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.nextOfKinCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			$scope.PI.kin_city = "null";
			$scope.nextOfKinCities = [];
    	}
    };

    // Employer
    $scope.employerStateByCountry = function(id){
    	if(id != "null"){
			States.get({token: $window.sessionStorage.token, country_id: id}, employerStateSuccess, employerStateFailed);
    	}else{
			$scope.PI.employer_state = "null";
			$scope.employerStates = [];
			$scope.PI.employer_city = "null";
			$scope.employerCities = [];
		}
    	function employerStateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.employerStates);
	    	}/*else{
	    		
	    	}*/
	    }
	    function employerStateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.employerCityByStates = function(states){
    	console.log(states);
    	if(states != "null"){
    		City.get({token: $window.sessionStorage.token, state_id: states}, citySuccess, cityFailed);
    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.employerCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			$scope.PI.employer_city = "null";
			$scope.employerCities = [];
    	}
    };

    $scope.submit = function(PI){
    	console.log(PI);
    };
}]);
