var AppEHR = angular.module('AppEHR');

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
