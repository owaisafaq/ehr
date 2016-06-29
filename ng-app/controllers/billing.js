var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing', ['$scope', '$rootScope','$window','$routeParams','GetAllBills','GetPatientInfo', function($scope, $rootScope,$window,$routeParams,GetAllBills,GetPatientInfo){
	$rootScope.pageTitle = "EHR - Billing";
	$scope.BillListings={};
	$scope.selectedPatient = {};

	GetAllBills.get({
		token: $window.sessionStorage.token,
	}, GetAllBillsSuccess, GetAllBillsFailure);

	function GetAllBillsSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$scope.BillListings = res.data;
			console.log($scope.BillListings)
		}
	}

	function GetAllBillsFailure(error) {
		console.log(error);
	}


	$scope.SelectedPatient = function(patient_id){

		console.log(patient_id);
		$scope.patient_id = patient_id;

		//$rootScope.loader = "show";
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patient_id}, getPatientInfoSuccess, getPatientInfoFailure);
		function getPatientInfoSuccess(res) {
			if (res.status == true) {
				//$rootScope.loader = "hide";
				$scope.selectedPatient = res.data;
				console.log($scope.selectedPatient);

			}
		}
		function getPatientInfoFailure(error) {
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









}]);