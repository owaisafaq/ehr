var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsTaxRates', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllTaxRates', 'deleteTaxRate', 'addTaxRate', 'editTaxRate', 'GetTaxRate', '$timeout', function($scope, $rootScope,$window,$routeParams,GetAllTaxRates,deleteTaxRate,addTaxRate,editTaxRate,GetTaxRate,$timeout){
	$rootScope.pageTitle = "EHR - Tax Rates";
	$rootScope.loader = "show";
	$scope.itemsPerPage = 15;
	$scope.curPage = 0;
	$scope.pageSize = 15;
	$scope.deleteTaxRateId = 0;
	GetAllTaxRates.get({
		token: $window.sessionStorage.token,
		offset: ($scope.pageSize * $scope.curPage), limit: $scope.itemsPerPage
	}, GetAllTaxRatesSuccess, GetAllTaxRatesFailure);

	function GetAllTaxRatesSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
			$scope.TaxRateLists = res.data;
			$scope.taxRatesCount = res.count;
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}
	function GetAllTaxRatesFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.numberOfPages = function() {
		return Math.ceil($scope.taxRatesCount / $scope.pageSize);
	};

	$scope.paginationNext = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllTaxRates.get({
			token: $window.sessionStorage.token,
			offset: (pageSize * curPage), limit: $scope.itemsPerPage
		}, GetAllTaxRatesSuccess, GetAllTaxRatesFailure);
	};

	$scope.paginationPrev = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllTaxRates.get({
			token: $window.sessionStorage.token,
			offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
		}, GetAllTaxRatesSuccess, GetAllTaxRatesFailure);
	};

	$scope.confirmRemoveTaxRate = function(id){
		$scope.deleteTaxRateId = id;
		$('#confirmation').modal('show');
	};
	$scope.removeTaxRate = function(){
		$rootScope.loader = "show";
		deleteTaxRate.get({
			token: $window.sessionStorage.token,
			tax_rate_id : $scope.deleteTaxRateId
		}, deleteTaxRateSuccess, deleteTaxRateFailure)
	};

	function deleteTaxRateSuccess(res){
		if(res.status == true){
			$scope.deleteTaxRateId = 0;
			$('#confirmation').modal('hide');
			GetAllTaxRates.get({
				token: $window.sessionStorage.token
			}, GetAllTaxRatesSuccess, GetAllTaxRatesFailure);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}

	function deleteTaxRateFailure(error){
		console.log(error);
		$('#confirmation').modal('hide');
		$('#internetError').modal('show');
	}

	$scope.createTaxRate = function (taxRateData){
		addTaxRate.save({
			token : $window.sessionStorage.token,
			name : taxRateData.name,
			rate : taxRateData.rate
		},addTaxRateSuccess,addTaxRateFailure);
	};
	function addTaxRateSuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addTextRateBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.taxRateData = {};
			$scope.submitted = false;
			$timeout(function(){
				$scope.message = false;
				$('#addtax').modal('hide');
				$scope.errorMessage = "";
			},1500);
			GetAllTaxRates.get({
				token: $window.sessionStorage.token
			}, GetAllTaxRatesSuccess, GetAllTaxRatesFailure);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
			$scope.hideLoader = "hide";
			$scope.addTextRateBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addTaxRateFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	$scope.taxRateDetail = function(id){
		GetTaxRate.get({
			token: $window.sessionStorage.token,
			tax_rate_id : id
		}, GetAllTaxRateSuccess, GetAllTaxRateFailure);
	};
	function GetAllTaxRateSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			$scope.editTaxRateData = res.data;
			$('#edittax').modal('show');
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}
	function GetAllTaxRateFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.updateTaxRate = function(editTaxRateData){
		$rootScope.loader = "show";
		editTaxRate.save({
			token : $window.sessionStorage.token,
			tax_rate_id : editTaxRateData.id,
			name : editTaxRateData.name,
			rate : editTaxRateData.rate
		},editTaxRateSuccess,editTaxRateFailure);
	};

	function editTaxRateSuccess(res){ // on success
		if (res.status == true) {
			$rootScope.loader = 'hide';
			$scope.message = true;
			$scope.updateTextRateBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			GetAllTaxRates.get({
				token: $window.sessionStorage.token
			}, GetAllTaxRatesSuccess, GetAllTaxRatesFailure);
			$timeout(function(){
				$scope.message = false;
				$scope.submitted = false;
				$('#edittax').modal('hide');
				$scope.errorMessage = "";
				$scope.editTaxRateData = {};
			},1500);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
			$rootScope.loader = "hide";
			$scope.updateTextRateBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function editTaxRateFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}
}]);
