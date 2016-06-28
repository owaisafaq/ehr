var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacy', ['$scope', '$rootScope', 'getPharmacy', '$window','Countries', 'States', '$routeParams','GetPatientInfo', function ($scope, $rootScope, getPharmacy, $window,Countries, States, $routeParams) {
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

	/*$scope.getStates=function(){
		console.log($scope.countries)
	}*/

	$scope.addressStateByCountry = function (country) {
		$scope.disabledDropdown = true;
		States.get({token: $window.sessionStorage.token, country_id: country}, stateSuccess, stateFailed);

		function stateSuccess(res) {
			if (res.status == true && res.data.length > 0) {
				angular.copy(res.data, $scope.state);
				$scope.disabledDropdown = false;
			}
		}
		function stateFailed(error) {
			console.log(error);
			console.log("here");
		}

	}

}]);