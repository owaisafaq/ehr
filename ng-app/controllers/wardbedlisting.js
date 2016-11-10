var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardBedListingController', ['$scope', '$rootScope', '$window', 'GetAllWards', 'CreateWard', 'DeleteWard', 'DropDownData', 'GetOneWard', function($scope, $rootScope, $window, GetAllWards, CreateWard, DeleteWard, DropDownData, GetOneWard){
	$rootScope.pageTitle = "EHR - Ward Bed Listing";
	$scope.action = '';
	$scope.allWards = [];
    $scope.addWard = {};
    $scope.dropDownData = [];
	$scope.buttonDisabled = true;
	$rootScope.loader = "show";
    $scope.sortingWard = $scope.sortingBeds = $scope.sortingSpeciality = "fa-caret-down";
	$scope.itemsPerPage = 15;
    $scope.flagWard = false;
    $scope.flagSpeciality = false;
    $scope.flagBeds = false;
    $scope.pageSizeDropdown = '';
    $scope.numberOfRecordsDropDown = numberOfRecordsDropDown;
	GetAllWards.get({
		token: $window.sessionStorage.token, 
		limit: $scope.itemsPerPage, 
		offset: 0
	}, getWardsSuccess, getWardsFailure);

	function getWardsSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
            if(res.data.length == 0){
                $scope.modalHeading = "Result";
                $scope.modalMessage = "No Result Found";
                $('#noResultFound').modal('show');
                $scope.allWards = [];
                $scope.wardsCount = 0;
                return true;
            }
            $scope.allWards = res.data;
            for(var k = 0; k < $scope.allWards.length; k++){
                $scope.allWards[k].number_of_beds = parseFloat($scope.allWards[k].number_of_beds);
            }
			$scope.wardsCount = res.count;
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}
	function getWardsFailure(error){
		console.log(error);
        $('#internetError').modal('show');
	}

    DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFaliure);
    function dropDownSuccess(res){
        if(res.status == true){
            $scope.dropDownData = res.data;
        }
    }
    function dropDownFaliure(error){
        console.log(error);
        $('#internetError').modal('show');
    }

	$scope.wardSelected = function(WID, index){
        $rootScope.loader = "show";
		$scope.buttonDisabled = false;
		$scope.wardID = WID; 
        GetOneWard.get({token: $window.sessionStorage.token, ward_id:WID}, getOneWardsSuccess, getOneWardsFailure);
        function getOneWardsSuccess(res){
            if(res.status == true){
                $rootScope.loader = "hide";
                $scope.ward = res.data;
                $scope.ward.id = "WRD"+res.data.id;
                setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
                },100)
            }
        }
        function getOneWardsFailure(error){
            console.log(error);
            $('#internetError').modal('show');
        }
        
	}

	$scope.createWard = function(dataToBeAdded){
        $scope.disabledButton = "true";
        $rootScope.loader = "show";
        CreateWard.save({
            token: $window.sessionStorage.token,
            ward: dataToBeAdded.name,
            speciality: dataToBeAdded.speciality,
            number_of_beds: dataToBeAdded.noOfBeds,
            description: dataToBeAdded.description
        }, createWardSuccess, createWardFailure);

        function createWardSuccess(res){
            if(res.status == true){
                $scope.addWard = {};
                $scope.modalHeading = "Successful";
                $scope.modalMessage = "New Ward Created";
                $('#noResultFound').modal('show');
                $('#createWard').modal('hide');
                $scope.appointment = {};
                $scope.submitted = false;
                GetAllWards.get({
                    token: $window.sessionStorage.token, 
                    limit: $scope.itemsPerPage, 
                    offset: 0
                }, getWardsSuccess, getWardsFailure);

            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }
        function createWardFailure(error){
            console.log(error);
            $('#internetError').modal('show');
        }
    }
    $scope.updateWard = function(dataToBeAdded){
        console.log(dataToBeAdded);
        $scope.disabledButton = "true";
        $rootScope.loader = "show";
        CreateWard.save({
            token: $window.sessionStorage.token,
            ward_id: dataToBeAdded.id,
            ward: dataToBeAdded.name,
            speciality: dataToBeAdded.department_id,
            number_of_beds: dataToBeAdded.number_of_beds,
            description: dataToBeAdded.description
        }, updateWardSuccess, updateWardFailure);

        function updateWardSuccess(res){
            if(res.status == true){
                $scope.addWard = {};
                $scope.buttonDisabled = true;
                $scope.modalHeading = "Successful";
                $scope.modalMessage = "Ward Updated";
                $('#noResultFound').modal('show');
                $('#updateWard').modal('hide');
                $scope.appointment = {};
                $scope.submitted = false;
                GetAllWards.get({
                    token: $window.sessionStorage.token, 
                    limit: $scope.itemsPerPage, 
                    offset: 0
                }, getWardsSuccess, getWardsFailure);
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }
        function updateWardFailure(error){
            console.log(error);
            $('#internetError').modal('show');
        }
    }

    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.wardsCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        if($scope.selectBox == true){
            GetAllWards.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.selectBoxLimit
            }, getWardsSuccess, getWardsFailure);
        }else{
            GetAllWards.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.itemsPerPage
            }, getWardsSuccess, getWardsFailure);
        }
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        if($scope.selectBox == true){
            GetAllWards.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.selectBoxLimit
            }, getWardsSuccess, getWardsFailure);
        }else{
            GetAllWards.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.itemsPerPage
            }, getWardsSuccess, getWardsFailure);
        }
    }

    $scope.editformsubmission = function(){
        if($scope.submitted == true && $scope.editForm.$invalid == true ){
            return true;
        }
        return false;
    };
    $scope.addformsubmission = function(){
        if($scope.submitted == true && $scope.addForm.$invalid == true ){
            return true;
        }
        return false;
    };

    $scope.deleteWard = function(){
    	$rootScope.loader = "show";
    	DeleteWard.save({
    		token: $window.sessionStorage.token,
    		ward_id: $scope.wardID
    	}, deleteWardSuccess, deleteWardFailure);
    	function deleteWardSuccess(res){
			$scope.buttonDisabled = true;
            $scope.modalHeading = "Successful";
            $scope.modalMessage = "Ward Deleted";
            $('#deleteConfirm').modal('hide');
            $('#noResultFound').modal('show');
			if(res.status == true){
				GetAllWards.get({
					token: $window.sessionStorage.token, 
					limit: $scope.itemsPerPage, 
					offset: 0
				}, getWardsSuccess, getWardsFailure);
			}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
		}
		function deleteWardFailure(error){
			console.log(error);
            $('#internetError').modal('show');
		}
    }

    $scope.bedShematic = function(){
        console.log($scope.wardID);
        $window.location.href = "#/wards-bed-shematic/" + $scope.wardID;
    }

    $scope.sortingByWard = function(){
        if($scope.flagWard == false){
            $scope.sortingWard = "fa-caret-up";
            $scope.sortOrder = "-name";
            $scope.flagWard = true;
            console.log(1, $scope.sortOrder);
        }else{
            $scope.flagWard = false;
            $scope.sortOrder = "name";
            $scope.sortingWard = "fa-caret-down";
            console.log(2, $scope.sortOrder);
        }
    }

    $scope.sortingBySpeciality = function(){
        if($scope.flagSpeciality == false){
            $scope.sortingSpeciality = "fa-caret-up";
            $scope.sortOrder = "-speciality";
            $scope.flagSpeciality = true;
            console.log(1, $scope.sortOrder);
        }else{
            $scope.flagSpeciality = false;
            $scope.sortOrder = "speciality";
            $scope.sortingSpeciality = "fa-caret-down";
            console.log(2, $scope.sortOrder);
        }
    }

    $scope.sortingByBeds = function(){
        if($scope.flagBeds == false){
            $scope.sortingBeds = "fa-caret-up";
            $scope.sortOrder = "-number_of_beds";
            $scope.flagBeds = true;
            console.log(1, $scope.sortOrder, $scope.flagBeds);
        }else{
            $scope.flagBeds = false;
            $scope.sortOrder = "number_of_beds";
            $scope.sortingBeds = "fa-caret-down";
            console.log(2, $scope.sortOrder, $scope.flagBeds);
        }
    }

    $scope.selectBoxValue = function(value){
        $scope.selectBox = true;
        $scope.pageSize = value;
        $scope.selectBoxLimit = value;
        $rootScope.loader = "show";
        $scope.pageNumber = '';
        GetAllWards.get({
            token: $window.sessionStorage.token, 
            offset: ($scope.pageSize * $scope.curPage), limit: value
        }, getWardsSuccess, getWardsFailure);
    }
}]);