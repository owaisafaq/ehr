var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsUsers', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllUsers', 'GetUser', 'deleteUser', 'addUser', 'editUser', '$timeout', 'GetAllRoles', function($scope,$rootScope,$window,$routeParams,GetAllUsers,GetUser,deleteUser,addUser,editUser,$timeout,GetAllRoles){
	$rootScope.pageTitle = "EHR - Users";
	$rootScope.loader = "show";
	$scope.itemsPerPage = 15;
	$scope.curPage = 0;
	$scope.pageSize = 15;
	$scope.deleteUserId = 0;
	GetAllUsers.get({
		token: $window.sessionStorage.token,
		offset: 0, limit: $scope.itemsPerPage
	}, GetAllUsersSuccess, GetAllUsersFailure);

	function GetAllUsersSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.UserLists = res.data;
			$scope.usersCount = res.count;
		}
	}
	function GetAllUsersFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.numberOfPages = function() {
		return Math.ceil($scope.usersCount / $scope.pageSize);
	};

	$scope.paginationNext = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllUsers.get({
			token: $window.sessionStorage.token,
			offset: (pageSize * curPage), limit: $scope.itemsPerPage
		}, GetAllUsersSuccess, GetAllUsersFailure);
	};

	$scope.paginationPrev = function(pageSize, curPage){
		$rootScope.loader = "show";
		GetAllUsers.get({
			token: $window.sessionStorage.token,
			offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
		}, GetAllUsersSuccess, GetAllUsersFailure);
	};

	$scope.confirmRemoveUser = function(id){
		$scope.deleteUserId = id;
		$('#confirmation').modal('show');
	};
	
	$scope.removeUser = function(){
		$rootScope.loader = "show";
		deleteUser.get({
			token: $window.sessionStorage.token,
			user_id : $scope.deleteUserId
		}, deleteUserSuccess, deleteUserFailure)
	};

	function deleteUserSuccess(res){
		if(res.status == true){
			$scope.deleteUserId = 0;
			$('#confirmation').modal('hide');
			GetAllUsers.get({
				token: $window.sessionStorage.token
			}, GetAllUsersSuccess, GetAllUsersFailure);
		}
	}

	function deleteUserFailure(error){
		console.log(error);
		$('#confirmation').modal('hide');
		$('#internetError').modal('show');
	}

	$scope.createUser = function (userData){
		addUser.save({
			token : $window.sessionStorage.token,
			name : userData.name,
			first_name : userData.first_name,
			last_name : userData.last_name,
			telephone_number : userData.telephone_number,
			email : userData.email,
			role_id : userData.role_id
		},addUserSuccess,addUserFailure);
	};
	function addUserSuccess(res){ // on success
		if (res.status == true) {
			$scope.hideLoader = 'hide';
			$scope.message = true;
			$scope.addUserBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			$scope.userData = {};
			$scope.submitted = false;
			$timeout(function(){
				$scope.message = false;
				$('#addUser').modal('hide');
				$scope.errorMessage = "";
			},1500);
			GetAllUsers.get({
				token: $window.sessionStorage.token
			}, GetAllUsersSuccess, GetAllUsersFailure);
		} else {
			$scope.hideLoader = "hide";
			$scope.addUserBtn	 = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function addUserFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	$scope.userDetail = function(id){
		GetUser.get({
			token: $window.sessionStorage.token,
			user_id : id
		}, GetUserSuccess, GetUserFailure);
	};
	function GetUserSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			$scope.editUserData = res.data;
			$timeout(function(){
				$('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
			},100);
			$('#editUser').modal('show');
		}
	}
	function GetUserFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.updateUser = function(editUserData){
		$rootScope.loader = "show";
		editUser.save({
			token : $window.sessionStorage.token,
			user_id : editUserData.id,
			name : editUserData.name,
			first_name : editUserData.first_name,
			last_name : editUserData.last_name,
			telephone_number : editUserData.telephone_number,
			email : editUserData.email
		},editUserSuccess,editUserFailure);
	};

	function editUserSuccess(res){ // on success
		if (res.status == true) {
			$rootScope.loader = 'hide';
			$scope.message = true;
			$scope.updateUserBtn = false;
			$scope.errorMessage = res.message;
			$scope.messageType = 'alert-success';
			$scope.errorSymbol = 'fa fa-check';
			GetAllUsers.get({
				token: $window.sessionStorage.token
			}, GetAllUsersSuccess, GetAllUsersFailure);
			$timeout(function(){
				$scope.message = false;
				$scope.submitted = false;
				$('#editUser').modal('hide');
				$scope.errorMessage = "";
				$scope.editUserData = {};
			},1500);
		} else {
			$rootScope.loader = "hide";
			$scope.updateUserBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
		}
	}
	function editUserFailure(error){ // on failure
		console.log(error);
		$('#internetError').modal('show');
	}

	GetAllRoles.get({
		token: $window.sessionStorage.token,
		offset: 0, limit: 0
	}, GetAllRolesSuccess, GetAllRolesFailure);
	function GetAllRolesSuccess(res) {
		$rootScope.loader = "hide";
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
			}
			$scope.Roles = res.data;
		}
	}
	function GetAllRolesFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}
}]);
