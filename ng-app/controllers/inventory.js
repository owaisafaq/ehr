var AppEHR = angular.module('AppEHR');

AppEHR.controller('Inventory', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllInventory','GetAllSuppliers','AddCategory','GetAllCategories','AddSupplier','GetSingleSupplier','UpdateSupplier','GetSingleCategory','$timeout', function($scope, $rootScope,$window,$routeParams,GetAllInventory,GetAllSuppliers,AddCategory,GetAllCategories,AddSupplier,GetSingleSupplier,UpdateSupplier,GetSingleCategory,$timeout){
	$rootScope.pageTitle = "EHR - Inventory";
	$scope.displayInfo = {};
	$scope.cat_unique={};
	$scope.selectedSupplier = {};
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

	// Add Category

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
			angular.copy(addCateogry,$scope.cat_unique);
			console.log(addCateogry);
			AddCategory.save(addCateogry, CategorySuccess, CategoryFailure);


		}
	}

	function CategorySuccess(res) {
		console.log(res);
		if (res.status == true) {
			$rootScope.loader = "hide";
			$scope.CategoryLists.push($scope.cat_unique);
			console.log($scope.CategoryLists);
			$timeout(function () {
				$('#addCategory').modal('hide');
			},500);
		}
	}

	function CategoryFailure(error) {
		console.log(error);
	}


	// Get Categories

	GetAllCategories.get({
		token: $window.sessionStorage.token

	}, GetAllCategoriesSuccess, GetAllCategoriesFailure);

	function GetAllCategoriesSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$scope.CategoryLists = res.data;
			console.log($scope.CategoryLists)
		}
	}

	function GetAllCategoriesFailure(error) {
		console.log(error);
	}

// Add Supplier
	$scope.AddSupplier = function (supplier) {

		if (angular.equals({}, category) == false) {
			$scope.hideLoader = 'show';
			//$scope.updateEncounterBtn = true;
			//console.log($scope.displayInfo.patient_id);
			var addSupplier={
				token: $window.sessionStorage.token,
				name:supplier.sname,
				contact_person:supplier.contact_person,
				city:supplier.city,
				state:supplier.state,
				country:supplier.country,
				address_1:supplier.address_1,
				address_2:supplier.address_2,
				email:supplier.email,
				work_phone:supplier.wphone,
				mobile:supplier.mobile,
				website:supplier.website,
				post_code:supplier.post_code

			}
			console.log(addSupplier);
			AddSupplier.save(addSupplier, SupplierSuccess, SupplierFailure);


		}
	}

	function SupplierSuccess(res) {
	 console.log(res);
	 if (res.status == true) {
	 $rootScope.loader = "hide";
	 $timeout(function () {
	 $('#addSupplier').modal('hide');
	 },500);
	 }
	 }

	function SupplierFailure(error) {
		console.log(error);
	}




//// Update Supplier
	$scope.UpdateSupplier = function (supplier) {

		if (angular.equals({}, category) == false) {
			$scope.hideLoader = 'show';
			//$scope.updateEncounterBtn = true;
			//console.log($scope.displayInfo.patient_id);
			var updateSupplier={
				token: $window.sessionStorage.token,
				id:supplier.id,
				name:supplier.name,
				contact_person:supplier.contact_person,
				city:supplier.city,
				state:supplier.state,
				country:supplier.country,
				address_1:supplier.address_1,
				address_2:supplier.address_2,
				email:supplier.email,
				work_phone:supplier.work_phone,
				mobile:supplier.mobile,
				website:supplier.website,
				post_code:supplier.post_code

			}
			console.log(updateSupplier);
			UpdateSupplier.save(updateSupplier, UpdateSupplierSuccess, UpdateSupplierFailure);


		}
	}

	function UpdateSupplierSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$rootScope.loader = "hide";
			$timeout(function () {
				$('#editSupplier').modal('hide');
			},500);
		}
	}

	function UpdateSupplierFailure(error) {
		console.log(error);
	}



// Get Single Category
	$scope.catSelected = function (catID) {
		console.log(catID);
		$scope.catID = catID;
		$scope.selectedCategory = {};
		$rootScope.loader = "show";
		GetSingleCategory.get({token: $window.sessionStorage.token, cat_id: catID}, getCategoryInfoSuccess, getCategoryInfoFailure);
		function getCategoryInfoSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";
				$scope.selectedCategory = res.data;
				console.log($scope.selectedCategory);
			}
		}
		function getCategoryInfoFailure(error) {
			$rootScope.loader = "show";
			console.log(error);
		}
	};



//Get Single Supplier

	$scope.SupplierSelected = function (supplierID) {
		console.log(supplierID);
		$scope.supplierID = supplierID;

		$rootScope.loader = "show";
		GetSingleSupplier.get({token: $window.sessionStorage.token, supplier_id: supplierID}, getSupplierInfoSuccess, getSupplierInfoFailure);
		function getSupplierInfoSuccess(res) {
			if (res.status == true) {
				//console.log(res);
				$rootScope.loader = "hide";
				//$scope.SupplierSelected = true;
				$scope.selectedSupplier = res.data;
				console.log($scope.selectedSupplier);
				$('#editSupplier').modal('show');

			}
		}
		function getSupplierInfoFailure(error) {
			$rootScope.loader = "show";
			console.log(error);
		}
	};







}]);