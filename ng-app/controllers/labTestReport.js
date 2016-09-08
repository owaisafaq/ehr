var AppEHR = angular.module('AppEHR');

AppEHR.controller('labTestReport', ['$scope', '$rootScope', '$routeParams', '$window', 'getTemplateCategories', 'getTemplates', 'getLabTestInfo', 'getTemplateData','saveTemplateValues', '$timeout', function($scope, $rootScope, $routeParams, $window, getTemplateCategories, getTemplates, getLabTestInfo, getTemplateData, saveTemplateValues, $timeout){
	$rootScope.pageTitle = "EHR - Lab Order Reporting";
    $scope.myFormData = {}; // Something to store the input at.
    $scope.mySchema = {}; // Expose the schema on the scope.
    getLabTestInfo.get({ // Getting All Information about Test
        token : $window.sessionStorage.token,
        lab_test_id : $routeParams.testID
    },getLabOrderInfoSuccess,getLabOrderInfoFailure);

    function getLabOrderInfoSuccess(res){ // on success
        $scope.labTest = res.data;
    }

    function getLabOrderInfoFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    getTemplateCategories.get({ // Getting all templates
        token : $window.sessionStorage.token
    },getTemplateCategoriesSuccess,getTemplateCategoriesFailure);
    function getTemplateCategoriesSuccess(res){ // on success
        if(res.status == true){
            $scope.templateCategories = res.data;
        }
    }
    function getTemplateCategoriesFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.getCategoriesTemplates = function (categoryID){ // get Templates from Categories
        getTemplates.get({
            token : $window.sessionStorage.token,
            category_id : categoryID,
            template_type: 2
        },getTemplatesSuccess,getTemplatesFailure);
    };
    function getTemplatesSuccess(res){ // on success
        console.log(res);
        $scope.templates = res.data;
        $scope.have_templates = true; // if there are templates in selected category
    }
    function getTemplatesFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error)
    }

    $scope.getTemplateData = function (templateID){ // get form fields of selected template
        console.log(templateID);
        getTemplateData.get({
            token : $window.sessionStorage.token,
            template_id : templateID,
            template_type: 2
        },getTemplateDataSuccess,getTemplateDataFailure);
        $scope.templateSelected = true;
    };
    function getTemplateDataSuccess(res){ // on success
        console.log(res);
        $scope.selectedTemplate = res.data;
        $scope.mySchema = JSON.parse(res.data.template);
    }
    function getTemplateDataFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.SaveTemplateValues = function (){ // Saving Template Values
        $scope.hideLoader = 'show';
        saveTemplateValues.save({ // sending data over saveTemplateValues factories
            token : $window.sessionStorage.token,
            lab_order_id : $scope.labTest.lab_order_id,
            lab_test_id : $scope.selectedTemplate.id,
            lab_test_values: $scope.myFormData,
            template_id: $scope.selectedTemplate.id
        },saveTemplateValuesSuccess,saveTemplateValuesFailure)
    };
    function saveTemplateValuesSuccess(res){ // on success
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.cancleOrderBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $scope.myFormData = {};
            $timeout(function(){
                $scope.message = false;
                $scope.errorMessage = "";
            },1500);
        } else {
            $scope.hideLoader = "hide";
            $scope.cancleOrderBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function saveTemplateValuesFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }
}]);