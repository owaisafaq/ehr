var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterPatientSearchController', ['$scope', '$rootScope', '$window', 'AddEncounter', '$timeout', 'GetVisits', '$rootScope', 'GetPatientInfo', 'DropDownData', '$http', function($scope, $rootScope, $window, AddEncounter, $timeout, GetVisits, $rootScope, GetPatientInfo, DropDownData, $http){
	$rootScope.pageTitle = "EHR - New Encounter Patient Search";
	$scope.addEncounter = {};
	$scope.allEncounters = [];
	$scope.displayInfo = {};
	$scope.closePopUp = true;
	$scope.patientInfo = false;
	$scope.hideLoader = "hide";
	$scope.disabledEncounterButton = true;
	//$rootScope.loader = "show";
	//GetVisits.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, getVisitsSuccess, getVisitsFailed);
	DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);

	function dropDownSuccess(res){
		if(res.status == true){
			$scope.encountersDropdownData = res.data;
		}
	}

	function dropDownFailed(error){
		console.log(error);
	}

	// on change
	$scope.getSearchPatient = function(string){
		console.log(string);
		$rootScope.loader = "show";
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: string}, getPatientSuccess, getPatientFailure);
		function getPatientSuccess(res){
			console.log(res.data);
			if(res.status == true){
				$scope.disabledEncounterButton = false;
				$scope.patientInfo = true;
				$rootScope.loader = "hide";
				$scope.displayInfo.first_name = res.data.first_name;
				$scope.displayInfo.patient_id = res.data.id;
				$scope.displayInfo.age = res.data.age;
				$scope.displayInfo.sex = res.data.sex;
				$scope.displayInfo.marital_status = res.data.marital_status;
			}
		}

		function getPatientFailure(error){
			console.log(error);
		}
	}
	/*$scope.gridOptions = {
        paginationPageSizes: [20, 50, 75],
        paginationPageSize: 20,
        enableVerticalScrollbar: 0,
        enableHorizontalScrollbar: 0,
        columnDefs: $scope.columns,
        enableColumnMenus: false,
    };*/
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
	function getVisitsSuccess(res){
		if(res.status == true){
			$scope.allEncounters = res.data;
			$rootScope.loader = "hide";
		}
	}

	function getVisitsFailed(error){
		console.log(error);
	}

	$scope.encounterSelected = function(index){
		$rootScope.loader = "show";
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: $scope.allEncounters[index].id}, getPatientSuccess, getPatientFailure);
		$scope.displayInfo = $scope.allEncounters[index];
		$scope.dataStrip = "custom-card";
	}

	function getPatientSuccess(res){
		$scope.patientInfo = true;
		$rootScope.loader = "hide";
		if(res.status == true){
			$scope.displayInfo.first_name = res.data.first_name;
			$scope.displayInfo.patient_id = res.data.id;
			$scope.displayInfo.age = res.data.age;
			$scope.displayInfo.gender = res.data.sex;
			$scope.displayInfo.marital_status = res.data.marital_status;
		}
	}

	function getPatientFailure(error){
		console.log(error);
	}

	$scope.openCreateEncounter = function(){
		$scope.message = false;
		$scope.closePopUp = false;
		if(angular.equals({}, $scope.addEncounter) == false){
			$scope.addEncounter = {};
		}		
		/*$scope.addEncounter.department = '';
		$scope.addEncounter.class = '';
		$scope.addEncounter.type = '';
		$scope.addEncounter.wts = '';*/
	}

	$scope.validateEncounterForm = function(addEncounter){
		console.log($scope.displayInfo.patient_id);
		if(angular.equals({}, addEncounter) == false){
			$scope.hideLoader = "show";
			$scope.addEncounterBtn = true;
			AddEncounter.save({
				token: $window.sessionStorage.token, 
				patient_id: $scope.displayInfo.patient_id,
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
			$scope.addEncounterBtn = false;
			$scope.hideLoader = "hide";
			$scope.messageType = "alert-success";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-check";// 
			$scope.message = true;
			$timeout(function(){$scope.closePopUp = true; $window.location.href = '#/new-encounter-encounter-list/'+$scope.displayInfo.patient_id;}, 2000);
		}else{
			$scope.hideLoader = "hide";
			$scope.addEncounterBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
			$timeout(function(){$scope.message = false;}, 2000);
		}
	}

	function encounterFailed(error){
		$scope.addEncounterBtn = false;
		$scope.hideLoader = "hide";
		console.log(error);
	}
}]);