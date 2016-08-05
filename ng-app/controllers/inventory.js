var AppEHR = angular.module('AppEHR');

AppEHR.controller('Inventory', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllInventory','GetAllSuppliers','AddCategory','GetAllCategories','AddSupplier','GetSingleSupplier','UpdateSuppliers','GetSingleCategory','GetSingleStock','updateCategory','DeleteCategory','DeleteSupplier','AddInventory','AddProduct','DeleteInventory','GetSingleProduct','GetAllPharmacies','GetReorderLevel','updateReorderLevel','GetProduct','ProductUpdate','Countries','States','City','$timeout', function($scope, $rootScope,$window,$routeParams,GetAllInventory,GetAllSuppliers,AddCategory,GetAllCategories,AddSupplier,GetSingleSupplier,UpdateSuppliers,GetSingleCategory,GetSingleStock,updateCategory,DeleteCategory,DeleteSupplier,AddInventory,AddProduct,DeleteInventory,GetSingleProduct,GetAllPharmacies,GetReorderLevel,updateReorderLevel,GetProduct,ProductUpdate,Countries,States,City,$timeout){
	$rootScope.pageTitle = "EHR - Inventory";
	$scope.displayInfo = {};
	$rootScope.loader = "show";
	$scope.cat_unique={};
	$scope.selectedSupplier = {};
	GetAllInventory.get({
		token: $window.sessionStorage.token,
	}, GetAllInventorySuccess, GetAllInventoryFailure);

	function GetAllInventorySuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
                $('#noRecordFound').modal('show');
                return true;
            }
			$scope.InventoryLists = res.data;
		}
	}

	function GetAllInventoryFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	GetAllSuppliers.get({
		token: $window.sessionStorage.token

	}, GetAllSupplierSuccess, GetAllSupplierFailure);

	function GetAllSupplierSuccess(res) {
		if (res.status == true) {
			$scope.SuppplierLists = res.data;
		}
	}

	function GetAllSupplierFailure(error) {
		$('#internetError').modal('show');
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
			AddCategory.save(addCateogry, CategorySuccess, CategoryFailure);


		}
	}

	function CategorySuccess(res) {
		if (res.status == true) {
			$rootScope.loader = "hide";
			$scope.CategoryLists.push($scope.cat_unique);
			$timeout(function () {
				$('#addCategory').modal('hide');
			},500);
		}
	}

	function CategoryFailure(error) {
		$('#internetError').modal('show');
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
		}
	}

	function GetAllCategoriesFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

//Get Pharmacies


	GetAllPharmacies.get({
		token: $window.sessionStorage.token

	}, GetAllPharmaciesSuccess, GetAllPharmaciesFailure);

	function GetAllPharmaciesSuccess(res) {
		if (res.status == true) {
			$scope.PharmacyLists = res.data;
			console.log($scope.PharmacyLists)
		}
	}

	function GetAllPharmaciesFailure(error) {
		$('#internetError').modal('show');
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
			AddSupplier.save(addSupplier, SupplierSuccess, SupplierFailure);


		}
	}

	function SupplierSuccess(res) {
		if (res.status == true) {
			$rootScope.loader = "hide";
			$timeout(function () {
				$('#addSupplier').modal('hide');
			},500);

			GetAllSuppliers.get({
				token: $window.sessionStorage.token

			}, GetAllSupplierSuccess, GetAllSupplierFailure);

		}
	}

	function SupplierFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}


