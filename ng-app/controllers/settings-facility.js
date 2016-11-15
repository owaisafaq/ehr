var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsFacility', ['$scope', '$rootScope', '$window', '$routeParams', 'Countries','States', 'GetHospitalProfile', 'addUpdateHospital','Upload', 'GetAllDepartments', 'GetDepartment', 'deleteDepartment', 'addDepartment', 'editDepartment', 'GetAllRooms', 'GetRoom', 'deleteRoom', 'addRoom', 'editRoom', '$timeout', function($scope, $rootScope,$window,$routeParams,Countries,States,GetHospitalProfile,addUpdateHospital,Upload,GetAllDepartments,GetDepartment,deleteDepartment,addDepartment,editDepartment,GetAllRooms,GetRoom,deleteRoom,addRoom,editRoom,$timeout){
	$rootScope.pageTitle = "EHR - Setting - Facility";
    $rootScope.loader = "show";
    $scope.itemsPerPage = 15;
    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.curPageD = 0;
    $scope.pageSizeD = 15;
    $scope.deleteDepartmentId = 0;
    $scope.imageUploading = true;
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
            $scope.image = { "image" : res.data != null ? res.data.image : '' , "image_name" : res.data != null ? res.data.image_name : ''};
            $timeout(function(){
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },100);
            $scope.is_update = res.is_update;
            $scope.path = res.path;
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
            image : $scope.image.image,
            image_name : $scope.image.image_name,
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
            accredation_lab : hospitalData.accredation_lab,
            //accredation_lab : '',
            accredation_pharmacy : hospitalData.accredation_pharmacy,
            //accredation_pharmacy : '',
            accredation_others : hospitalData.accredation_others
            //accredation_others : ''
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
            $scope.image = {};
            $timeout(function(){
                $scope.message = false;
                $('#facility-profile').modal('hide');
                $scope.errorMessage = "";
            },1500);
            GetHospitalProfile.get({
                token: $window.sessionStorage.token
            }, GetHospitalProfileSuccess, GetHospitalProfileFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
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
        $scope.imageUploading = false;
        $scope.files = files;
        $scope.errFiles = errFiles;
        var i = 1;
        $scope.imageUploading = false;
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: serverPath + "upload_hospital_image",
                method: 'POST',
                data: {hospital_image: file}
            });
            file.upload.then(function (response) {
                //$timeout(function () {
                $scope.image = file.result = response.data;
                if(ref == undefined) $scope.imageUploading = true;//$('#fileUploadedSuccess').modal('show');
                else $scope.refAttachment = response.data.message;
                if(files.length == i){
                    $scope.saveAndClose = false;
                }
                i++;
                //});
            }, function (response) {
                if (response.status > 0){
                    $scope.errorMsg = response.status + ': ' + response.data;
                }else if(res.error_code == 500){
                    console.log(res);
                    $rootScope.RolesAccess(res.message);
                }
            }, function (evt) {
                $scope.imageUploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        });
    };

    GetAllDepartments.get({
        token: $window.sessionStorage.token,
        offset: 0, limit: $scope.itemsPerPage
    }, GetAllDepartmentsSuccess, GetAllDepartmentsFailure);

    function GetAllDepartmentsSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
            $scope.DepartmentLists = res.data;
            $scope.departmentCount = res.count;
        }
    }
    function GetAllDepartmentsFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.numberOfPagesD = function() {
        return Math.ceil($scope.departmentCount / $scope.pageSize);
    };

    $scope.paginationNextD = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllDepartments.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, GetAllDepartmentsSuccess, GetAllDepartmentsFailure);
    };

    $scope.paginationPrevD = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllDepartments.get({
            token: $window.sessionStorage.token,
            offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
        }, GetAllDepartmentsSuccess, GetAllDepartmentsFailure);
    };

    $scope.confirmRemoveDeparment = function(id){
        $scope.deleteDepartmentId = id;
        $('#confirmation').modal('show');
    };
    $scope.removeDepartment = function(){
        $rootScope.loader = "show";
        deleteDepartment.get({
            token: $window.sessionStorage.token,
            department_id : $scope.deleteDepartmentId
        }, deleteDepartmentSuccess, deleteDepartmentFailure)
    };

    function deleteDepartmentSuccess(res){
        if(res.status == true){
            $scope.deleteDepartmentId = 0;
            $('#confirmation').modal('hide');
            GetAllDepartments.get({
                token: $window.sessionStorage.token
            }, GetAllDepartmentsSuccess, GetAllDepartmentsFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function deleteDepartmentFailure(error){
        console.log(error);
        $('#confirmation').modal('hide');
        $('#internetError').modal('show');
    }

    $scope.createDepartment = function (departmentData){
        addDepartment.save({
            token : $window.sessionStorage.token,
            name : departmentData.name,
            description : departmentData.description
        },addDepartmentSuccess,addDepartmentFailure);
    };
    function addDepartmentSuccess(res){ // on success
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.addDepartmentBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $scope.departmentData = {};
            $scope.submitted = false;
            $timeout(function(){
                $scope.message = false;
                $('#addNewSpeciality').modal('hide');
                $scope.errorMessage = "";
            },1500);
            GetAllDepartments.get({
                token: $window.sessionStorage.token
            }, GetAllDepartmentsSuccess, GetAllDepartmentsFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $scope.hideLoader = "hide";
            $scope.addDepartmentBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function addDepartmentFailure(error){ // on failure
        console.log(error);
        $('#internetError').modal('show');
    }

    $scope.departmentDetail = function(id){
        GetDepartment.get({
            token: $window.sessionStorage.token,
            department_id : id
        }, GetDepartmentSuccess, GetDepartmentFailure);
    };
    function GetDepartmentSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            $scope.editDepartmentData = res.data;
            setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },100);
            $('#editNewSpeciality').modal('show');
        }
    }
    function GetDepartmentFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.updateDepartment = function(editDepartmentData){
        $rootScope.loader = "show";
        editDepartment.save({
            token : $window.sessionStorage.token,
            department_id : editDepartmentData.id,
            name : editDepartmentData.name,
            description : editDepartmentData.description
        },editDepartmentSuccess,editDepartmentFailure);
    };

    function editDepartmentSuccess(res){ // on success
        if (res.status == true) {
            $rootScope.loader = 'hide';
            $scope.message = true;
            $scope.updateDepartmentBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            GetAllDepartments.get({
                token: $window.sessionStorage.token
            }, GetAllDepartmentsSuccess, GetAllDepartmentsFailure);
            $timeout(function(){
                $scope.message = false;
                $scope.submitted = false;
                $('#editNewSpeciality').modal('hide');
                $scope.errorMessage = "";
                $scope.editDepartmentData = {};
            },1500);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $rootScope.loader = "hide";
            $scope.updateDepartmentBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function editDepartmentFailure(error){ // on failure
        console.log(error);
        $('#internetError').modal('show');
    }
    
    GetAllRooms.get({
        token: $window.sessionStorage.token,
        offset: 0, limit: $scope.itemsPerPage
    }, GetAllRoomsSuccess, GetAllRoomsFailure);

    function GetAllRoomsSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
            $scope.RoomLists = res.data;
            $scope.roomCount = res.count;
        }
    }
    function GetAllRoomsFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.numberOfPages = function() {
        return Math.ceil($scope.roomCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllRooms.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, GetAllRoomsSuccess, GetAllRoomsFailure);
    };

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllRooms.get({
            token: $window.sessionStorage.token,
            offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
        }, GetAllRoomsSuccess, GetAllRoomsFailure);
    };

    $scope.confirmRemoveRoom = function(id){
        $scope.deleteRoomId = id;
        $('#confirmation_room').modal('show');
    };
    $scope.removeRoom = function(){
        $rootScope.loader = "show";
        deleteRoom.get({
            token: $window.sessionStorage.token,
            room_id: $scope.deleteRoomId
        }, deleteRoomSuccess, deleteRoomFailure)
    };

    function deleteRoomSuccess(res){
        if(res.status == true){
            $scope.deleteRoomId = 0;
            $('#confirmation').modal('hide');
            GetAllRooms.get({
                token: $window.sessionStorage.token
            }, GetAllRoomsSuccess, GetAllRoomsFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function deleteRoomFailure(error){
        console.log(error);
        $('#confirmation').modal('hide');
        $('#internetError').modal('show');
    }

    $scope.createRoom = function (roomData){
        addRoom.save({
            token : $window.sessionStorage.token,
            name : roomData.name,
            code: roomData.code,
            description : roomData.description
        },addRoomSuccess,addRoomFailure);
    };
    function addRoomSuccess(res){ // on success
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.addRoomBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $scope.roomData = {};
            $scope.submitted = false;
            $timeout(function(){
                $scope.message = false;
                $('#addNewRoom').modal('hide');
                $scope.errorMessage = "";
            },1500);
            GetAllRooms.get({
                token: $window.sessionStorage.token
            }, GetAllRoomsSuccess, GetAllRoomsFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $scope.hideLoader = "hide";
            $scope.addRoomBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function addRoomFailure(error){ // on failure
        console.log(error);
        $('#internetError').modal('show');
    }

    $scope.roomDetail = function(id){
        GetRoom.get({
            token: $window.sessionStorage.token,
            room_id: id
        }, GetRoomSuccess, GetRoomFailure);
    };
    function GetRoomSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            $scope.editRoomData = res.data;
            setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },100);
            $('#editNewRoom').modal('show');
        }
    }
    function GetRoomFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.updateRoom = function(editRoomData){
        $rootScope.loader = "show";
        editRoom.save({
            token : $window.sessionStorage.token,
            room_id: editRoomData.id,
            name : editRoomData.name,
            code: editRoomData.code,
            description : editRoomData.description
        },editRoomSuccess,editRoomFailure);
    };

    function editRoomSuccess(res){ // on success
        if (res.status == true) {
            $rootScope.loader = 'hide';
            $scope.message = true;
            $scope.updateRoomBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            GetAllRooms.get({
                token: $window.sessionStorage.token
            }, GetAllRoomsSuccess, GetAllRoomsFailure);
            $timeout(function(){
                $scope.message = false;
                $scope.submitted = false;
                $('#editNewRoom').modal('hide');
                $scope.errorMessage = "";
                $scope.editRoomData = {};
            },1500);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $rootScope.loader = "hide";
            $scope.updateRoomBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function editRoomFailure(error){ // on failure
        console.log(error);
        $('#internetError').modal('show');
    }
}]);