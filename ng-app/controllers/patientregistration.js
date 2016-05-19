
var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientRegistrationController', ['$rootScope', function ($rootScope) {
        $rootScope.pageTitle = "EHR - Patient Registration";

//        $scope.includeTemplate = 'views/patient-registration.html';
    }]);
AppEHR.directive('showtab',
        function () {
            return {
                link: function (scope, element, attrs) {
                    element.click(function (e) {
                        e.preventDefault();
                        $(element).tab('show');
                    });
                }
            };
        });