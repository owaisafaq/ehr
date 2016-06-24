var AppEHR = angular.module('AppEHR');

AppEHR.controller('Inventory', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllInventory','GetAllSuppliers','AddCategory','GetAllCategories','AddSupplier','GetSingleSupplier','UpdateSuppliers','GetSingleCategory','GetSingleStock','updateCategory','DeleteCategory','DeleteSupplier','AddInventory','$timeout', function($scope, $rootScope,$window,$routeParams,GetAllInventory,GetAllSuppliers,AddCategory,GetAllCategories,AddSupplier,GetSingleSupplier,UpdateSuppliers,GetSingleCategory,GetSingleStock,updateCategory,DeleteCategory,DeleteSupplier,AddInventory,$timeout){
	$rootScope.pageTitle = "EHR - Inventory";
	$scope.displayInfo = {};
	$scope.cat_unique={};
	$scope.selectedSupplier = {};
	GetAllInventory.get({
		token: $window.sessionStorage.token,
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


// Add Inventory
	$scope.AddInventory = function (inventory) {

		if (angular.equals({}, category) == false) {
			$scope.hideLoader = 'show';
			//$scope.updateEncounterBtn = true;
			//console.log(inventory);
			var addInventory={
				token: $window.sessionStorage.token,
				product_id	:inventory.product_id,
				pharmacy_id:inventory.pharmacy_id,
				manufacturer_id:inventory.manufacturer_id,
				dept_id:inventory.dept_id,
				supplier_id:inventory.supplier_id,
				received_date:inventory.recvd_date,
				batch_no:inventory.batch_number,
				ref_no	:inventory.ref_no,
				expiry	:inventory.expiry_date,
				quantity:inventory.quantity,
				order_quantity:inventory.order_quantity,
				cost_per_item:inventory.price,
				pack:'pack',


			/*	token: $window.sessionStorage.token,
				 product_id	:1,
				 pharmacy_id:1,
				 manufacturer_id:1,
				 dept_id:1,
				 supplier_id:1,
				 received_date:2016-06-06,
				 batch_no:1200,
				 ref_no	:1020,
				 expiry	:2016-06-01,
				 quantity:1,
				 order_quantity:1,
				 cost_per_item:1200,
				 pack:'pack'
				*/


			}
			console.log(addInventory);
			AddInventory.save(addInventory, AddInventorySuccess, AddInventoryFailure);


		}
	}

	function AddInventorySuccess(res) {
	 console.log(res);
	 if (res.status == true) {
	 $rootScope.loader = "hide";
		 $("#stock_det").hide();
		 $(".add-drug-supplements").hide();
		 $(".add-drug-others").hide();


		 GetAllInventory.get({
			 token: $window.sessionStorage.token,
		 }, GetAllInventorySuccess, GetAllInventoryFailure);

	 }
	 }

	function AddInventoryFailure(error) {
		console.log(error);
	}



//// Update Category
	$scope.UpdateCategory = function (category) {

		if (angular.equals({}, category) == false) {
			$scope.hideLoader = 'show';

			console.log(category);
			var CategoryUpdate={
				token: $window.sessionStorage.token,
				cat_id:category.id,
				cat_name:category.cat_name,
				cat_desc:category.cat_desc,
				cat_group:category.cat_group


			}
			console.log(updateCategory);
			updateCategory.save(CategoryUpdate, UpdateCategorySuccess, UpdateCategoryFailure);

		}
	}

	function UpdateCategorySuccess(res) {
		console.log(res);
		console.log(res);
		if (res.status == true) {
			$rootScope.loader = "hide";
			$timeout(function () {
				$('#editCategory').modal('hide');
			},500);
			GetAllCategories.get({
				token: $window.sessionStorage.token

			}, GetAllCategoriesSuccess, GetAllCategoriesFailure);

		}
	}

	function UpdateCategoryFailure(error) {
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
				supplier_id:supplier.id,
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
			UpdateSuppliers.save(updateSupplier, UpdateSupplierSuccess, UpdateSupplierFailure);


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




	//Delete Supplier



	$scope.SupplierDeleted = function (supplierID) {
		console.log(supplierID);
		$scope.supplierID = supplierID;
		$rootScope.loader = "show";
		DeleteSupplier.save({token: $window.sessionStorage.token, supplier_id: supplierID}, deleteSupplierInfoSuccess, deleteSupplierInfoFailure);

		function deleteSupplierInfoSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";
				console.log("Deleted");
				GetAllSuppliers.get({
					token: $window.sessionStorage.token

				}, GetAllSupplierSuccess, GetAllSupplierFailure);


			}
		}
		function deleteSupplierInfoFailure(error) {
			$rootScope.loader = "show";
			console.log(error);
		}
	};





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
				$('#editCategory').modal('show');


			}
		}
		function getCategoryInfoFailure(error) {
			$rootScope.loader = "show";
			console.log(error);
		}
	};




	//Delete Category



	$scope.catDeleted = function (catID) {
		console.log(catID);
		$scope.catID = catID;
		$rootScope.loader = "show";
		DeleteCategory.save({token: $window.sessionStorage.token, cat_id: catID}, deleteCategoryInfoSuccess, deleteCategoryInfoFailure);

		function deleteCategoryInfoSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";
				console.log("Deleted");
				GetAllCategories.get({
					token: $window.sessionStorage.token

				}, GetAllCategoriesSuccess, GetAllCategoriesFailure);



			}
		}
		function deleteCategoryInfoFailure(error) {
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


	$scope.StockSelected = function (productID) {
		console.log(productID);
		$scope.productID = productID;


		$rootScope.loader = "show";
		GetSingleStock.get({token: $window.sessionStorage.token, product_id: productID}, getStockInfoSuccess, getStockInfoFailure);
		function getStockInfoSuccess(res) {
			if (res.status == true) {
				//console.log(res);
				$rootScope.loader = "hide";
				//$scope.SupplierSelected = true;
				$scope.selectedStocks = res.data;
				console.log($scope.selectedStocks);
				$(".inventory_detail").hide();
				$("#stock_det").show();


			}
		}
		function getStockInfoFailure(error) {
			$rootScope.loader = "show";
			console.log(error);
		}
	};







}]);