var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsLabs', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllLabs', 'deleteLab', 'addLab', 'editLab', 'GetLab', '$timeout', function($scope, $rootScope,$window,$routeParams,GetAllLabs,deleteLab,addLab,editLab,GetLab,$timeout){
	$rootScope.pageTitle = "EHR - Labs";
	$rootScope.loader = "show";
	$scope.itemsPerPage = 15;
	$scope.curPage = 0;
	$scope.pageSize = 15;
	$scope.deleteLabId = 0;
	GetAllLabs.get({
		token: $window.sessionStorage.token
	}, GetAllLabsSuccess, GetAllLabsFailure);

	function GetAllLabsSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.LabLists = res.data;
			console.log($scope.LabLists);
			$scope.labsCount = res.count;
		}
	}
	function GetAllLabsFailure(error) {
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
		}, GetAllLabSuccess, GetAllLabFailure);
	};
	function GetAllLabSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			$scope.editLabData = res.data;
			$('#editLab').modal('show');
		}
	}
	function GetAllLabFailure(error) {
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
}]);
