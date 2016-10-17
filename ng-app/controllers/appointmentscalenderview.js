var AppEHR = angular.module('AppEHR');

AppEHR.controller('appointmentsCalenderController', ['$scope', '$rootScope', '$window', 'AppointmentCalender', 'SearchByPatient', 'SearchByDoctors', 'SearchByDepartment', 'DropDownData', 'AddAppointments',function($scope, $rootScope, $window, AppointmentCalender, SearchByPatient, SearchByDoctors, SearchByDepartment, DropDownData, AddAppointments){
	$rootScope.pageTitle = "EHR - Appointments Calender";
	$scope.PatientSearch = serverPath;
	$scope.Calender = [];
	$rootScope.loader = "show";
    $scope.priorities = priorities;
    $scope.reason = reason;
	var event = [];
	var colorArray = ["#BE90D4", "#2ECC71", "#F62459", "#22A7F0", "#22A7F0", "#65C6BB"];
	AppointmentCalender.get({token: $window.sessionStorage.token}, AppointmentCalenderSuccess, AppointmentCalenderFailure);
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

	function AppointmentCalenderSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			var event = [];
    		angular.forEach(res.data, function(value, key){
    			var rand = colorArray[Math.floor(Math.random() * colorArray.length)];
			   event.push({id: value.id, title: value.patient_name+" with "+value.name, start: value.pick_date, color: rand, textColor: '#FFF' });
			 });
            if($scope.refreshCal == true){
                //$('#calendar').fullCalendar( 'rerenderEvents' );
                $('#calendar').fullCalendar( 'removeEvents');
                $('#calendar').fullCalendar( 'addEventSource', event, true);
            }else $('#calendar').fullCalendar( 'addEventSource', event, true);
		}
	}
	function AppointmentCalenderFailure(error){
		$('#internetError').modal('show');
		console.log(error);
	}
	/*SEARCH BY PATIENT*/
	$('#findPatient').on('input', function(){
		$('#departmentSearch').val("");
		$('#doctorSearch').val("");
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
                                            label: value.first_name == "" || value.first_name == undefined ? "No patient found" : value.id + " - " + value.first_name + " " + value.last_name,
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
                            	$('#calendar').fullCalendar('removeEvents');
                            	$rootScope.loader = "show";
                            	console.log(ui.item.label);
                            	var PID = ui.item.label.split(' - ');
                                $('#findPatient').val(ui.item.label);
                                SearchByPatient.save({token: $window.sessionStorage.token, patient_id: PID[0]}, SearchBySuccess, SearchByFailure);
                                return false;
                            }
                        });
                    }
                });
            }
        }
    });

    /*SEARCH BY DEPARTMENT*/
    $('#departmentSearch').on('input', function(){
        var input = $('#departmentSearch').val();
        $('#findPatient').val("");
		$('#doctorSearch').val("");
        if(input != undefined || input != ''){
            if(input.length == 0){
                $('.headerWithSwitchingImages').addClass('ng-hide');
                $('.headerWithSwitchingImages1').removeClass('ng-hide');
            }else{
                $.ajax({
                    url: $('#departmentSearch').data('source'),
                    dataType: "json",
                    type: "POST",
                    delay: 500,
                    minLength: 1,
                    data: {name: input},
                    success: function (patients) {
                    	//console.log(patients);
                        $("#departmentSearch").autocomplete({
                            source: function (request, response) {
                                if(patients.status == true){
                                    response($.map(patients.data, function (value, key) {
                                        return {
                                            label: value.name == "" ? "No Speciality found" : value.name,
                                            value: value.id == "" ? '0' : value.id
                                        }
                                    }));
                                    patients.data = [];
                                }else{
                                    response({label:"No Speciality Found"});
                                    patients.data = [];
                                }
                            },
                            select: function(event, ui) {
                            	$rootScope.loader = "show";
                                $('#departmentSearch').val(ui.item.label);
                                $scope.Calender.appointmentSearch = ui.item.label;
                                SearchByDepartment.save({token: $window.sessionStorage.token, department_id: ui.item.value}, SearchBySuccess, SearchByFailure);
                                return false;
                            }
                        });
                    }
                });
            }
        }
    });

    /*SEARCH BY DOCTOR*/
    $('#doctorSearch').on('input', function(){
    	$('#findPatient').val('');
		$('#departmentSearch').val('');
        var input = $('#doctorSearch').val();
        if(input != undefined || input != ''){
            if(input.length == 0){
                $('.headerWithSwitchingImages').addClass('ng-hide');
                $('.headerWithSwitchingImages1').removeClass('ng-hide');
            }else{
                $.ajax({
                    url: $('#doctorSearch').data('source'),
                    dataType: "json",
                    type: "POST",
                    delay: 500,
                    minLength: 2,
                    data: {name: input},
                    success: function (patients) {
                        $("#doctorSearch").autocomplete({
                            source: function (request, response) {
                                if(patients.status == true){
                                    response($.map(patients.data, function (value, key) {
                                        return {
                                            label: value.name == "" ? "No Too See found" : value.name,
                                            value: value.id == "" ? '0' : value.id
                                        }
                                    }));
                                    patients.data = [];
                                }else{
                                    response({label:"No Too See Found"});
                                    patients.data = [];
                                }
                            },
                            select: function(event, ui) {
                            	$rootScope.loader = "show";
                                $('#doctorSearch').val(ui.item.label);
                                SearchByDoctors.save({token: $window.sessionStorage.token, doctor_id: ui.item.value}, SearchBySuccess, SearchByFailure);
                                return false;
                            }
                        });
                    }
                });
            }
        }
    });
	
    function SearchBySuccess(res){
    	console.log('good');
    	$rootScope.loader = "hide";
    	if(res.status == true){
    		event = [];
    		$('#calendar').fullCalendar('removeEvents');
    		if(res.data.length == 0){
    			$('#noResultFound').modal('show');
    			return true;
    		}
    		$scope.Calender = res.data;
    		angular.forEach($scope.Calender, function(value, key){
    			var rand = colorArray[Math.floor(Math.random() * colorArray.length)];
			   event.push({id: value.id, title: value.patient_name+" with "+value.name, start: value.pick_date, color: rand});
			 });
    		$('#calendar').fullCalendar( 'removeEvents');
			$('#calendar').fullCalendar( 'addEventSource', event, true);
    		console.log(res);
    	}
    }

    function SearchByFailure(error){
    	console.log(error);
    }

    
    $scope.createAppointments = function(dataToBeAdded){

        if(dataToBeAdded.appointmentSearch != undefined && dataToBeAdded.department != undefined && dataToBeAdded.reason != undefined && dataToBeAdded.date != undefined && dataToBeAdded.startTime != undefined && dataToBeAdded.doctor != undefined){
            console.log(dataToBeAdded);
            $rootScope.loader = "show";
            AddAppointments.save({
                token: $window.sessionStorage.token,
                patient_id: dataToBeAdded.selectedPatientID,
                //visit_id: $scope.encounterID,
                department: dataToBeAdded.department,
                reason: dataToBeAdded.reason,
                date: dataToBeAdded.date,
                start_time: dataToBeAdded.startTime,
                notes: dataToBeAdded.notes == undefined ? '' : dataToBeAdded.notes,
                doctor: dataToBeAdded.doctor,
                other_reason: dataToBeAdded.otherReason == undefined ? '' : dataToBeAdded.otherReason,
                //end_time: dataToBeAdded.endTime,
                priority: dataToBeAdded.priority == undefined ? '' : dataToBeAdded.priority != undefined
            }, createAppointmentSuccess, createAppointmentFailure);

            function createAppointmentSuccess(res){
                console.log(res);
                if(res.status == true){
                    /*$scope.modalHeading = "Successful";
                    $scope.modalMessage = "New Appointment Created";
                    $('#noResultFound').modal('show');*/
                    $scope.refreshCal = true;
                    $('#createAppointment').modal('hide');
                    $scope.appointment = {};
                    $scope.submitted = false;
                    AppointmentCalender.get({token: $window.sessionStorage.token}, AppointmentCalenderSuccess, AppointmentCalenderFailure);
                }
            }
            function createAppointmentFailure(error){
                $rootScope.loader = "hide";
                $('#internetError').modal('show');
                console.log(error);
            }
        }
    }

    $('.findPatient').on('input', function(){
        //$('#departmentSearch').val("");
        //$('#doctorSearch').val("");
        var input = $('.findPatient').val();
        if(input != undefined || input != ''){
            $.ajax({
                url: $('.findPatient').data('source'),
                dataType: "json",
                type: "POST",
                delay: 500,
                minLength: 2,
                data: {name: input},
                success: function (patients) {
                    $(".findPatient").autocomplete({
                        source: function (request, response) {
                            if(patients.status == true){
                                response($.map(patients.data, function (value, key) {
                                    return {
                                        label: value.first_name == "" || value.first_name == undefined ? "No patient found" : value.id + " - " + value.first_name + " " + value.last_name,
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
                            if(ui.item.value.length > 8){
                                console.log("itsmine");
                                $('.findPatient').val('');
                                $scope.appointment.appointmentSearch = undefined;
                            }else{
                                console.log(ui.item.label);
                                var PID = ui.item.label.split(' - ');
                                $scope.appointment.selectedPatientID = PID[0];
                                $('.findPatient').val(ui.item.label);
                                
                            }
                            return false;
                        }
                    });
                }
            });
        }
    });
}]);