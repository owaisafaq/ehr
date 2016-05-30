var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientRegistrationController', ['$rootScope', '$scope', '$window', 'Countries', 'States', 'GetLocalGovermentArea', 'City', 'DropDownData', 'PatientRegistration', 'fileUpload', '$location', function ($rootScope, $scope, $window, Countries, States, GetLocalGovermentArea, City, DropDownData, PatientRegistration, fileUpload, $location) {
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
    $scope.isDisabled = false;
    $scope.PI.sameAsAbove = true;
    $('.hidePermanentAddress').slideUp(500);
    $scope.dropDownInfo = dropDownInfo;
    //$scope.PI.identity_type = dropDownInfo.IdType[0].id;
    //$scope.PI.kin_relationship = dropDownInfo.relationship[0].id;
    //$scope.PI.dependant_relationship = dropDownInfo.relationship[0].id;
    //$scope.PI.principal_relationship = dropDownInfo.relationship[0].id;
    //$scope.PI.nhis_principal_relationship = dropDownInfo.relationship[0].id;

    $scope.validateEmail = function (email) { 
        var re = /^(([^<>()[\]\\.,;:+-\s@\"]+(\.[^<>()[\]\\.,;:+-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    Countries.get({token: $window.sessionStorage.token}, countrySuccess, countryFailed);

    function countrySuccess(res){
    	if(res.status ==  true){
    		angular.copy(res.data, $scope.contactAddressCountries);
    		angular.copy(res.data, $scope.permanentAddressCountries);
    		angular.copy(res.data, $scope.nextOfKinCountries);
    		angular.copy(res.data, $scope.employerCountries);
    		//$scope.PI.patient_country = $scope.contactAddressCountries[0].id;
    		//$scope.PI.permanent_country = $scope.permanentAddressCountries[0].id;
    		//$scope.PI.nextOfKinCountries = $scope.nextOfKinCountries[0].id;
    		//$scope.PI.employerCountries = $scope.employerCountries[0].id;
    	}else{
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
    		//$scope.PI.maritial_status = $scope.dropDownData.maritial_status[0].id;
    		//$scope.PI.religion = $scope.dropDownData.religion[0].id;
    		//$scope.PI.nationality = $scope.dropDownData.nationality[0].id;
    		//$scope.PI.blood_group = $scope.dropDownData.blood_group[0].id;
    		//$scope.PI.language = $scope.dropDownData.language[0].id;
		/*	$scope.PI = {martial_status : $scope.dropDownData.maritial_status[0].name};
			console.log($scope.dropDownData.maritial_status[0].name);
			console.log($scope.PI.martial_status);*/
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
    			$scope.PI.city = "null";
    			$scope.PI.state = "null";
    			$scope.contactAddressStates = [];
    			$scope.PI.local_goverment_area = "null";
    			$scope.addresslocalGovtArea = [];
    		}
		}
    	function stateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.contactAddressStates);
    			angular.copy(res.data, $scope.permanentAddressStates);
    			//$scope.PI.patient_state = $scope.contactAddressStates[0].id;
    			//$scope.PI.permanent_street = $scope.permanentAddressStates[0].id;
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

    function permanentAddress(){
    	$scope.PI.permanent_phonenumber = $scope.PI.phone_number;
    	$scope.PI.permanent_mobilenumber = $scope.PI.mobile_number;
    	$scope.PI.permanent_email = $scope.PI.email;
    	$scope.PI.permanent_housenumber = $scope.PI.house_number;
    	$scope.PI.permanent_street = $scope.PI.street;
    	$scope.PI.permanent_country = $scope.PI.country;
    	$scope.PI.permanent_state = $scope.PI.state;
    	$scope.PI.permanent_postalCode = $scope.PI.postal_code;
    	$scope.PI.permanent_city = $scope.PI.city;
    }

    // Permanent Address checkbox
    $scope.isChecked = function(checked){
    	if(checked){
    		$('.hidePermanentAddress').slideUp(500);
    		permanentAddress();
    	}else{
    		$('.hidePermanentAddress').slideDown(500);
    		$scope.PI.permanent_phonenumber = '';
	    	$scope.PI.permanent_mobilenumber = '';
	    	$scope.PI.permanent_email = '';
	    	$scope.PI.permanent_housenumber = '';
	    	$scope.PI.permanent_street = '';
	    	$scope.PI.permanent_country = '';
	    	$scope.PI.permanent_state = '';
	    	$scope.PI.permanent_postalCode = '';
	    	$scope.PI.permanent_city = '';
    	}
    };

    $scope.isDisabledAddress = function(){
    	if($scope.validateEmail($scope.PI.email) && $scope.PI.phone_number != undefined && $scope.PI.phone_number != '' && $scope.PI.mobile_number != undefined && $scope.PI.mobile_number != '' && $scope.PI.email != undefined && $scope.PI.email != '' && $scope.PI.house_number != undefined && $scope.PI.house_number != '' && $scope.PI.street != undefined && $scope.PI.street != '' && $scope.PI.country != undefined && $scope.PI.country != 'null' && $scope.PI.state != undefined && $scope.PI.state != 'null' && $scope.PI.local_goverment_area != 'null' && $scope.PI.local_goverment_area != undefined && $scope.PI.city != undefined && $scope.PI.city != '' && $scope.PI.postal_code != undefined & $scope.PI.postal_code != ''){
    		return false;
    		//$scope.validateClass = "";
    	}else{
    		return true;
    		//$scope.validateClass = "invalid";
    	}
    }

    $scope.isDisabledInfo = function(){
    	if($scope.PI.patient_unit_number != '' && $scope.PI.patient_unit_number != undefined){
    		return false;
    	}else{
    		return true;
    	}
    }

    $scope.validatePatientInfo = function(PI){
    	console.log(PI);
    	if($scope.validateEmail(PI.email)){
    		$scope.validateClass = "";
    	}else{
    		$scope.validateClass = "invalid";
    	}
    	/*if(angular.equals({}, PI)){
    		console.log(1111);
    	}else{
    		console.log(PI);
    		console.log(angular.equals({}, PI));
    	}*/
    }

    $scope.submit = function(PI){
    	console.log($scope.PI);
    	/*var file = $scope.PI.myFile;
        console.log('file is ' + file);
        console.dir(file);
        var uploadUrl = patientFileUploadPath;
        fileUpload.uploadFileToUrl(file, uploadUrl);*/
    	if($scope.PI.sameAsAbove == true){
	    	permanentAddress();
	    }else{
	    	delete $scope.PI.permanent_phonenumber;
	    	delete $scope.PI.permanent_mobilenumber;
	    	delete $scope.PI.permanent_email;
	    	delete $scope.PI.permanent_housenumber;
	    	delete $scope.PI.permanent_street;
	    	delete $scope.PI.permanent_country;
	    	delete $scope.PI.permanent_state;
	    	delete $scope.PI.permanent_postalCode;
	    	delete $scope.PI.permanent_city;
	    }

    	/*PatientRegistration.save({
    		token: $window.sessionStorage.token,
    		patient_unit_number: $scope.PI.patient_unit_number, // info tab
    		first_name: $scope.PI.first_name,
    		middle_name: $scope.PI.middle_name,
    		last_name: $scope.PI.last_name,
    		date_of_birth: $scope.PI.date_of_birth,
    		age: $scope.PI.age,
    		patient_picture: $scope.PI.myFile,
    		maritial_status: $scope.PI.maritial_status,
    		patient_local_goverment_area: $scope.PI.patient_local_goverment_area,
    		religion: $scope.PI.religion,
    		identity_type: $scope.PI.identity_type,
    		identity_number: $scope.PI.identity_number,
    		patient_state: $scope.PI.patient_state,
    		tribe: $scope.PI.tribe,
    		language: $scope.PI.language,
    		nationality: $scope.PI.nationality,
    		blood_group: $scope.PI.blood_group,
    		father_firstname: $scope.PI.father_firstname,
    		father_middlename: $scope.PI.father_middlename,
    		father_lastname: $scope.PI.father_lastname,
    		mother_firstname: $scope.PI.mother_firstname,
    		mother_middlename: $scope.PI.mother_middlename,
    		mother_lastname: $scope.PI.mother_lastname,
    		refered_name: $scope.PI.refered_name,
    		phone_number: $scope.PI.phone_number, // Address tab
    		mobile_number: $scope.PI.mobile_number,
    		patient_email: $scope.PI.patient_email,
    		house_number: $scope.PI.house_number,
    		street: $scope.PI.street,
    		country: $scope.PI.country,
    		state: $scope.PI.state,
    		city: $scope.PI.city,
    		email: $scope.PI.email,
    		postal_code: $scope.PI.postal_code,
    		local_goverment_area: $scope.PI.local_goverment_area,
    		same_as_above: $scope.PI.sameAsAbove,
    		permanent_phonenumber: $scope.PI.permanent_phonenumber, // paremenant address
    		permanent_mobilenumber: $scope.PI.permanent_mobilenumber,
    		permanent_email: $scope.PI.permanent_email,
    		permanent_housenumber: $scope.PI.permanent_housenumber,
    		permanent_street: $scope.PI.permanent_street,
    		permanent_country: $scope.PI.permanent_country,
    		patient_city: $scope.PI.patient_city,
    		permanent_state: $scope.PI.permanent_state,
    		permanent_postalCode: $scope.PI.permanent_postalCode,
    		kin_fullname: $scope.PI.kin_fullname, // Kin tab
    		kin_middlename: $scope.PI.kin_middlename,
    		kin_lastname: $scope.PI.kin_lastname,
    		kin_relationship: $scope.PI.kin_relationship,
    		others: $scope.PI.others,
    		kin_phone_number: $scope.PI.kin_phone_number,
    		kin_mobile_number: $scope.PI.kin_mobile_number,
    		kin_email: $scope.PI.kin_email,
    		kin_house_number: $scope.PI.kin_house_number,
    		kin_street: $scope.PI.kin_street,
    		kin_country: $scope.PI.kin_country,
    		kin_state: $scope.PI.kin_state,
    		kin_city: $scope.PI.kin_city,
    		kin_postal_code: $scope.PI.kin_postal_code,
    		employer_name: $scope.PI.employer_name, // employer tab
    		employer_occupation: $scope.PI.employer_occupation,
    		employer_phone_number: $scope.PI.employer_phone_number,
    		employer_mobile_number: $scope.PI.employer_mobile_number,
    		employer_email: $scope.PI.employer_email,
    		employer_house_number: $scope.PI.employer_house_number,
    		employer_street: $scope.PI.employer_street,
    		employer_country: $scope.PI.employer_country,
    		employer_state: $scope.PI.employer_state,
    		employer_city: $scope.PI.employer_city,
    	}, registrationSuccess, registrationFailed);*/
    	function registrationSuccess(res){
    		if(res.status == true){
    			console.log(res);
    		}else{
    			console.log(res);
    		}
    	}
    	function registrationFailed(error){
    		console.log(error);
    	}
    };
}]);
