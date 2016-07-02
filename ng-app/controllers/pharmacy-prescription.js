var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacyPrescription', ['$scope', '$rootScope', '$window', 'PharmacyPrescription', function($scope, $rootScope, $window, PharmacyPrescription){
	$rootScope.pageTitle = "EHR - Pharmacy";
	$scope.action = '';
	$scope.hideOptionsStrip = true;

	$scope.currentPage = 1;
    $scope.numPerPage = 15;
    $scope.maxSize = 5;

	PharmacyPrescription.get({token: $window.sessionStorage.token}, pharmanyListSuccess, pharmanyListFailure);

	function pharmanyListSuccess(res){
		if(res.status ==  true){
			$scope.allPharmacies = res.data;
		}
	}

	function pharmanyListFailure(error){
		console.log(error);
	}

	$scope.checkPrescription = function(Pid, Eid){
		console.log(Pid);
		console.log(Eid);
		$scope.patientID = Pid;
		$scope.encounterID = Eid;
		$scope.hideOptionsStrip = false;
	}

	$scope.goToPrescription = function(){
		console.log($scope.patientID + "/" + $scope.encounterID);
		$window.location.href = "#/pharmacy-view/" + $scope.patientID + "/" + $scope.encounterID;
	}

	/*$scope.search = function (row) {
        return !!((row.first_name.indexOf($scope.query || '') !== -1 || row.patient_id.indexOf($scope.query || '') !== -1 || row.visit_id.indexOf($scope.query || '') !== -1));
    };*/

    $scope.search = function(item){ // search data by patient name or partient id
        if($scope.query == undefined){
            return true;
        }else{
            if(item.patient_id.toLowerCase().indexOf($scope.query.toLowerCase()) != -1 || item.first_name.toLowerCase().indexOf($scope.query.toLowerCase()) != -1 || item.visit_id.toLowerCase().indexOf($scope.query.toLowerCase()) != -1){
                return true;
            }
        }
    };

}]);