var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacyPrescription', ['$scope', '$rootScope', '$window', 'PharmacyPrescription', '$routeParams', function($scope, $rootScope, $window, PharmacyPrescription, $routeParams){
	$rootScope.pageTitle = "EHR - Pharmacy";
	$scope.action = '';
	$scope.hideOptionsStrip = true;
	$rootScope.loader = 'show';
    $scope.offset = 0;
    $scope.itemsPerPage = 15;
    console.log($routeParams.pharmacyID);
    $scope.pharmacyID = $routeParams.pharmacyID;

	PharmacyPrescription.get({
        token: $window.sessionStorage.token,
        offset: $scope.offset,
        limit: $scope.itemsPerPage,
        pharmacy_id: $scope.pharmacyID
    }, pharmanyListSuccess, pharmanyListFailure);

	function pharmanyListSuccess(res){
		if(res.status ==  true){
            $rootScope.loader = 'hide';
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
                return true;
            }
			$scope.allPharmacies = res.data;
			$scope.pharmacyCount = res.count;
			
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}

	function pharmanyListFailure(error){
        $('#internetError').modal('show');
		console.log(error);
	}

	$scope.checkPrescription = function(Pid, Eid, patientID){
		$scope.prescriptionID = Pid;
		$scope.encounterID = Eid;
        $scope.patientID = patientID;
		$scope.hideOptionsStrip = false;
	}

	$scope.goToPrescription = function(){
		$window.location.href = "#/pharmacy-view/" + $scope.pharmacyID + "/" + $scope.prescriptionID /*+ "/" + $scope.encounterID*/ + "/" + $scope.patientID;
	}

    $scope.search = function(item){ // search data by patient name or partient id
        if($scope.query == undefined){
            return true;
        }else{
            if(item.patient_id.toLowerCase().indexOf($scope.query.toLowerCase()) != -1 || item.first_name.toLowerCase().indexOf($scope.query.toLowerCase()) != -1 || item.visit_id.toLowerCase().indexOf($scope.query.toLowerCase()) != -1){
                return true;
            }
        }
    };

    /*PAGINATION*/

    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.pharmacyCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        PharmacyPrescription.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), 
            limit: $scope.itemsPerPage
        }, pharmanyListSuccess, pharmanyListFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        PharmacyPrescription.get({
            token: $window.sessionStorage.token,
            offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
        }, pharmanyListSuccess, pharmanyListFailure);
    }

    // Allergies
    $('body').on('keyup', '.enterKey .keyUpPharmacy', function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != "") {
                $(this).trigger("enterKey");
                console.log(321);
                if($scope.pageNumberPharmacy != undefined && $scope.pageNumberPharmacy != '' && parseInt($scope.pageNumberPharmacy) <= $scope.numberOfPages()){
                    $rootScope.loader = "show";
                    console.log(111);
                    PharmacyPrescription.get({
                        token: $window.sessionStorage.token,
                        offset: ($scope.pageSize * parseInt($scope.pageNumberPharmacy-1)), /*== $scope.pageSize ? 0 : ($scope.pageSize * $scope.pageNumberPharmacy),*/ limit: $scope.itemsPerPage
                    }, pharmanyListSuccess, pharmanyListFailure);
                }
            }
        }
    });

}]);