// Add Inventory
	$scope.AddInventory = function (inventory) {

		if (angular.equals({}, inventory) == false) {
			$scope.loader = 'show';
			//$scope.updateEncounterBtn = true;
			//console.log(inventory);
			var addInventory={
				token: $window.sessionStorage.token,
				//product_id	:inventory.product_id,
				pharmacy_id:inventory.pharmacy_id,
				manufacturer_id:inventory.manufacturer_id,
				//department_id:inventory.cat_id,
				supplier_id:inventory.supp_id,
				received_date:inventory.recvd_date,
				batch_no:inventory.batch_number,
				ref_no	:inventory.ref_no,
				expiry	:inventory.expiry_date,
				quantity:inventory.quantity,
				order_quantity:inventory.order_quantity,
				cost_per_item:inventory.price,
				pack:'pack',
				dept_id:inventory.group,
				group:inventory.group,
				product_name:inventory.product_name,
				trade_name:inventory.trade_name,
				route:inventory.route,
				reorder_level:inventory.reorder_level,
				cat_id:inventory.cat_id,
				strength:inventory.strength,
				dose_from:inventory.dose_from


			}
			var addProduct={
				token:$window.sessionStorage.token,
				department_id:inventory.group,
				product_name:inventory.product_name,
				trade_name:inventory.trade_name,
				route:inventory.route,
				reorder_level:inventory.reorder_level,
				cat_id:inventory.cat_id,
				strength:inventory.strength,
				dose_from:inventory.dose_from


			}







			AddInventory.save(addInventory, AddInventorySuccess, AddInventoryFailure);
			//AddProduct.save(addProduct, AddProductSuccess, AddProductFailure);



		}
	}

	function AddInventorySuccess(res) {
		if (res.status == true) {

			$rootScope.loader = "hide";

			$("#stock_det").hide();
			$(".add-drug-supplements").hide();
			$(".add-drug-others").hide();
			$(".inventory_detail").show();
			$(".inv_header").show();


			document.getElementById("addInv").reset();


			GetAllInventory.get({
				token: $window.sessionStorage.token,
			}, GetAllInventorySuccess, GetAllInventoryFailure);


		}
	}

	function AddInventoryFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	/*function AddProductSuccess(res) {
	 console.log(res);
	 if (res.status == true) {
	 $rootScope.loader = "hide";
	 console.log("in product now");


	 $("#stock_det").hide();
	 $(".add-drug-supplements").hide();
	 $(".add-drug-others").hide();
	 $(".inventory_detail").show();
	 $(".inv_header").show();


	 document.getElementById("addInv").reset();


	 GetAllInventory.get({
	 token: $window.sessionStorage.token,
	 }, GetAllInventorySuccess, GetAllInventoryFailure);

	 }
	 }

	 function AddProductFailure(error) {
	 console.log(error);
	 }
	 */






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



//// Update Invenbtory
	$scope.EditInventory = function (editInv) {

		if (angular.equals({}, category) == false) {
			$scope.hideLoader = 'show';

			console.log(editInv);
			/*var CategoryUpdate={
			 token: $window.sessionStorage.token,
			 cat_id:category.id,
			 cat_name:category.cat_name,
			 cat_desc:category.cat_desc,
			 cat_group:category.cat_group


			 }
			 console.log(updateCategory);
			 updateCategory.save(CategoryUpdate, UpdateCategorySuccess, UpdateCategoryFailure);*/

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
		$('#internetError').modal('show');
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

			GetAllSuppliers.get({
				token: $window.sessionStorage.token

			}, GetAllSupplierSuccess, GetAllSupplierFailure);


		}
	}

	function UpdateSupplierFailure(error) {
		$('#internetError').modal('show');
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
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}
	};



	//Delete Inventory



	$scope.DeleteInventory = function (stockID) {
		console.log(stockID);
		$scope.stockID = stockID;
		$rootScope.loader = "show";
		DeleteInventory.save({token: $window.sessionStorage.token, stock_id: stockID}, deleteStockInfoSuccess, deleteStockInfoFailure);

		function deleteStockInfoSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";
				console.log("Deleted");
				GetAllInventory.get({
					token: $window.sessionStorage.token,
				}, GetAllInventorySuccess, GetAllInventoryFailure);


			}
		}
		function deleteStockInfoFailure(error) {
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
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
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
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
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
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
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
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
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}
	};


	$scope.productDetail = function (productID) {
		console.log(productID);
		$scope.productID = productID;

		$(".inventory_detail").hide();
		$(".inv_header").hide();
		$("#stock_det").hide();
		$(".add-drug-supplements").hide();
		$(".edit_prod").show();



		$rootScope.loader = "show";
		GetProduct.get({token: $window.sessionStorage.token, product_id: productID}, getProductInfoSuccess, getProductInfoFailure);
		function getProductInfoSuccess(res) {
			if (res.status == true) {
				//console.log(res);
				$rootScope.loader = "hide";
				//$scope.SupplierSelected = true;
				$scope.editinventory = res.data;
				console.log($scope.editinventory);
				/*$(".inventory_detail").hide();
				 $("#stock_det").show();*/


			}
		}
		function getProductInfoFailure(error) {
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}
	};


