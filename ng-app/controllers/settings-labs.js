var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsLabs', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllLabs', 'deleteLab', 'addLab', 'editLab', 'GetLab', 'GetAllLabTests', 'deleteLabTest', 'addLabTest', 'editLabTest', 'GetLabTest', '$timeout', function($scope, $rootScope,$window,$routeParams,GetAllLabs,deleteLab,addLab,editLab,GetLab,GetAllLabTests,deleteLabTest,addLabTest,editLabTest,GetLabTest,$timeout){
	$rootScope.pageTitle = "EHR - Labs";
	$rootScope.loader = "show";
	$scope.itemsPerPage = 15;
	$scope.curPage = 0;
	$scope.curTestPage = 0;
	$scope.pageSize = 15;
	$scope.deleteLabId = 0;
	GetAllLabs.get({
		token: $window.sessionStorage.token,
		offset: 0, limit: $scope.itemsPerPage
	}, GetAllLabsSuccess, GetAllLabsFailure);

	function GetAllLabsSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.LabLists = res.data;
			$scope.labsCount = res.count;
		}
	}
	function GetAllLabsFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	GetAllLabs.get({
		token: $window.sessionStorage.token,
		offset: 0, limit: 0
	}, GetLabsSuccess, GetLabsFailure);

	function GetLabsSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
			}
			$scope.Labs = res.data;
		}
	}
	function GetLabsFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.numberOfPages = function() {
		return Math.ceil($scope.labsCount / $scope.pageSize);
	};

	$scope.paginationNext = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllLabs.get({
			token: $window.sessionStorage.token,
			offset: (pageSize * curPage), limit: $scope.itemsPerPage
		}, GetAllLabsSuccess, GetAllLabsFailure);
	};

	$scope.paginationPrev = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllLabs.get({
			token: $window.sessionStorage.token,
			offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
		}, GetAllLabsSuccess, GetAllLabsFailure);
	};

	$scope.numberOfTestPages = function() {
		return Math.ceil($scope.labTestsCount / $scope.pageSize);
	};

	$scope.paginationNextTest = function(pageSize, curTestPage){
		$rootScope.loader = "show";
		GetAllLabTests.get({
			token: $window.sessionStorage.token,
			offset: (pageSize * curTestPage), limit: $scope.itemsPerPage
		}, GetAllLabTestsSuccess, GetAllLabTestsFailure);
	};

	$scope.paginationPrevTest = function(pageSize, curTestPage){
		$rootScope.loader = "show";
		GetAllLabTests.get({
			token: $window.sessionStorage.token,
			offset: (pageSize - 1) * curTestPage, limit: $scope.itemsPerPage
		}, GetAllLabTestsSuccess, GetAllLabTestsFailure);
	};

	$scope.confirmRemoveLab = function(id){
		$scope.deleteLabId = id;
		$('#confirmation').modal('show');
	};
	$scope.removeLab = function(){
		$rootScope.loader = "show";
		deleteLab.get({
			token: $window.sessionStorage.token,
			lab_id : $scope.deleteLabId
		}, deleteLabSuccess, deleteLabFailure)
	};

	function deleteLabSuccess(res){
		if(res.status == true){
			$scope.deleteLabId = 0;
			$('#confirmation').modal('hide');
			GetAllLabs.get({
				token: $window.sessionStorage.token
			}, GetAllLabsSuccess, GetAllLabsFailure);
		}
	}

	function deleteLabFailure(error){
		console.log(error);
		$('#confirmation').modal('hide');
		$('#internetError').modal('show');
	}

	$scope.createLab = function (labData){
		addLab.save({
			token : $window.sessionStorage.token,
			name : labData.name,
			code : labData.code,
			description : labData.description
		},addLabSuccess,addLabFailure);
	};
	function addLabSuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addLabBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.labData = {};
			$scope.submitted = false;
			$timeout(function(){
				$scope.message = false;
				$('#addLab').modal('hide');
				$scope.errorMessage = "";
			},1500);
			GetAllLabs.get({
				token: $window.sessionStorage.token
			}, GetAllLabsSuccess, GetAllLabsFailure);
		} else {
			$scope.hideLoader = "hide";
			$scope.addLabBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addLabFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	$scope.labDetail = function(id){
		GetLab.get({
			token: $window.sessionStorage.token,
			lab_id : id
		}, GetLabSuccess, GetLabFailure);
	};
	function GetLabSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			$scope.editLabData = res.data;
			$('#editLab').modal('show');
		}
	}
	function GetLabFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.updateLab = function(editLabData){
		$rootScope.loader = "show";
		editLab.save({
			token : $window.sessionStorage.token,
			lab_id : editLabData.id,
			name : editLabData.name,
			code : editLabData.code,
			description : editLabData.description
		},editLabSuccess,editLabFailure);
	};

	function editLabSuccess(res){ // on success
		if (res.status == true) {
			$rootScope.loader = 'hide';
			$scope.message = true;
			$scope.updateLabBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			GetAllLabs.get({
				token: $window.sessionStorage.token
			}, GetAllLabsSuccess, GetAllLabsFailure);
			$timeout(function(){
				$scope.message = false;
				$scope.submitted = false;
				$('#editLab').modal('hide');
				$scope.errorMessage = "";
				$scope.editLabData = {};
			},1500);
		} else {
			$rootScope.loader = "hide";
			$scope.updateLabBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function editLabFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	GetAllLabTests.get({
		token: $window.sessionStorage.token,
		offset: 0, limit: $scope.itemsPerPage
	}, GetAllLabTestsSuccess, GetAllLabTestsFailure);

	function GetAllLabTestsSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.LabTests = res.data;
			$scope.labTestsCount = res.count;
		}
	}
	function GetAllLabTestsFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.confirmRemoveLabTest = function(id){
		$scope.deleteLabTestId = id;
		$('#confirmation').modal('show');
	};
	$scope.removeLabTest = function(){
		$rootScope.loader = "show";
		deleteLabTest.get({
			token: $window.sessionStorage.token,
			lab_test_id : $scope.deleteLabTestId
		}, deleteLabTestSuccess, deleteLabTestFailure)
	};

	function deleteLabTestSuccess(res){
		if(res.status == true){
			$scope.deleteLabTestId = 0;
			$('#confirmation').modal('hide');
			GetAllLabTests.get({
				token: $window.sessionStorage.token
			}, GetAllLabTestsSuccess, GetAllLabTestsFailure);
		}
	}

	function deleteLabTestFailure(error){
		console.log(error);
		$('#confirmation').modal('hide');
		$('#internetError').modal('show');
	}

	$scope.cancelDelete = function(){
		$scope.deleteLabId = 0;
		$scope.deleteLabTestId = 0;
	}

	$scope.createLabTest = function (labTestData){
		addLabTest.save({
			token : $window.sessionStorage.token,
			name : labTestData.name,
			code : labTestData.code,
			cost : labTestData.cost,
			description : labTestData.description,
			lab_id : labTestData.lab_id
		},addLabTestSuccess,addLabTestFailure);
	};
	function addLabTestSuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addLabTestBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.labTestData = {};
			$scope.submitted = false;
			$timeout(function(){
				$scope.message = false;
				$('#addlabtest').modal('hide');
				$scope.errorMessage = "";
			},1500);
			GetAllLabTests.get({
				token: $window.sessionStorage.token
			}, GetAllLabTestsSuccess, GetAllLabTestsFailure);
		} else {
			$scope.hideLoader = "hide";
			$scope.addLabTestBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addLabTestFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}


	$scope.labTestDetail = function(id){
		GetLabTest.get({
			token: $window.sessionStorage.token,
			lab_test_id : id
		}, GetLabTestSuccess, GetLabTestFailure);
	};
	function GetLabTestSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			$scope.editLabTestData = res.data;
			$scope.editLabTestData.code = res.data.lonic_code;
			$scope.editLabTestData.lab_id = res.data.lab;
			setTimeout(function () {
				$('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
			},100);
			$('#editlabtest').modal('show');
		}
	}
	function GetLabTestFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.updateLabTest = function(editLabTestData){
		$rootScope.loader = "show";
		editLabTest.save({
			token : $window.sessionStorage.token,
			lab_test_id : editLabTestData.id,
			lab_id : editLabTestData.lab_id,
			name : editLabTestData.name,
			code : editLabTestData.code,
			cost : editLabTestData.cost,
			description : editLabTestData.description
		},editLabTestSuccess,editLabTestFailure);
	};

	function editLabTestSuccess(res){ // on success
		if (res.status == true) {
			$rootScope.loader = 'hide';
			$scope.message = true;
			$scope.updateLabTestBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			GetAllLabTests.get({
				token: $window.sessionStorage.token
			}, GetAllLabTestsSuccess, GetAllLabTestsFailure);
			$timeout(function(){
				$scope.message = false;
				$scope.submitted = false;
				$('#editlabtest').modal('hide');
				$scope.errorMessage = "";
				$scope.editLabTestData = {};
			},1500);
		} else {
			$rootScope.loader = "hide";
			$scope.updateLabTestBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function editLabTestFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}
}]);
