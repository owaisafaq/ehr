var AppEHR = angular.module('AppEHR');

AppEHR.controller('loginController', ['$scope', '$window', '$http', 'AUTH', function($scope, $window, $http, AUTH){
	$scope.pageTitle = "EHR - Login";
	$window.sessionStorage.clear();
	$scope.class = "hide";
	$scope.login = function (email, password){
		console.log(email + "-" + password);
		if(email != undefined && password != undefined){
			console.log("Login");
			$scope.errorMessage = '';
			$window.sessionStorage.email = email;
			$window.sessionStorage.password = password;
			var postData = {};
			postData.email = $window.sessionStorage.email;
			postData.password = $window.sessionStorage.password;
			console.log(postData);

			$http.post(serverPath +  'user_login', postData, function(data){
				console.log(data);
			});

			/*AUTH.get({},function (data) {
				if(data != undefined){
					console.log(data);
				}else{
					console.log(data);
				}
			});*/
			//$window.location.href = '#/patient-registration';
		}else{
			$scope.errorMessage = "Email or Password is invalid";
		}
	};
}]);