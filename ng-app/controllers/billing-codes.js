var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing-codes', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllBillingCodes', 'deleteBillingCode', 'addBillingCode', 'editBillingCode', 'GetBillingCode', 'GetAllBillingCategories', 'GetAllTaxRates','deleteBillingCategory', 'addBillingCategory', 'editBillingCategory', 'GetBillingCategory', '$timeout', function($scope, $rootScope,$window,$routeParams,GetAllBillingCodes,deleteBillingCode,addBillingCode,editBillingCode,GetBillingCode,GetAllBillingCategories,GetAllTaxRates,deleteBillingCategory,addBillingCategory,editBillingCategory,GetBillingCategory,$timeout){
	$rootScope.pageTitle = "EHR - Billing Codes";
    $rootScope.loader = "show";
	$scope.itemsPerPage = 15;
	$scope.curPage = 0;
	$scope.curCatPage = 0;
	$scope.pageSize = 15;
	$scope.deleteBillingCodeId = 0;
	GetAllBillingCodes.get({
		token: $window.sessionStorage.token,
		offset: 0, limit: $scope.itemsPerPage
	}, GetAllBillingCodesSuccess, GetAllBillingCodesFailure);

	function GetAllBillingCodesSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.BillingCodeLists = res.data;
			$scope.billingCodesCount = res.count;
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}
	function GetAllBillingCodesFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.numberOfPages = function() {
		return Math.ceil($scope.billingCodesCount / $scope.pageSize);
	};

	$scope.paginationNext = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllBillingCodes.get({
			token: $window.sessionStorage.token,
			offset: (pageSize * curPage), limit: $scope.itemsPerPage
		}, GetAllBillingCodesSuccess, GetAllBillingCodesFailure);
	};

	$scope.paginationPrev = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllBillingCodes.get({
			token: $window.sessionStorage.token,
			offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
		}, GetAllBillingCodesSuccess, GetAllBillingCodesFailure);
	};

	$scope.confirmRemoveBillingCode = function(id){
		$scope.deleteBillingCodeId = id;
		$('#confirmation').modal('show');
	};
	$scope.removeBillingCode = function(){
		$rootScope.loader = "show";
		deleteBillingCode.get({
			token: $window.sessionStorage.token,
            billing_code_id : $scope.deleteBillingCodeId
		}, deleteBillingCodeSuccess, deleteBillingCodeFailure)
	};

	function deleteBillingCodeSuccess(res){
		if(res.status == true){
			$scope.deleteBillingCodeId = 0;
			$('#confirmation').modal('hide');
			GetAllBillingCodes.get({
				token: $window.sessionStorage.token
			}, GetAllBillingCodesSuccess, GetAllBillingCodesFailure);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}

	function deleteBillingCodeFailure(error){
		console.log(error);
		$('#confirmation').modal('hide');
		$('#internetError').modal('show');
	}

	$scope.createBillingCode = function (billingCodeData){
            var val = billingCodeData.charge;
            var myString = val.substr(val.indexOf(".") + 1)
            if(myString == ""){
                val = val + "00"
            }
            
		addBillingCode.save({
			token : $window.sessionStorage.token,
            code : billingCodeData.code,
            description : billingCodeData.description,
            charge : val,
            category_id : billingCodeData.category_id,
            tax : 0//billingCodeData.tax
		},addBillingCodeSuccess,addBillingCodeFailure);
	};
	function addBillingCodeSuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addBillingCodeBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.billingCodeData = {};
			$scope.submitted = false;
			$timeout(function(){
				$scope.message = false;
				$('#addcode').modal('hide');
				$scope.errorMessage = "";
			},1500);
			GetAllBillingCodes.get({
				token: $window.sessionStorage.token
			}, GetAllBillingCodesSuccess, GetAllBillingCodesFailure);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
			$scope.hideLoader = "hide";
			$scope.addBillingCodeBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addBillingCodeFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	$scope.billingCodeDetail = function(id){
		GetBillingCode.get({
			token: $window.sessionStorage.token,
            billing_code_id : id
		}, GetAllBillingCodeSuccess, GetAllBillingCodeFailure);
	};
	function GetAllBillingCodeSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			$scope.editBillingCodeData = res.data;
			setTimeout(function () {
				$('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
			},100);
			$('#editcode').modal('show');
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}
	function GetAllBillingCodeFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.updateBillingCode = function(editBillingCodeData){
		$rootScope.loader = "show";
                 var val = editBillingCodeData.charge;
            var myString = val.substr(val.indexOf(".") + 1)
            if(myString == ""){
                val = val + "00"
            }
		editBillingCode.save({
			token : $window.sessionStorage.token,
            billing_code_id : editBillingCodeData.id,
            code : editBillingCodeData.code,
            description : editBillingCodeData.description,
            charge : val,
            category_id : editBillingCodeData.category_id,
            tax : 0//editBillingCodeData.tax
		},editBillingCodeSuccess,editBillingCodeFailure);
	};

	function editBillingCodeSuccess(res){ // on success
		if (res.status == true) {
			$rootScope.loader = 'hide';
			$scope.message = true;
			$scope.updateBillingCodeBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			GetAllBillingCodes.get({
				token: $window.sessionStorage.token
			}, GetAllBillingCodesSuccess, GetAllBillingCodesFailure);
			$timeout(function(){
				$scope.message = false;
				$scope.submitted = false;
				$('#editcode').modal('hide');
				$scope.errorMessage = "";
				$scope.editBillingCodeData = {};
			},1500);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
			$rootScope.loader = "hide";
			$scope.updateBillingCodeBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function editBillingCodeFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	GetAllBillingCategories.get({
		token: $window.sessionStorage.token,
		offset : 0,
		limit: 0
	}, GetAllBillingCategoriesSuccess, GetAllBillingCategoriesFailure);

	function GetAllBillingCategoriesSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.AllCategoryLists = res.data;
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}

	GetAllBillingCategories.get({
        token: $window.sessionStorage.token,
        offset : 0,
		limit: $scope.itemsPerPage
    }, GetBillingCategoriesSuccess, GetAllBillingCategoriesFailure);

    function GetBillingCategoriesSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
            $scope.CategoryLists = res.data;
            $scope.CategoriesCount = res.count;
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }
    function GetAllBillingCategoriesFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    GetAllTaxRates.get({
        token: $window.sessionStorage.token,
        offset : 0,
        limit : 0
    }, GetAllTaxRatesSuccess, GetAllTaxRatesFailure);

    function GetAllTaxRatesSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
            $scope.TaxRatesLists = res.data;
            $scope.CategoriesCount = res.count;
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }
    function GetAllTaxRatesFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

	$scope.numberOfPagesCategories = function() {
		return Math.ceil($scope.CategoriesCount / $scope.pageSize);
	};

	$scope.paginationNextCategories = function(pageSize, curCatPage){
		$rootScope.loader = "show";
		GetAllBillingCategories.get({
			token: $window.sessionStorage.token,
			offset: (pageSize * curCatPage), limit: $scope.itemsPerPage
		}, GetAllBillingCategoriesSuccess, GetAllBillingCategoriesFailure);
	};

	$scope.paginationPrevCategories = function(pageSize, curCatPage){
		$rootScope.loader = "show";
		GetAllBillingCategories.get({
			token: $window.sessionStorage.token,
			offset: (pageSize - 1) * curCatPage, limit: $scope.itemsPerPage
		}, GetAllBillingCategoriesSuccess, GetAllBillingCategoriesFailure);
	};

	$scope.confirmRemoveBillingCategory = function(id){
		$scope.deleteBillingCategoryId = id;
		$('#confirmation').modal('show');
	};
	$scope.removeBillingCategory = function(){
		$rootScope.loader = "show";
		deleteBillingCategory.get({
			token: $window.sessionStorage.token,
			category_id : $scope.deleteBillingCategoryId
		}, deleteBillingCategorySuccess, deleteBillingCategoryFailure)
	};

	function deleteBillingCategorySuccess(res){
		if(res.status == true){
			$scope.deleteBillingCategoryId = 0;
			$('#confirmation').modal('hide');
			GetAllBillingCategories.get({
				token: $window.sessionStorage.token
			}, GetAllBillingCategoriesSuccess, GetAllBillingCategoriesFailure);
		}
	}

	function deleteBillingCategoryFailure(error){
		console.log(error);
		$('#confirmation').modal('hide');
		$('#internetError').modal('show');
	}

	$scope.cancelDelete = function(){
		$scope.deleteBillingCodeId = 0;
		$scope.deleteBillingCategoryId = 0;
	};


	$scope.createBillingCategory = function (billingCategoryData){
		addBillingCategory.save({
			token : $window.sessionStorage.token,
			name : billingCategoryData.name,
			description : billingCategoryData.description
		},addBillingCategorySuccess,addBillingCategoryFailure);
	};
	function addBillingCategorySuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addBillingCategoryBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.billingCategoryData = {};
			$scope.submitted = false;
			$timeout(function(){
				$scope.message = false;
				$('#addcategory').modal('hide');
				$scope.errorMessage = "";
			},1500);
			GetAllBillingCategories.get({
				token: $window.sessionStorage.token,
				offset : 0,
				limit: 0
			}, GetAllBillingCategoriesSuccess, GetAllBillingCategoriesFailure);
			GetAllBillingCategories.get({
				token: $window.sessionStorage.token
			}, GetBillingCategoriesSuccess, GetAllBillingCategoriesFailure);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
			$scope.hideLoader = "hide";
			$scope.addBillingCategoryBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addBillingCategoryFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	$scope.billingCategoryDetail = function(id){
		GetBillingCategory.get({
			token: $window.sessionStorage.token,
			category_id : id
		}, GetAllBillingCategorySuccess, GetAllBillingCategoryFailure);
	};
	function GetAllBillingCategorySuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			$scope.editBillingCategoryData = res.data;
			setTimeout(function () {
				$('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
			},100);
			$('#editcategory').modal('show');
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}
	function GetAllBillingCategoryFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.updateBillingCategory = function(editBillingCategoryData){
		$rootScope.loader = "show";
		editBillingCategory.save({
			token : $window.sessionStorage.token,
			category_id : editBillingCategoryData.id,
			name : editBillingCategoryData.name,
			description : editBillingCategoryData.description
		},editBillingCategorySuccess,editBillingCategoryFailure);
	};

	function editBillingCategorySuccess(res){ // on success
		if (res.status == true) {
			$rootScope.loader = 'hide';
			$scope.message = true;
			$scope.updateBillingCategoryBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			GetAllBillingCategories.get({
				token: $window.sessionStorage.token,
				offset : 0,
				limit: 0
			}, GetAllBillingCategoriesSuccess, GetAllBillingCategoriesFailure);
			GetAllBillingCategories.get({
				token: $window.sessionStorage.token
			}, GetBillingCategoriesSuccess, GetAllBillingCategoriesFailure);
			$timeout(function(){
				$scope.message = false;
				$scope.submitted = false;
				$('#editcategory').modal('hide');
				$scope.errorMessage = "";
				$scope.editBillingCategoryData = {};
			},1500);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
			$rootScope.loader = "hide";
			$scope.updateBillingCategoryBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function editBillingCategoryFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

}]);
