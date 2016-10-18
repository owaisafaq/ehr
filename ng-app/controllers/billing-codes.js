var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing-codes', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllBillingCodes', 'deleteBillingCode', 'addBillingCode', 'editBillingCode', 'GetBillingCode', 'GetAllCategories', 'GetAllTaxRates', '$timeout', function($scope, $rootScope,$window,$routeParams,GetAllBillingCodes,deleteBillingCode,addBillingCode,editBillingCode,GetBillingCode,GetAllCategories,GetAllTaxRates,$timeout){
	$rootScope.pageTitle = "EHR - Billing Codes";
    $rootScope.loader = "show";
	$scope.itemsPerPage = 15;
	$scope.curPage = 0;
	$scope.pageSize = 15;
	$scope.deleteBillingCodeId = 0;
	GetAllBillingCodes.get({
		token: $window.sessionStorage.token
	}, GetAllBillingCodesSuccess, GetAllBillingCodesFailure);

	function GetAllBillingCodesSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.BillingCodeLists = res.data;
			$scope.billingCodesCount = res.count;
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
		}
	}

	function deleteBillingCodeFailure(error){
		console.log(error);
		$('#confirmation').modal('hide');
		$('#internetError').modal('show');
	}

	$scope.createBillingCode = function (billingCodeData){
		addBillingCode.save({
			token : $window.sessionStorage.token,
            code : billingCodeData.code,
            description : billingCodeData.description,
            charge : billingCodeData.charge,
            category_id : billingCodeData.category_id,
            tax : billingCodeData.tax
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
			$('#editcode').modal('show');
		}
	}
	function GetAllBillingCodeFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.updateBillingCode = function(editBillingCodeData){
		$rootScope.loader = "show";
		editBillingCode.save({
			token : $window.sessionStorage.token,
            billing_code_id : editBillingCodeData.id,
            code : editBillingCodeData.code,
            description : editBillingCodeData.description,
            charge : editBillingCodeData.charge,
            category_id : editBillingCodeData.category_id,
            tax : editBillingCodeData.tax
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

    GetAllCategories.get({
        token: $window.sessionStorage.token,
        offset : 0,
        limit : 0
    }, GetAllCategoriesSuccess, GetAllCategoriesFailure);

    function GetAllCategoriesSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
            $scope.CategoryLists = res.data;
            $scope.CategoriesCount = res.count;
        }
    }
    function GetAllCategoriesFailure(error) {
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
        }
    }
    function GetAllTaxRatesFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }
}]);
