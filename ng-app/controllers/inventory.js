var AppEHR = angular.module('AppEHR');

AppEHR.controller('Inventory', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllInventory','GetAllSuppliers', function($scope, $rootScope,$window,$routeParams,GetAllInventory,GetAllSuppliers){
	$rootScope.pageTitle = "EHR - Inventory";
	$scope.displayInfo = {};
	GetAllInventory.get({
		token: $window.sessionStorage.token,
		patient_id: $routeParams.patientID
	}, GetAllInventorySuccess, GetAllInventoryFailure);

	function GetAllInventorySuccess(res) {
		console.log(res);
		if (res.status == true) {
			$scope.InventoryLists = res.data;
			console.log($scope.InventoryLists)
		}
	}

	function GetAllInventoryFailure(error) {
		console.log(error);
	}

	GetAllSuppliers.get({
		token: $window.sessionStorage.token

	}, GetAllSupplierSuccess, GetAllSupplierFailure);

	function GetAllSupplierSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$scope.SuppplierLists = res.data;
			console.log($scope.SuppplierLists)
		}
	}

	function GetAllSupplierFailure(error) {
		console.log(error);
	}



}]);