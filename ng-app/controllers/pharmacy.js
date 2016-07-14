var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacy', ['$scope', '$rootScope', 'getPharmacy', '$window','Countries', 'States', '$routeParams','City','addPharmacy','$timeout', 'UpdatePharmacy', 'DeletePharmacy', function ($scope, $rootScope, getPharmacy, $window,Countries, States, $routeParams,City,addPharmacy,$timeout, UpdatePharmacy, DeletePharmacy) {
	$rootScope.pageTitle = "EHR - Pharmacy";
	$scope.displayInfo = {};
	$scope.pharmacyData = {};
	$scope.pharmacyDataEdit = {};
	$rootScope.loader = "show";
	$scope.enableOptions = false;
	$scope.action = '';
	getPharmacy.get({
		token: $window.sessionStorage.token
	}, getPharmacySuccess, getPharmacyFailure);

	function getPharmacySuccess(res) {
		if (res.status == true) {
			$scope.pharmacyLists = res.data;
			$scope.pharmacyCount = res.count;
			$rootScope.loader = "hide";
		}
	}

	function getPharmacyFailure(error) {
		console.log(error);
	}
	$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	Countries.get({token: $window.sessionStorage.token}, countrySuccess, countryFailed);

	function countrySuccess(res) {
		if (res.status == true) {
			$scope.countries = res.data;
		} else {
			console.log(res);
		}
	}

	function countryFailed(error) {
		console.log(error);
	}

	$scope.addressStateByCountry = function (country) {
		$scope.disabledDropdown = true;
		States.get({token: $window.sessionStorage.token, country_id: country}, stateSuccess, stateFailed);
		function stateSuccess(res) {
			if (res.status == true && res.data.length > 0) {
				$scope.states = res.data;
				$scope.disabledDropdown = false;
			}
		}
		function stateFailed(error) {
			console.log(error);
		}
	};

	$scope.addressCityByState = function (state) {
		City.get({token: $window.sessionStorage.token, state_id: state}, citySuccess, cityFailed);
		function citySuccess(res) {
			if (res.status == true && res.data.length > 0) {
				$scope.cities = res.data;
				$scope.disabledDropdown = false;
			}
		}
		function cityFailed(error) {
			console.log(error);
		}

	};

	$scope.createPharmacy = function (pharmacyData){
		addPharmacy.save({
			token : $window.sessionStorage.token,
			name : pharmacyData.name,
			contact_person : pharmacyData.contact_person,
			city : pharmacyData.city,
			state : pharmacyData.state,
			country : pharmacyData.countries,
			address_1 : pharmacyData.address_1,
			address_2 : pharmacyData.address_2,
			email : pharmacyData.email,
			work_phone : pharmacyData.work_phone,
			post_code :pharmacyData.post_code
		},addPharmacySuccess,addPharmacyFailure);
	};
	function addPharmacySuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addPharmacyBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.pharmacyData = {};
			$scope.submitted = false;
			$timeout(function(){
				$scope.message = false;
				$('#addPharmacy').modal('hide');
				$scope.errorMessage = "";
				$('#s2id_autogen1 .select2-chosen').text('Select Country');
				$('#s2id_autogen3 .select2-chosen').text('Select State');
				$('#s2id_autogen5 .select2-chosen').text('Select City');
			},1500);
		} else {
			$scope.hideLoader = "hide";
			$scope.addPharmacyBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addPharmacyFailure(error){ // on failure
		console.log(error);
	}

	/*MUZAMMIL WORK*/

	$scope.pharmacySelected = function(pharmacyID, index){
		$scope.enableOptions = true;
		$scope.pharmacyID = pharmacyID;
		//if($scope.pharmacyLists.length == index)
			$scope.pharmacyDataEdit = $scope.pharmacyLists[index];
			console.log($scope.pharmacyDataEdit);
		//else $scope.pharmacyDataEdit = $scope.pharmacyLists[index];
	}

	$scope.updatePharmacy = function(pharmacyData){
		$rootScope.loader = "show";
		UpdatePharmacy.save({
			token : $window.sessionStorage.token,
			pharmacy_id : pharmacyData.id,
			name : pharmacyData.name,
			contact_person : pharmacyData.contact_person,
			city : pharmacyData.city,
			state : pharmacyData.state,
			country : pharmacyData.countries,
			address_1 : pharmacyData.address_1,
			address_2 : pharmacyData.address_2,
			email : pharmacyData.email,
			work_phone : pharmacyData.work_phone,
			post_code :pharmacyData.post_code
		},editPharmacySuccess,editPharmacyFailure);
	}

	function editPharmacySuccess(res){ // on success
		console.log(res);
		if (res.status == true) {
			$rootScope.loader = 'hide';
			$scope.message = true;
			$scope.addPharmacyBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			//$scope.pharmacyData = {};
			$timeout(function(){
				$scope.message = false;
				$('#editPharmacy').modal('hide');
				$scope.errorMessage = "";
				$('#s2id_autogen1 .select2-chosen').text('Select Country');
				$('#s2id_autogen3 .select2-chosen').text('Select State');
				$('#s2id_autogen5 .select2-chosen').text('Select City');
			},1500);
		} else {
			$rootScope.loader = "hide";
			$scope.addPharmacyBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function editPharmacyFailure(error){ // on failure
		console.log(error);
	}

	$scope.removePharmacy = function(){
		$rootScope.loader = "show";
		DeletePharmacy.get({
			token: $window.sessionStorage.token,
			pharmacy_id : $scope.pharmacyID
		}, deletePharmacySuccess, deletePharmacyFailure)
	}

	function deletePharmacySuccess(res){
		console.log(res);
		if(res.status == true){
			$scope.enableOptions = false;
			getPharmacy.get({
				token: $window.sessionStorage.token
			}, getPharmacySuccess, getPharmacyFailure);
		}
	}

	function deletePharmacyFailure(error){
		console.log(error);
	}

	$scope.pharmacyDropdown = function(){
		States.get({token: $window.sessionStorage.token, country_id: $scope.pharmacyDataEdit.country}, stateSuccess, stateFailed);
		function stateSuccess(res) {
			if (res.status == true && res.data.length > 0) {
				$scope.states = res.data;
				$scope.disabledDropdown = false;
			}
		}
		function stateFailed(error) {
			console.log(error);
		}
		City.get({token: $window.sessionStorage.token, state_id: $scope.pharmacyDataEdit.state}, citySuccess, cityFailed);
		function citySuccess(res) {
			if (res.status == true && res.data.length > 0) {
				$scope.cities = res.data;
				$scope.disabledDropdown = false;
			}
		}
		function cityFailed(error) {
			console.log(error);
		}
	}

	$scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.pharmacyCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        getPharmacy.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, getPharmacySuccess, getPharmacyFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        getPharmacy.get({
            token: $window.sessionStorage.token,
            offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
        }, getPharmacySuccess, getPharmacyFailure);
    }

}]);