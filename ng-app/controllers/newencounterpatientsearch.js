var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterPatientSearchController', ['$scope', '$rootScope', '$window', 'AddEncounter', '$timeout', 'GetVisits', function($scope, $rootScope, $window, AddEncounter, $timeout, GetVisits){
	$rootScope.pageTitle = "EHR - New Encounter Patient Search";
	$scope.addEncounter = {};
	$scope.allEncounters = [];
	$scope.displayInfo = {};
	$scope.closePopUp = true;
	$scope.patientInfo = false;
	GetVisits.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);
	/*$scope.gridOptions = {
        paginationPageSizes: [20, 50, 75],
        paginationPageSize: 20,
        enableVerticalScrollbar: 0,
        enableHorizontalScrollbar: 0,
        columnDefs: $scope.columns,
        enableColumnMenus: false,
    };*/
    console.log($window.sessionStorage.patient_id);
    $scope.gridOptions = {
	    enableFiltering: false,
	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	      $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
	    },columnDefs: [
		    { field: 'PATIENT ID' },
		    { field: 'FULL NAME'}
		]
	};

    $scope.filter = function() {
	    $scope.gridApi.grid.refresh();
	};
	function dropDownSuccess(res){
		if(res.status == true){
			$scope.allEncounters = res.data;
			console.log($scope.allEncounters);
		}
	}

	function dropDownFailed(error){
		console.log(error);
	}

	$scope.encounterSelected = function(index){
		console.log($scope.allEncounters[index]);
		$scope.displayInfo = $scope.allEncounters[index];
		$scope.dataStrip = "custom-card";
	}

	$scope.openCreateEncounter = function(){
		$scope.message = false;
		$scope.closePopUp = false;
		$scope.addEncounter = {};
		/*$scope.addEncounter.department = '';
		$scope.addEncounter.class = '';
		$scope.addEncounter.type = '';
		$scope.addEncounter.wts = '';*/
		console.log($scope.addEncounter.department);
	}

	$scope.validateEncounterForm = function(addEncounter){
		console.log(addEncounter);
		if(angular.equals({}, addEncounter) == false){
			AddEncounter.save({
				token: $window.sessionStorage.token, 
				patient_id: $window.sessionStorage.patient_id,
				department_id: addEncounter.department,
				encounter_class: addEncounter.class,
				encounter_type: addEncounter.type,
				whom_to_see: addEncounter.wts
			}, encounterSuccess, encounterFailed);
		}else{
			console.log(0);
		}
	}

	$scope.closeAddEncounter = function(){
		$scope.closePopUp = true;
	}

	function encounterSuccess(res){
		console.log(res);
		if(res.status == true){
			$scope.messageType = "alert-success";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-check";
			$scope.message = true;
			$timeout(function(){$scope.closePopUp = true;}, 2000);
		}else{
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
			$timeout(function(){$scope.message = false;}, 2000);
		}
	}

	function encounterFailed(error){
		console.log(error);
	}
}]);