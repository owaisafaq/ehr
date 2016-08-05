var AppEHR = angular.module('AppEHR');

AppEHR.controller('appointmentsListController', ['$scope', '$rootScope', '$window', 'GetAppointmentsByPatient', 'GetPatientInfo', 'AddAppointments', 'DeleteAppointments', 'UpdateAppointments', 'DropDownData', 'GetOneAppointment', function($scope, $rootScope, $window, GetAppointmentsByPatient, GetPatientInfo, AddAppointments, DeleteAppointments, UpdateAppointments, DropDownData, GetOneAppointment){
	$rootScope.pageTitle = "EHR - Appointments List";
	$rootScope.loader = "show";
	$scope.allAppointments = [];
	$scope.appointment = {};
	$scope.updateAppointment = {};
	$scope.displayInfo = {};
	$scope.action = '';
	$scope.patientInfo = false;
	$scope.buttonDisabled = true;
	$scope.itemsPerPage = 15;
	$scope.priorities = priorities;
	$scope.reason = reason;
	$scope.searchBar = true;
	$scope.PatientSearch = serverPath;
	GetAppointmentsByPatient.get({
		token: $window.sessionStorage.token, 
		limit: $scope.itemsPerPage, 
		offset: 0
	}, allAppointmentsSuccess, allAppointmentsFailure);

	function allAppointmentsSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			if(res.data.length == 0){
				$scope.modalHeading = "Result";
				$scope.modalMessage = "No Result Found";
				$('#noResultFound').modal('show');
				$scope.allAppointments = [];
				$scope.appointmentCount = 0;
				return true;
			}
			$scope.allAppointments = res.data;
			$scope.appointmentCount = res.count;
		}
	}
	function allAppointmentsFailure(error){
		$rootScope.loader = "hide";
        $('#internetError').modal('show');
		console.log(error);
	}

	DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFailure);

	function dropDownSuccess(res){
		if(res.status == true){
			$scope.dropdownData = res.data;
		}
	}
	function dropDownFailure(error){
        $('#internetError').modal('show');
		console.log(error);
	}

	$scope.appointmentSelected = function(patientID, appointmentID){
		$rootScope.loader = "show";
		$scope.patientID = patientID;
		$scope.appointmentID = appointmentID;
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patientID}, patientInfoSuccess, patientInfoFailure);

        function patientInfoSuccess(res) {
            if (res.status == true) {
                $scope.buttonDisabled = false;
                $scope.displayInfo.first_name = res.data.first_name;
                $scope.displayInfo.middle_name = res.data.middle_name;
                $scope.displayInfo.last_name = res.data.last_name;
                $scope.displayInfo.patient_id = res.data.id;
                $scope.displayInfo.age = res.data.age;
                $scope.displayInfo.sex = res.data.sex;
                $scope.displayInfo.marital_status = res.data.marital_status;
                $scope.hospital_plan = res.data.hospital_plan;
                $scope.patientInfo = true;
                if($scope.hospital_plan == '1') $scope.hospital_plan = "card-color-1";
                if($scope.hospital_plan == '2') $scope.hospital_plan = "card-color-2";
                else $scope.hospital_plan = "card-color-3";
                $rootScope.loader = "hide";
            }
        }

        function patientInfoFailure(error) {
            $('#internetError').modal('show');
            console.log(error);
        }

        GetOneAppointment.get({
			token: $window.sessionStorage.token,
			appointment_id: $scope.appointmentID
		}, getAppointmentSuccess, getAppointmentFailure);

        function getAppointmentSuccess(res){
        	if(res.status == true){
        		$scope.updateAppointment.appointmentSearch = res.data.first_name + " " + res.data.last_name;
        		$scope.updateAppointment.patientID = res.data.patient_id;
        		$scope.updateAppointment.department = res.data.department_id;
        		$scope.updateAppointment.reason = res.data.reason;
        		$scope.updateAppointment.doctor = res.data.doctor_id;
        		$scope.updateAppointment.date = res.data.pick_date;
        		$scope.updateAppointment.otherReason = res.data.other_reasons;
        		$scope.updateAppointment.startTime = res.data.start_time;
        		$scope.updateAppointment.endTime = res.data.end_time;
        		$scope.updateAppointment.notes = res.data.notes;
        		$scope.updateAppointment.priority = res.data.priority;
        		setTimeout(function () {
		            $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
		        },100)
        	}
        }

        function getAppointmentFailure(error) {
            $('#internetError').modal('show');
            console.log(error);
        }
	}

	/*$scope.search = function(item){ // search data by patient name or partient id
        if($scope.searchAppointment == undefined){
            return true;
        }else{
            if(item.patient_id.toLowerCase().indexOf($scope.searchAppointment.toLowerCase()) != -1 || item.first_name.toLowerCase().indexOf($scope.searchAppointment.toLowerCase()) != -1){
                return true;
            }
        }
    };*/

    $scope.findBy = function(){
    	$scope.searchBar = false;
    }

    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.appointmentCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAppointmentsByPatient.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, allAppointmentsSuccess, allAppointmentsFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAppointmentsByPatient.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, allAppointmentsSuccess, allAppointmentsFailure);
    }

    $scope.deleteAppointments = function(){
    	$rootScope.loader = "show";
    	DeleteAppointments.save({
    		token: $window.sessionStorage.token,
    		appointment_id: $scope.appointmentID
    	}, deleteAppointmentSuccess, deleteAppointmentFailure);
    	function deleteAppointmentSuccess(res){
    		$rootScope.loader = "hide";
    		if(res.status == true){
    			$scope.modalHeading = "Successful";
				$scope.modalMessage = "Appointment Deleted";
    			$("#deleteConfirm").modal('hide');
    			$("#noResultFound").modal('show');
    			GetAppointmentsByPatient.get({
					token: $window.sessionStorage.token, 
					limit: $scope.itemsPerPage, 
					offset: 0
				}, allAppointmentsSuccess, allAppointmentsFailure);
    		}
    	}
    	function deleteAppointmentFailure(error){
            $('#internetError').modal('show');
    		console.log(error);
    	}
    }

    $scope.addformsubmission = function(){
        if($scope.submitted == true && $scope.addForm.$invalid == true ){
            return true;
        }
        return false;
    };

    $scope.createAppointments = function(dataToBeAdded){
    	$scope.disabledButton = "true";
    	$rootScope.loader = "show";
    	AddAppointments.save({
    		token: $window.sessionStorage.token,
    		patient_id: dataToBeAdded.appointmentSearch,
    		//visit_id: $scope.encounterID,
    		department: dataToBeAdded.department,
    		reason: dataToBeAdded.reason,
    		date: dataToBeAdded.date,
    		start_time: dataToBeAdded.startTime,
    		notes: dataToBeAdded.notes,
    		doctor: dataToBeAdded.doctor,
    		other_reason: dataToBeAdded.otherReason,
    		end_time: dataToBeAdded.endTime,
    		priority: dataToBeAdded.priority
    	}, createAppointmentSuccess, createAppointmentFailure);

    	function createAppointmentSuccess(res){
    		console.log(res);
    		if(res.status == true){
    			$scope.modalHeading = "Successful";
    			$scope.modalMessage = "New Appointment Created";
    			$('#noResultFound').modal('show');
    			$('#createAppointment').modal('hide');
    			$scope.appointment = {};
    			$scope.submitted = false;
    			GetAppointmentsByPatient.get({
					token: $window.sessionStorage.token, 
					limit: $scope.itemsPerPage, 
					offset: 0
				}, allAppointmentsSuccess, allAppointmentsFailure);

    		}
    	}
    	function createAppointmentFailure(error){
            $('#internetError').modal('show');
    		console.log(error);
    	}
    }

    $scope.updateAppointments = function(dataToBeUpdated){
    	$scope.disabledButton = "true";
    	$rootScope.loader = "show";
    	UpdateAppointments.save({
    		token: $window.sessionStorage.token,
    		appointment_id: $scope.appointmentID,
    		patient_id: dataToBeUpdated.patientID,
    		department: dataToBeUpdated.department,
    		reason: dataToBeUpdated.reason,
    		date: dataToBeUpdated.date,
    		start_time: dataToBeUpdated.startTime,
    		notes: dataToBeUpdated.notes,
    		doctor: dataToBeUpdated.doctor,
    		other_reason: dataToBeUpdated.otherReason,
    		end_time: dataToBeUpdated.endTime,
    		priority: dataToBeUpdated.priority
    	}, updateAppointmentSuccess, updateAppointmentFailure);

    	function updateAppointmentSuccess(res){
    		if(res.status == true){
    			$scope.modalHeading = "Successful";
    			$scope.modalMessage = "Appointment Updated";
    			$('#noResultFound').modal('show');
    			$('#updateAppointment').modal('hide');
    			$scope.appointment = {};
    			$scope.submitted = false;
    			$scope.patientInfo = false;
    			$scope.buttonDisabled = true;
    			/*$scope.AID = $scope.appointmentID;
				$scope.action = $scope.appointmentID;*/
    			GetAppointmentsByPatient.get({
					token: $window.sessionStorage.token, 
					limit: $scope.itemsPerPage, 
					offset: 0
				}, allAppointmentsSuccess, allAppointmentsFailure);

    		}
    	}
    	function updateAppointmentFailure(error){
            $('#internetError').modal('show');
    		console.log(error);
    	}
    }

    $('#findPatient').on('input', function(){
        var input = $('#findPatient').val();
        if(input != undefined || input != ''){
            if(input.length == 0){
                $('.headerWithSwitchingImages').addClass('ng-hide');
                $('.headerWithSwitchingImages1').removeClass('ng-hide');
            }else{
                $.ajax({
                    url: $('#findPatient').data('source'),
                    dataType: "json",
                    type: "POST",
                    delay: 500,
                    minLength: 2,
                    data: {name: input},
                    success: function (patients) {
                        $("#findPatient").autocomplete({
                            source: function (request, response) {
                                if(patients.status == true){
                                    response($.map(patients.data, function (value, key) {
                                        return {
                                            label: value.first_name == "" || value.first_name == undefined ? "No patient found" : value.first_name + " " + value.last_name,
                                            value: value.id == "" ? '0' : value.id
                                        }
                                    }));
                                    patients.data = [];
                                }else{
                                    response({label:"No Patient Found"});
                                    patients.data = [];
                                }
                            },
                            select: function(event, ui) {
                                $('#findPatient').val(ui.item.label);
                                $scope.appointment.appointmentSearch = ui.item.value;
                                return false;
                            }
                        });
                    }
                });
            }
        }
    });
}]);