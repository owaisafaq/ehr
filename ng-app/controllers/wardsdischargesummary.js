var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsDischargeSummaryController', ['$scope', '$rootScope','$window', 'AdmitPatient', function($scope, $rootScope, $window, AdmitPatient){
	$rootScope.pageTitle = "EHR - Wards Discharge Summary";
	$scope.allAdmitPatient = [];
	$rootScope.loader = "show";
	$scope.itemsPerPage = 5;
	$scope.action = "";
	$scope.disabledButton = true;
	AdmitPatient.get({
		token: $window.sessionStorage.token,
		offset: 0,
		limit: $scope.itemsPerPage
	}, admitPatientSucess, admitPatientFailure);
	function admitPatientSucess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			$scope.allAdmitPatient = res.data;
			$scope.admitCount = res.count;
		}
	}
	function admitPatientFailure(error){
		console.log(error);
	}

	$scope.admitPatientSelected = function(){
		$scope.disabledButton = false;
	}

}]);