var AppEHR = angular.module('AppEHR');
AppEHR.controller('wardsBedOccupancyController', ['$scope', '$rootScope', '$window', '$routeParams', 'BedOccupancy', function ($scope, $rootScope, $window, $routeParams, BedOccupancy) {
    $rootScope.pageTitle = "EHR - Wards Bed Occupacy";
    $scope.allBedOccupancy = [];
    $scope.itemsPerPage = 15;
    $rootScope.loader = "show";
    $scope.flagSpeciality = false;
    $scope.flagWard = false;
    $scope.flagTBeds = false;
    $scope.flagABeds = false;
    $scope.flagClossed = false;
    $scope.flagOccupied = false;
    $scope.flagWaiting = false;
    $scope.flagExpected = false;
    $scope.sortingClassSpeciality = $scope.sortingClassWard = $scope.sortingClassTBeds = $scope.sortingClassABeds = $scope.sortingClassClosed = $scope.sortingClassClosed = $scope.sortingClassWaiting = $scope.sortingClassExpected = "fa-caret-down";
    BedOccupancy.get({
        token: $window.sessionStorage.token, 
        ward_id: $routeParams.wardID,
        offset: 0,
        limit: $scope.itemsPerPage
    }, bedOccupanySuccess, bedOccupanyFailure);
    function bedOccupanySuccess(res){
        if(res.status == true){
            $rootScope.loader = "hide";
            if(res.data.length == 0){
                $scope.modalHeading = "Result";
                $scope.modalMessage = "No Record Found";
                $('#noResultFound').modal('show');
                return true;
            }
            $scope.allBedOccupancy = res.data;
            $scope.bedCount = res.count;
        }
    }

    function bedOccupanyFailure(error){
        console.log(error);
        $('#internetError').modal('show');
    }
    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.bedCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        BedOccupancy.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupanySuccess, bedOccupanyFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        BedOccupancy.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupanySuccess, bedOccupanyFailure);
    }
    
    $scope.sortingBySpeciality = function(){
        if($scope.flagSpeciality == false){
            console.log(1);
            $scope.sortingClassSpeciality = "fa-caret-up";
            $scope.sortOrderSpeciality = "-speciality";
            $scope.flagSpeciality = true;
        }else{
            console.log(2);
            $scope.flagSpeciality = false;
            $scope.sortOrderSpeciality = "speciality";
            $scope.sortingClassSpeciality = "fa-caret-down";
        }
    }
    $scope.sortingByWard = function(){
        if($scope.flagWard == false){
            console.log(1);
            $scope.sortingClassWard = "fa-caret-up";
            $scope.sortOrderWard = "-name";
            $scope.flagWard = true;
        }else{
            console.log(2);
            $scope.flagWard = false;
            $scope.sortOrderWard = "name";
            $scope.sortingClassWard = "fa-caret-down";
        }
    }
    $scope.sortingTBeds = function(){
        if($scope.flagTBeds == false){
            console.log(1);
            $scope.sortingClassTBeds = "fa-caret-up";
            $scope.sortOrderTBeds = "-number_of_beds";
            $scope.flagTBeds = true;
        }else{
            console.log(2);
            $scope.flagTBeds = false;
            $scope.sortOrderTBeds = "number_of_beds";
            $scope.sortingClassTBeds = "fa-caret-down";
        }
    }
    $scope.sortingByABeds = function(){
        if($scope.flagABeds == false){
            console.log(1);
            $scope.sortingClassABeds = "fa-caret-up";
            $scope.sortOrderABeds = "-available_beds";
            $scope.flagABeds = true;
        }else{
            console.log(2);
            $scope.flagABeds = false;
            $scope.sortOrderABeds = "available_beds";
            $scope.sortingClassABeds = "fa-caret-down";
        }
    }
    $scope.sortingByClosed = function(){
        if($scope.flagClossed == false){
            console.log(1);
            $scope.sortingClassClosed = "fa-caret-up";
            $scope.sortOrderClosed = "-number_of_beds_closed";
            $scope.flagClossed = true;
        }else{
            console.log(2);
            $scope.flagClossed = false;
            $scope.sortOrderClosed = "number_of_beds_closed";
            $scope.sortingClassClosed = "fa-caret-down";
        }
    }
    $scope.sortingByOccupied = function(){
        if($scope.flagOccupied == false){
            console.log(1);
            $scope.sortingClassClosed = "fa-caret-up";
            $scope.sortOrderClosed = "-number_of_beds_occupied";
            $scope.flagOccupied = true;
        }else{
            console.log(2);
            $scope.flagOccupied = false;
            $scope.sortOrderClosed = "number_of_beds_occupied";
            $scope.sortingClassClosed = "fa-caret-down";
        }
    }
    $scope.sortingWaiting = function(){
        if($scope.flagWaiting == false){
            console.log(1);
            $scope.sortingClassWaiting = "fa-caret-up";
            $scope.sortOrderWaiting = "-patients_wating";
            $scope.flagWaiting = true;
        }else{
            console.log(2);
            $scope.flagWaiting = false;
            $scope.sortOrderWaiting = "patients_wating";
            $scope.sortingClassWaiting = "fa-caret-down";
        }
    }
    $scope.sortingExpected = function(){
        if($scope.flagExpected == false){
            console.log(1);
            $scope.sortingClassExpected = "fa-caret-up";
            $scope.sortOrderExpected = "-expected_discharge_date";
            $scope.flagExpected = true;
        }else{
            console.log(2);
            $scope.flagExpected = false;
            $scope.sortOrderExpected = "expected_discharge_date";
            $scope.sortingClassExpected = "fa-caret-down";
        }
    }
}]);