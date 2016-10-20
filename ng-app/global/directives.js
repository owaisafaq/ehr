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

AppEHR.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

AppEHR.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined)
                    return ''
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
                if (inputValue == undefined)
                    return ''
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
            scope.$watch(attrs.dynamic, function (html) {
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
AppEHR.directive('fileChange', function () {

    var linker = function ($scope, element, attributes) {
        // onChange, push the files to $scope.files.
        element.bind('change', function (event) {
            var files = event.target.files;
            $scope.$apply(function () {
                for (var i = 0, length = files.length; i < length; i++) {
                    $scope.files.push(files[i]);
                }
            });
        });
    };

    return {
        restrict: 'A',
        link: linker
    };
});
AppEHR.service('fileUpload', ['$http', '$rootScope', '$interval', 'ListFolderArchives', '$window', 'GetResourcesByFolderArchives', function ($http, $rootScope, $interval, ListFolderArchives, $window, GetResourcesByFolderArchives) {
    this.uploadFileToUrl = function(file, patientID, followUpID, uploadUrl){
        var fd = new FormData();
        //fd.append('patient_archive', file);
        fd.patient_archive = [];
        for (var i in file) {
            fd.patient_archive.push(file[i]);
        }
        fd.patient_id = patientID;
        fd.follow_up_parent_id = followUpID;
        console.log(fd);

        // CONFIRMATION.
        function transferComplete(e) {
            alert("Files uploaded successfully.");
        }
        
        $http.post(uploadUrl, fd, {
            transformRequest: function(data) {
                var formData = new FormData();
                formData.patient_archive = {};
                formData.append("patient_archive", angular.toJson(file));
                for (var i = 0; i < file.length; i++) {
                    formData.append("patient_archive", file[i]);
                    //formData.patient_archive.push(file[i]);
                }
                return formData; //NOTICE THIS RETURN WHICH WAS MISSING
            },
            headers: {'Content-Type': undefined}
        }).success(function(res){
            console.log(res);
            $rootScope.loader = 'hide';
            $rootScope.fileUploadMessage = 'File successfully uploaded!';
            ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: patientID, /*$window.sessionStorage.patient_id*/ followup_parent_id: followUpID}, listFolderSuccess, listFolderFailure);
            function listFolderSuccess(res){
                if(res.status == true){
                    $rootScope.foldersArchive = [];
                    $rootScope.foldersArchive = res.data;
                }
            }
            function listFolderFailure(error){
                console.log(error);
            }
            GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: patientID, /*$window.sessionStorage.patient_id*/ followup_parent_id: followUpID}, nestedFolderSuccess, nestedFolderFailure);
            function nestedFolderSuccess(res){
                if(res.status == true){
                    //$scope.backButtonArchive = false;
                    //$scope.foldersArchive = [];
                    $rootScope.archives = [];
                    $rootScope.archives = res.data;
                }
            }

            function nestedFolderFailure(error){
                console.log(error);
            }
            /*$interval(function() {
                $('#fileUploader').modal('hide');
            }, 3000);*/
            
        }).error(function(){
            console.log(101);
            $rootScope.fileUploadMessage = 'Failed to upload';
        });
    }
}]);
AppEHR.directive('myMaxlength', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var maxlength = Number(attrs.myMaxlength);
            function fromUser(text) {
                if (text.length > maxlength) {
                    var transformedInput = text.substring(0, maxlength);
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                    return transformedInput;
                }
                return text;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
AppEHR.directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                return '' + val;
            });
        }
    };
});
AppEHR.directive('phoneNumber', [allowPatternDirective]);
function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function (tElement, tAttrs) {
            return function (scope, element, attrs) {
                element.bind("keypress", function (event) {
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
}


AppEHR.directive('myDatePicker', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                // timeout internals are called once directive rendering is complete
                $timeout(function () {
                    $(elem).datepicker({autoclose: true, todayHighlight: true, format: 'yyyy-mm-dd'});
                });
            }
        };
    }]);
AppEHR.directive('myDropDown', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                // timeout internals are called once directive rendering is complete
                $timeout(function () {
                    $(elem).select2({minimumResultsForSearch: Infinity});
                });
            }
        };
    }]);

AppEHR.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: {
      numPages: '=',
      currentPage: '=',
      onSelectPage: '&'
    },
    templateUrl: 'pagination.html',
    replace: true,
    link: function(scope) {
      scope.$watch('numPages', function(value) {
        scope.pages = [];
        for(var i=1;i<=value;i++) {
          scope.pages.push(i);
        }
        if ( scope.currentPage > value ) {
          scope.selectPage(value);
        }
      });
      scope.noPrevious = function() {
        return scope.currentPage === 1;
      };
      scope.noNext = function() {
        return scope.currentPage === scope.numPages;
      };
      scope.isActive = function(page) {
        return scope.currentPage === page;
      };

      scope.selectPage = function(page) {
        if ( ! scope.isActive(page) ) {
          scope.currentPage = page;
          scope.onSelectPage({ page: page });
        }
      };

      scope.selectPrevious = function() {
        if ( !scope.noPrevious() ) {
          scope.selectPage(scope.currentPage-1);
        }
      };
      scope.selectNext = function() {
        if ( !scope.noNext() ) {
          scope.selectPage(scope.currentPage+1);
        }
      };
    }
  };
});
angular.module('AppEHR').filter('pagination', function() {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  };
});

AppEHR.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<=total; i++)
      input.push(i);
    return input;
  };
});
AppEHR.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});
