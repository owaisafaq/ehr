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

AppEHR.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

AppEHR.directive('alphabetsOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^a-z A-Z]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

AppEHR.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});

AppEHR.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
/*AppEHR.directive('alphabetsOnly', [allowPatternDirective]);
function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function(tElement, tAttrs) {
            return function(scope, element, attrs) {
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                        event.preventDefault();
                        return false;
                    }

                });
            };
        }
    };
} */