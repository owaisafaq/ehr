var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacy', ['$scope', '$rootScope', 'getPharmacy', '$window','Countries', 'States', '$routeParams','City','addPharmacy','$timeout', function ($scope, $rootScope, getPharmacy, $window,Countries, States, $routeParams,City,addPharmacy,$timeout) {
	$rootScope.pageTitle = "EHR - Pharmacy";
	$scope.displayInfo = {};
	getPharmacy.get({
		token: $window.sessionStorage.token
	}, getPharmacySuccess, getPharmacyFailure);

	function getPharmacySuccess(res) {
		if (res.status == true) {
			$scope.pharmacyLists = res.data;
		}
	}

	function getPharmacyFailure(error) {
		console.log(error);
	}
	$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	Countries.get({token: $window.sessionStorage.token}, countrySuccess, countryFailed);

	function countrySuccess(res) {
		if (res.status == true) {
			$scope.countries = res.data;
		} else {
			console.log(res);
		}
	}

	function countryFailed(error) {
		console.log(error);
	}

	$scope.addressStateByCountry = function (country) {
		$scope.disabledDropdown = true;
		States.get({token: $window.sessionStorage.token, country_id: country}, stateSuccess, stateFailed);
		function stateSuccess(res) {
			if (res.status == true && res.data.length > 0) {
				$scope.states = res.data;
				$scope.disabledDropdown = false;
			}
		}
		function stateFailed(error) {
			console.log(error);
		}
	};

	$scope.addressCityByState = function (state) {
		City.get({token: $window.sessionStorage.token, state_id: state}, citySuccess, cityFailed);
		function citySuccess(res) {
			if (res.status == true && res.data.length > 0) {
				$scope.cities = res.data;
				$scope.disabledDropdown = false;
			}
		}
		function cityFailed(error) {
			console.log(error);
		}

	};

	$scope.createPharmacy = function (pharmacyData){
		addPharmacy.save({
			token : $window.sessionStorage.token,
			name : pharmacyData.name,
			contact_person : pharmacyData.contact_person,
			city : pharmacyData.city,
			state : pharmacyData.state,
			country : pharmacyData.countries,
			address_1 : pharmacyData.address_1,
			address_2 : pharmacyData.address_2,
			email : pharmacyData.email,
			work_phone : pharmacyData.work_phone,
			post_code :pharmacyData.post_code
		},addPharmacySuccess,addPharmacyFailure);
	};
	function addPharmacySuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addPharmacyBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.pharmacyData = {};
			$timeout(function(){
				$scope.message = false;
				$('#addPharmacy').modal('hide');
				$scope.errorMessage = "";
				$('#s2id_autogen1 .select2-chosen').text('Select Country');
				$('#s2id_autogen3 .select2-chosen').text('Select State');
				$('#s2id_autogen5 .select2-chosen').text('Select City');
			},1500);
		} else {
			$scope.hideLoader = "hide";
			$scope.addPharmacyBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addPharmacyFailure(error){ // on failure
		console.log(error);
	}
}]);