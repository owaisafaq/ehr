var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacy', ['$scope', '$rootScope', 'getPharmacy', '$window', '$routeParams','GetPatientInfo', function ($scope, $rootScope, getPharmacy, $window, $routeParams) {
	$rootScope.pageTitle = "EHR - Pharmacy";
	$scope.displayInfo = {};
	getPharmacy.get({
		token: $window.sessionStorage.token
	}, getPharmacySuccess, getPharmacyFailure);

	function getPharmacySuccess(res) {
		if (res.status == true) {
			console.log(res.data);
			$scope.pharmacyLists = res.data;
		}
	}

	function getPharmacyFailure(error) {
		console.log(error);
	}

}]);