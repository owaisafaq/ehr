var AppEHR = angular.module('AppEHR');

AppEHR.directive('showtab', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function (e) {
                e.preventDefault();
                $(element).tab('show');
            });
        }
    };
});

AppEHR.directive('modal', function ($window) {
    return {
         templateUrl: function(elem,attrs) {
           return "views/" + attrs.templateUrl
        },     
        controller : "@",
        name:"controllerName", 
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function (value) {
                if (value == true) {
                    $(element).modal('show');
                }
                else {
                    $(element).modal('hide');
                }
            });
            $(element).on('shown.bs.modal', function () {
                scope.$$phase || scope.$apply(function(){
                    scope.$parent.$parent[attrs.visible] = true;
                });
            });
            $(element).on('hidden.bs.modal', function () {
                scope.$$phase || scope.$apply(function(){
                    var abc = $("body");
                    var bbb = abc.hasClass('modal-open');
                    var child = abc.children();
                    var au = child[1];
                    var bbb2 = au.className;
                    if(bbb == false && bbb2 == 'modal-backdrop fade'){
                        child[1].remove();
                    }
                    scope.$parent.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

function Modal(templateUrl, controller) {
    return {
        templateUrl: templateUrl,
        controller: controller,
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function (value) {
                if (value == true) {
                    $(element).modal('show');
                }
                else {
                    $(element).modal('hide');
                }
            });

            $(element).on('shown.bs.modal', function () {
                scope.$$phase || scope.$apply(function(){
                    scope.$parent.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$$phase || scope.$apply(function(){
                    scope.$parent.$parent[attrs.visible] = false;
                });
            });
        }
    };
}