var AppEHR = angular.module('AppEHR');

AppEHR.controller('appointmentsCalenderController', ['$scope', '$rootScope', '$window', 'AppointmentCalender', function($scope, $rootScope, $window, AppointmentCalender){
	$rootScope.pageTitle = "EHR - Appointments Calender";
	AppointmentCalender.get({
		token: $window.sessionStorage.token
	}, AppointmentCalenderSuccess, AppointmentCalenderFailure);
	function AppointmentCalenderSuccess(res){
		if(res.status == true){
			console.log(res);
		}
	}
	function AppointmentCalenderFailure(error){
		$('#internetError').modal('show');
		console.log(error);
	}
}]);