var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsDischargeSummaryController', ['$scope', '$rootScope','$window', 'AdmitPatient', 'GetBedsByWard', 'GetAllWardsDropDown', 'MovePatient', 'DropDownData', 'DischargePatient', 'DischargeSummaryByWards', 'UpdateDischargeDate', function($scope, $rootScope, $window, AdmitPatient, GetBedsByWard, GetAllWardsDropDown, MovePatient, DropDownData, DischargePatient, DischargeSummaryByWards, UpdateDischargeDate){
	$rootScope.pageTitle = "EHR - Wards Discharge Summary";
	$scope.allAdmitPatient = [];
	$scope.dischargeSummary = [];
	$rootScope.loader = "show";
	$scope.itemsPerPage = 5;
	$scope.action = "";
	$scope.move = {};
	$scope.move.bedNumber = "";
	$scope.disabledButton = true;
	$scope.itemsPerPage = 5;
	$scope.edit = [];
	$scope.SaveButton = true;
	$scope.editbutton = true;
	$scope.updateDischargeDate = [];
	$(".select-bed-dropdown").hide();
	AdmitPatient.get({
		token: $window.sessionStorage.token,
		offset: 0,
		limit: $scope.itemsPerPage
	}, admitPatientSucess, admitPatientFailure);
	function admitPatientSucess(res){
		$rootScope.loader = "hide";
		console.log(res);
		if(res.status == true){
			/*if(res.data.length == 0){
				$scope.modalHeading = "Result";
				$scope.modalMessage = "No Result Found";
				$('#noResultFound').modal('show');
			}*/
			for(var m = 0; m < res.data.length; m++){
				var bb = res.data[m].expected_discharge_date.split(' ');
				res.data[m].expected_discharge_date = bb[0];
			}
			$scope.allAdmitPatient = res.data;
			$scope.admitCount = res.count;
		}
	}
	function admitPatientFailure(error){
		console.log(error);
		$('#internetError').modal('show');
	}
	DischargeSummaryByWards.get({token: $window.sessionStorage.token}, dischargeSummarySuccess, dischargeSummaryFailed);
	function dischargeSummarySuccess(res){
		console.log(res);
		if(res.status == true){
			$scope.dischargeSummary = res.data;
		}
	}

	function dischargeSummaryFailed(error){
		console.log(error);
	}

	GetAllWardsDropDown.get({
		token: $window.sessionStorage.token
	}, wardsDropDownSuccess, wardsDropDownFailure);

	function wardsDropDownSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			$scope.wardDropdown = res.data;
		}
	}
	function wardsDropDownFailure(error){
		console.log(error);
		$('#internetError').modal('show');
	}

	DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);
	$scope.encountersDropdownData = [];
	function dropDownSuccess(res){
		if(res.status == true){
			$scope.encountersDropdownData = res.data;
		}
	}

	function dropDownFailed(error){
		console.log(error);
		$('#internetError').modal('show');
	}

	$scope.admitPatientSelected = function(index, PID){
		if($scope.editbutton == false){
			$scope.SaveButton = true;
		}else{
			$scope.SaveButton = true;
			$scope.editbutton = false;
		}
		$scope.PID = PID;
		$scope.disabledButton = false;
		
		$scope.admitIndex = index;
		$scope.selectedPatientToMove = $scope.allAdmitPatient[index];
		for(var h=0; h < $scope.allAdmitPatient.length; h++){
			if($scope.allAdmitPatient[h].id != PID){
				$scope.edit[h] = false;
			}
		}
		//var exData = $scope.selectedPatientToMove.expected_discharge_date.split(' ');
		//$scope.selectedPatientToMove.expected_discharge_date = exData[1].slice(0, -3);
		setTimeout(function () {
            $('select').not('.search-ajax').select2({minimumResultsForSearch: Infinity});
        }, 1000)
        $scope.admitID = $scope.selectedPatientToMove.id;
	}

	$scope.wardSelected = function(wid){
		GetBedsByWard.get({
			token: $window.sessionStorage.token,
			ward_id: wid
		}, getBedsWardSuccess, getBedsWardFailure);
		function getBedsWardSuccess(res){
			if(res.status == true){
				$scope.noOFBeds = res.data;
			}
		}
		function getBedsWardFailure(error){
			console.log(error);
			$('#internetError').modal('show');
		}
	}

	$scope.bedSelected = function(bedID){
		$scope.move.bedNumber = bedID;
	}

	$scope.movePatient = function(dataToBeAdded, selectedPatientToMove){
		$rootScope.loader = "show";
		MovePatient.save({
			token: $window.sessionStorage.token,
			patient_id: selectedPatientToMove.patient_id,
			department_id: dataToBeAdded.CPN,
			current_ward_id: selectedPatientToMove.ward,
			ward_id: dataToBeAdded.ward,
			bed_id: dataToBeAdded.bedNumber,
			current_bed_id: selectedPatientToMove.bed,
			notes: dataToBeAdded.notes,
		}, movePatientSuccess, movePatientFailure);

		function movePatientSuccess(res){
			if(res.status == true){
				$rootScope.loader = "hide";
				$scope.editbutton = true;
				$scope.move = {};
				$scope.submitted = false;
				$scope.modalHeading = "Result";
				$scope.modalMessage = "Patient Moved Successfully";
				$('#movepatient').modal('hide');
				$('#noResultFound').modal('show');
				$scope.disabledButton = true;
				AdmitPatient.get({
					token: $window.sessionStorage.token,
					offset: 0,
					limit: $scope.itemsPerPage
				}, admitPatientSucess, admitPatientFailure);
			}
		}
		function movePatientFailure(error){
			console.log(error);
			$('#internetError').modal('show');
		}
	}

	$scope.addformsubmission = function(){
        if($scope.submitted == true && $scope.moveForm.$invalid == true ){
            return true;
        }
        return false;
    };

    $(".ward-button").on('click', function(){
    	$(".select-bed-dropdown").toggle();
    });

    $scope.curPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.admitCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        AdmitPatient.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, admitPatientSucess, admitPatientFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        AdmitPatient.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, admitPatientSucess, admitPatientFailure);
    }

    $scope.dischagePatient = function(){
    	$rootScope.loader = "show";
    	DischargePatient.save({token: $window.sessionStorage.token, patient_id: $scope.admitID}, dischargeSuccess, dischargeFailure);
    }
    function dischargeSuccess(res){
    	$rootScope.loader = "hide";
    	$('#dischargePatient').modal('hide');
    	if(res.status == true){
    		$scope.modalHeading = "Result";
    		$scope.modalMessage = "Patient Discharge Successfully";
    		$scope.disabledButton = true;
    		$('#noResultFound').modal('show');
    		AdmitPatient.get({
				token: $window.sessionStorage.token,
				offset: 0,
				limit: $scope.itemsPerPage
			}, admitPatientSucess, admitPatientFailure);
    	}
    }
    function dischargeFailure(error){
    	console.log(error);
    }

    $scope.editAdmitPatient = function(){
    	console.log($scope.admitIndex);
    	$scope.SaveButton = false;
    	$scope.editbutton = true;
    	$scope.edit[$scope.admitIndex] = true;
    }

    $scope.updateAdmitPatient = function(){
    	$rootScope.loader = "show";
    	console.log($scope.updateDischargeDate[$scope.admitIndex], $scope.admitIndex);
    	UpdateDischargeDate.save({
    		token: $window.sessionStorage.token,
    		patient_admitted_id: $scope.PID,
    		expected_discharge_date: $scope.updateDischargeDate[$scope.admitIndex],
    	}, updateAdmitPatientSuccess, updateAdmitPatientFailure);
    }

    function updateAdmitPatientSuccess(res){
    	if(res.status == true){
    		console.log(res);
    		$rootScope.loader = "hide";
    		$scope.SaveButton = true;
    		$scope.editbutton = true;
    		$scope.disabledButton = true;
    		AdmitPatient.get({
				token: $window.sessionStorage.token,
				offset: 0,
				limit: $scope.itemsPerPage
			}, admitPatientSucess, admitPatientFailure);
    	}
    }
    function updateAdmitPatientFailure(error){
    	console.log(error);
    }
}]);