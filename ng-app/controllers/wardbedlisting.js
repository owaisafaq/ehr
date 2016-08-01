var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardBedListingController', ['$scope', '$rootScope', '$window', 'GetAllWards', 'CreateWard', 'DeleteWard', 'DropDownData', 'GetOneWard', function($scope, $rootScope, $window, GetAllWards, CreateWard, DeleteWard, DropDownData, GetOneWard){
	$rootScope.pageTitle = "EHR - Ward Bed Listing";
	$scope.action = '';
	$scope.allWards = [];
    $scope.addWard = {};
    $scope.dropDownData = [];
	$scope.buttonDisabled = true;
	$rootScope.loader = "show";
	$scope.itemsPerPage = 15;
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
			$scope.wardsCount = res.count;
		}
	}
	function getWardsFailure(error){
		console.log(error);
	}

    DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFaliure);
    function dropDownSuccess(res){
        if(res.status == true){
            $scope.dropDownData = res.data;
        }
    }
    function dropDownFaliure(error){
        console.log(error);
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

            }
        }
        function createWardFailure(error){
            console.log(error);
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

            }
        }
        function updateWardFailure(error){
            console.log(error);
        }
    }

    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.wardsCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllWards.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, getWardsSuccess, getWardsFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllWards.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, getWardsSuccess, getWardsFailure);
    }

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
			}
		}
		function deleteWardFailure(error){
			console.log(error);
		}
    }

}]);