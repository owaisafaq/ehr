var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsDischargeSummaryController', ['$scope', '$rootScope','$window', 'AdmitPatient', 'GetBedsByWard', 'GetAllWardsDropDown', 'MovePatient', 'DropDownData', function($scope, $rootScope, $window, AdmitPatient, GetBedsByWard, GetAllWardsDropDown, MovePatient, DropDownData){
	$rootScope.pageTitle = "EHR - Wards Discharge Summary";
	$scope.allAdmitPatient = [];
	$rootScope.loader = "show";
	$scope.itemsPerPage = 5;
	$scope.action = "";
	$scope.move = {};
	$scope.move.bedNumber = "";
	$scope.disabledButton = true;
	$scope.itemsPerPage = 5;
	$(".select-bed-dropdown").hide();
	AdmitPatient.get({
		token: $window.sessionStorage.token,
		offset: 0,
		limit: $scope.itemsPerPage
	}, admitPatientSucess, admitPatientFailure);
	function admitPatientSucess(res){
		console.log(res);
		$rootScope.loader = "hide";
		if(res.status == true){
			if(res.data.length == 0){
				$scope.modalHeading = "Result";
				$scope.modalMessage = "No Result Found";
				$('#noResultFound').modal('show');
			}
			$scope.allAdmitPatient = res.data;
			$scope.admitCount = res.count;
		}
	}
	function admitPatientFailure(error){
		console.log(error);
		$('#internetError').modal('show');
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

	$scope.admitPatientSelected = function(index){
		$scope.disabledButton = false;
		$scope.selectedPatientToMove = $scope.allAdmitPatient[index];
		//var exData = $scope.selectedPatientToMove.expected_discharge_date.split(' ');
		//$scope.selectedPatientToMove.expected_discharge_date = exData[1].slice(0, -3);
		console.log($scope.selectedPatientToMove.expected_discharge_date);
		setTimeout(function () {
            $('select').not('.search-ajax').select2({minimumResultsForSearch: Infinity});
        }, 1000)
		console.log($scope.selectedPatientToMove);
	}

	$scope.wardSelected = function(wid){
		console.log(wid);
		GetBedsByWard.get({
			token: $window.sessionStorage.token,
			ward_id: wid
		}, getBedsWardSuccess, getBedsWardFailure);
		function getBedsWardSuccess(res){
			console.log(res);
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
		console.log(bedID);
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
}]);