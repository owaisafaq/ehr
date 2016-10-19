var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsFacility', ['$scope', '$rootScope', '$window', '$routeParams', 'Countries','States', 'GetHospitalProfile', 'addUpdateHospital','Upload', '$timeout', function($scope, $rootScope,$window,$routeParams,Countries,States,GetHospitalProfile,addUpdateHospital,Upload,$timeout){
	$rootScope.pageTitle = "EHR - Setting - Facility";

	Countries.get({
		token: $window.sessionStorage.token
	}, GetAllCountriesSuccess, GetAllCountriesFailure);
	function GetAllCountriesSuccess(res) {
		if (res.status == true) {
			$scope.Countries = res.data;
		}
	}
	function GetAllCountriesFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}
    States.get({
        token: $window.sessionStorage.token
    }, GetAllStatesSuccess, GetAllStatesFailure);
    function GetAllStatesSuccess(res) {
        if (res.status == true) {
            $scope.States = res.data;
        }
    }
    function GetAllStatesFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }
    GetHospitalProfile.get({
        token: $window.sessionStorage.token
    }, GetHospitalProfileSuccess, GetHospitalProfileFailure);
    function GetHospitalProfileSuccess(res) {
        if (res.status == true) {
            $scope.hospitalData = res.data;
            $timeout(function(){
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },100);
            $scope.is_update = res.is_update;
        }
    }
    function GetHospitalProfileFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }
    $scope.openEditModal = function(){
        GetHospitalProfile.get({
            token: $window.sessionStorage.token
        }, GetHospitalProfileSuccess, GetHospitalProfileFailure);
        $('#facility-profile').modal('show');
    };
    $scope.createEditHospital = function (hospitalData){
        addUpdateHospital.save({
            token : $window.sessionStorage.token,
            is_update : $scope.is_update,
            name : hospitalData.name,
            address : hospitalData.address,
            type : hospitalData.type,
            city : hospitalData.city,
            registration_number : hospitalData.registration_number,
            state : hospitalData.state_id,
            category : hospitalData.category,
            country : hospitalData.country_id,
            number_of_departments : hospitalData.number_of_departments,
            phone : hospitalData.phone,
            date_registration : hospitalData.date_registration,
            email : hospitalData.email,
            //number_beds : hospitalData.number_beds,
            number_beds : '',
            website : hospitalData.website,
            name_proprietor : hospitalData.name_proprietor,
            //accredation_lab : hospitalData.accredation_lab,
            accredation_lab : '',
            //accredation_pharmacy : hospitalData.accredation_pharmacy,
            accredation_pharmacy : '',
            //accredation_others : hospitalData.accredation_others
            accredation_others : ''
        },addUpdateHospitalSuccess,addUpdateHospitalFailure);
    };
    function addUpdateHospitalSuccess(res){ // on success
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.addHospitalBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $scope.submitted = false;
            $timeout(function(){
                $scope.message = false;
                $('#facility-profile').modal('hide');
                $scope.errorMessage = "";
            },1500);
            GetHospitalProfile.get({
                token: $window.sessionStorage.token
            }, GetHospitalProfileSuccess, GetHospitalProfileFailure);
        } else {
            $scope.hideLoader = "hide";
            $scope.addHospitalBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function addUpdateHospitalFailure(error){ // on failure
        console.log(error);
        $('#internetError').modal('show');
    }
    $scope.uploadFiles = function (files, errFiles, ref) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        var i = 1;
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: serverPath + "upload_hospital_image",
                method: 'POST',
                data: {hospital_image: file}
            });
            file.upload.then(function (response) {
                //$timeout(function () {
                file.result = response.data;
                console.log(response);
                if(ref == undefined) $('#fileUploadedSuccess').modal('show');
                else $scope.refAttachment = response.data.message;
                if(files.length == i){
                    //console.log($scope.PI.file);
                    $scope.saveAndClose = false;
                }
                i++;
                //});
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        });
    }
}]);
