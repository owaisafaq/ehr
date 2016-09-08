var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsBedShematicController', ['$scope', '$rootScope', '$window', '$routeParams', 'WardOccupancy', 'AddBed', 'DeleteBed', 'EditBed', function($scope, $rootScope, $window, $routeParams, WardOccupancy, AddBed, DeleteBed, EditBed){
	$rootScope.pageTitle = "EHR - Wards Bed Schematic";
	$scope.allBedOccupancy = [];
    $scope.itemsPerPage = 15;
    $scope.wardID = $routeParams.wardID;
    $rootScope.loader = "show";
	WardOccupancy.get({
		token: $window.sessionStorage.token,
		ward_id: $routeParams.wardID
		/*offset: 0,
		limit: $scope.itemsPerPage*/
	}, bedOccupancySuccess, bedOccupancyFailure);

	function bedOccupancySuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
            if(res.data.length == 0){
                $scope.modalHeading = "Result";
                $scope.modalMessage = "No Result Found";
                $('#noResultFound').modal('show');
                $scope.allBedOccupancy = [];
                //$scope.wardsCount = 0;
                return true;
            }
			$scope.allBedOccupancy = res.data;
			$scope.bedCount = res.count;
		}
	}

	function bedOccupancyFailure(error){
		console.log(error);
        $('#internetError').modal('show');
	}

	$scope.curPage = 0;
    $scope.pageSize = 15;
    /*$scope.numberOfPages = function() {
      return Math.ceil($scope.bedCount / $scope.pageSize);
    };*/

    /*$scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        WardOccupancy.get({
            token: $window.sessionStorage.token,
            ward_id: $routeParams.wardID,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupancySuccess, bedOccupancyFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        WardOccupancy.get({
            token: $window.sessionStorage.token,
            ward_id: $routeParams.wardID,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupancySuccess, bedOccupancyFailure);
    }*/

    /*> div:not(.active),.folder_create_con > div:not(.active)*/
    $('body').on('click', '.bed-box ', function (){
        // if($(this).hasClass('bed-selected')){
            $('.bed-box').removeClass('bed-selected');
        // }else{
            $(this).addClass('bed-selected');
        // }
        if($('.bed-selected').length == 0){
           $('.delete').hide();
           $('.edit').hide();
        }
        else{
            $('.delete').show();
            $('.edit').show();   
        }
        setTimeout(function () {
            $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            console.log(11111);
        },100);
        $scope.BEDID = $(this).attr('id');
        $scope.bedStatus = $(this).attr('status');
    });
    $('.delete').hide();
    $('.edit').hide();
    /*$scope.selectBed = function(selectedID){
        console.log(selectedID);
        document.getElementById('bedID'+selectedID).className = 'bed-selected';
    }*/

    $scope.newBed = function(){
        $rootScope.loader = "show";
        AddBed.save({token: $window.sessionStorage.token, ward_id: $scope.wardID}, newBedSuccess, newBedFailure);
    }
    function newBedSuccess(res){
        $rootScope.loader = "hide";
        if(res.status == true){
            console.log('added');
            WardOccupancy.get({
                token: $window.sessionStorage.token,
                ward_id: $routeParams.wardID
                /*offset: 0,
                limit: $scope.itemsPerPage*/
            }, bedOccupancySuccess, bedOccupancyFailure);
        }
    }
    function newBedFailure(error){
        console.log(error);
    }

    $scope.deleteBed = function(bedID){
        $routeParams.loader = "show";
        DeleteBed.save({token: $window.sessionStorage.token, ward_id: $routeParams.wardID, bed_id: $scope.BEDID}, deleteBedSuccess, deleteBedFailure);
        function deleteBedSuccess(res){
            $routeParams.loader = "hide";
            console.log(res);
            if(res.status == true){
                $('#removeBed').modal('hide');
                $('.delete').hide();
                $('.edit').hide();
                WardOccupancy.get({
                    token: $window.sessionStorage.token,
                    ward_id: $routeParams.wardID
                    /*offset: 0,
                    limit: $scope.itemsPerPage*/
                }, bedOccupancySuccess, bedOccupancyFailure);
            }
        }
        function deleteBedFailure(error){
            console.log(error);
            $routeParams.loader = "hide";
        }
    }

    $scope.updateBed = function(bedStatus){
        console.log(bedStatus, $scope.BEDID);
        $rootScope.loader = "show";
        EditBed.save({token: $window.sessionStorage.token, ward_id: $routeParams.wardID, bed_id:$scope.BEDID, status: bedStatus}, updateBedSuccess, updateBedFailure);
        function updateBedSuccess(res){
            $rootScope.loader = "hide";
            console.log(res);
            if(res.status == true){
                $scope.errorClass = "success";
                $scope.statusMsg = "Status Successfully Changed";
                WardOccupancy.get({
                    token: $window.sessionStorage.token,
                    ward_id: $routeParams.wardID
                    /*offset: 0,
                    limit: $scope.itemsPerPage*/
                }, bedOccupancySuccess, bedOccupancyFailure);
            }else{
                $scope.statusMsg = res.message;
                $scope.errorClass = "error-header";
            }
        }
        function updateBedFailure(error){
            console.log(error);
        }
    }

    $scope.statusValue = function(value){
        $scope.bedStatus = value;
    }

}]);