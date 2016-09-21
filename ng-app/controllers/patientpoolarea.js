var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientPoolArea', ['$scope', '$rootScope', '$window', '$routeParams', 'PatientPoolArea', function ($scope, $rootScope, $window, $routeParams, PatientPoolArea) {
        $rootScope.pageTitle = "EHR - Patient Pool Area";
        $scope.patientPoolArea = [];
        $scope.itemsPerPage = 15;
        $rootScope.loader = "show";

        /*$scope.patientPoolArea.encounter = [
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
        ];
        $scope.patientPoolArea.triage = [
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
        ];
        $scope.patientPoolArea.physician = [
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
        ];
        $scope.patientPoolArea.checkout = [
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
                { "patient_name": "Muzammil"},
        ];*/
        PatientPoolArea.get({
        	token: $window.sessionStorage.token,
        	offset: 0,
        	limit: $scope.itemsPerPage
        }, getPatientPoolAreaSuccess, getPatientPoolAreaFailure);

        function getPatientPoolAreaSuccess(res){
        	$rootScope.loader = "hide";
        	if(res.status == true){
        		if(res.is_exist == 0){
        			$scope.modalHeading = "Status";
        			$scope.modalMessage = "Record Not Found";
        			$('#noResultFound').modal('show');
        			return true;
        		}
        		$scope.patientPoolArea = res.data;
        		$scope.count = res.count;
        	}
        }

        function getPatientPoolAreaFailure(errors){
        	$rootScope.loader = "hide";
        	$('#internetError').modal('show');
        }

}]);