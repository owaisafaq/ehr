var AppEHR = angular.module('AppEHR');

AppEHR.controller('labTestReport', ['$scope', '$rootScope', '$routeParams', '$window', 'getTemplateCategories', 'getTemplates', 'getLabTestInfo', 'getTemplateData','mySchema', function($scope, $rootScope, $routeParams, $window, getTemplateCategories, getTemplates, getLabTestInfo, getTemplateData, mySchema){
	$rootScope.pageTitle = "EHR - Lab Order Reporting";
    $scope.mySchema = mySchema;
    getLabTestInfo.get({ // Getting All Information about Test
        token : $window.sessionStorage.token,
        lab_test_id : $routeParams.testID
    },getLabOrderInfoSuccess,getLabOrderInfoFailure);

    function getLabOrderInfoSuccess(res){ // on success
        $scope.labTest = res.data;
    }

    function getLabOrderInfoFailure(error){ // on failure
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
        console.log(error);
    }

    $scope.getCategoriesTemplates = function (categoryID){ // get Templates from Categories
        getTemplates.get({
            token : $window.sessionStorage.token,
            category_id : categoryID
        },getTemplatesSuccess,getTemplatesFailure);
    };
    function getTemplatesSuccess(res){ // on success
        $scope.templates = res.data;
        $scope.have_templates = true; // if there are templates in selected category
    }
    function getTemplatesFailure(error){ // on failure
        console.log(error)
    }

    $scope.getTemplateData = function (templateID){ // get form fields of selected template
        getTemplateData.get({
            token : $window.sessionStorage.token,
            template_id : templateID
        },getTemplateDataSuccess,getTemplateDataFailure);
        $scope.templateSelected = true;
    };
    function getTemplateDataSuccess(res){ // on success
        //console.log(res);
        AppEHR.value('mySchema',res.data.template);
    }
    function getTemplateDataFailure(error){ // on failure
        console.log(error);
    }

}]);