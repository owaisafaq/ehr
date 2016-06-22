var AppEHR = angular.module('AppEHR');

AppEHR.controller('Inventory', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllInventory','GetAllSuppliers','AddCategory','GetAllCategories', function($scope, $rootScope,$window,$routeParams,GetAllInventory,GetAllSuppliers,AddCategory,GetAllCategories){
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
			$scope.SuppplierLists = res.suppliers;
			console.log($scope.SuppplierLists)
		}
	}

	function GetAllSupplierFailure(error) {
		console.log(error);
	}

	$scope.AddCategory = function (category) {

		if (angular.equals({}, category) == false) {
			$scope.hideLoader = 'show';
			//$scope.updateEncounterBtn = true;
			//console.log($scope.displayInfo.patient_id);
			var addCateogry={
				token: $window.sessionStorage.token,
				cat_name: category.cat_name,
				cat_desc: category.cat_desc,
				cat_group: category.cat_group,

			}
			console.log(addCateogry);
			AddCategory.save(addCateogry, CategorySuccess, CategoryFailure);


		}
	}

	function CategorySuccess(res) {
		console.log(res);
		if (res.status == true) {
			$rootScope.loader = "hide";
		}
	}

	function CategoryFailure(error) {
		console.log(error);
	}

	GetAllCategories.get({
		token: $window.sessionStorage.token

	}, GetAllCategoriesSuccess, GetAllCategoriesFailure);

	function GetAllCategoriesSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$scope.CategoryLists = res.inventory_categories;
			console.log($scope.CategoryLists)
		}
	}

	function GetAllCategoriesFailure(error) {
		console.log(error);
	}







}]);