// Get Product ReorderLevel


	$scope.StockSelectedReorder = function (productID) {
		console.log(productID);
		$scope.productID = productID;




		//$rootScope.loader = "show";



		GetReorderLevel.get({token: $window.sessionStorage.token, product_id: productID}, getReorderInfoSuccess, getReorderInfoFailure);
		function getReorderInfoSuccess(res) {
			if (res.status == true) {
				//console.log(res);
				$rootScope.loader = "hide";
				//$scope.SupplierSelected = true;
				$scope.selectedReorderProduct = res.data;
				console.log($scope.selectedReorderProduct);
				$('#update_reorder').modal('show');
				/*$(".inventory_detail").hide();
				 $("#stock_det").show();*/


			}
		}
		function getReorderInfoFailure(error) {
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}
	};


// Update Product ReorderLevel


	$scope.UpdateReorder = function (selectedInvnetory,productID) {
		console.log(productID);

		var ReorderUpdate={
			token: $window.sessionStorage.token,
			product_id:productID,
			reorder_level:selectedInvnetory.reorder_level
		}
		console.log(ReorderUpdate);
		updateReorderLevel.save(ReorderUpdate, ReorderUpdateSuccess, ReorderUpdateFailure);


		function ReorderUpdateSuccess(res) {
			console.log(res);
			console.log(res);
			if (res.status == true) {
				$rootScope.loader = "hide";
				$timeout(function () {
					$('#update_reorder').modal('hide');
				},500);
				GetAllInventory.get({
					token: $window.sessionStorage.token,
				}, GetAllInventorySuccess, GetAllInventoryFailure);

			}
		}

		function ReorderUpdateFailure(error) {
			$('#internetError').modal('show');
			console.log(error);
		}
	};

// Update Product


	$scope.EditProduct = function (editinventory) {
		console.log(editinventory);

		var updateProduct={
			token:$window.sessionStorage.token,
			product_id:editinventory.id,
			description:editinventory.description,
			group:editinventory.group,
			department_id:editinventory.department_id,
			product_name:editinventory.name,
			trade_name:editinventory.trade_name,
			route:editinventory.route,
			reorder_level:editinventory.reorder_level,
			cat_id:editinventory.cat_id,
			strength:editinventory.strength,
			dose_from:editinventory.dose_from


		}
		console.log(updateProduct);
		ProductUpdate.save(updateProduct, ProductUpdateSuccess, ProductUpdateFailure);


		function ProductUpdateSuccess(res) {

			console.log(res);
			if (res.status == true) {
				$rootScope.loader = "hide";

				$(".inventory_detail").show();
				$(".inv_header").show();
				//$("#stock_det").hide();
				//$(".add-drug-supplements").hide();
				$(".edit_prod").hide();


				GetAllInventory.get({
					token: $window.sessionStorage.token,
				}, GetAllInventorySuccess, GetAllInventoryFailure);

			}
		}

		function ProductUpdateFailure(error) {
			$('#internetError').modal('show');
			console.log(error);
		}

	};

	Countries.get({
		token: $window.sessionStorage.token,
	}, GetAllCountriesSuccess, GetAllCountriesFailure);


	function GetAllCountriesSuccess(res) {
		if (res.status == true) {

			$scope.Countries = res.data;
			console.log($scope.Countries);

		}
	}
	function GetAllCountriesFailure(error) {
		//$rootScope.loader = "show";
		$('#internetError').modal('show');
		console.log(error);
	}



	$scope.getStatesfromCountry= function(country_id){

		console.log(country_id);

		States.get({
			token: $window.sessionStorage.token,country_id:country_id,
		}, GetAllStatesSuccess, GetAllStatesFailure);

		function GetAllStatesSuccess(res) {
			if (res.status == true) {

				$scope.States = res.data;
				console.log($scope.States);

			}
		}
		function GetAllStatesFailure(error) {
			//$rootScope.loader = "show";
			$('#internetError').modal('show');
			console.log(error);
		}



	};

	$scope.getCitiesfromStates= function(state_id){

		console.log(state_id);

		City.get({
			token: $window.sessionStorage.token,state_id:state_id,
		}, GetAllCitiesSuccess, GetAllCitiesFailure);

		function GetAllCitiesSuccess(res) {
			if (res.status == true) {

				$scope.Cities = res.data;
				console.log($scope.Cities);

			}
		}
		function GetAllCitiesFailure(error) {
			//$rootScope.loader = "show";
			$('#internetError').modal('show');
			console.log(error);
		}



	};




}]);