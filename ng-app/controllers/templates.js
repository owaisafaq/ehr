var AppEHR = angular.module('AppEHR');

/*
AppEHR.controller('templates', ['$scope', '$rootScope', function($scope, $rootScope){

    console.log('sadsadasdsad');
    $rootScope.pageTitle = "EHR - Settings";


}]);*/


AppEHR.controller('templates', ['$scope', '$rootScope', 'mySchema', '$window', 'getTemplates' ,'AddTemplate', 'getTemplateCategory', 'AddTemplateCategory','$timeout', function($scope, $rootScope, mySchema, $window, getTemplates, AddTemplate, getTemplateCategory, AddTemplateCategory,$timeout){
    $scope.myForm = {
        schema: mySchema
    };
    $scope.cat_unique={};
    $scope.catt_unique ={};
    $rootScope.pageTitle = "EHR - Inventory";

    $scope.saveForm = function() {


        $scope.hideLoader = 'show';
        //$scope.updateEncounterBtn = true;
        //console.log($scope.displayInfo.patient_id);


        var catName = $.grep($scope.categories, function (categories) {
            return categories.id == $scope.template_cat_id;
        })[0].name;

        var addTemplate={
            token: $window.sessionStorage.token,
            name: $scope.template_name,
            description: $scope.template_description,
            category_id: $scope.template_cat_id,
            template: angular.toJson(mySchema),
            category :catName

        }

        angular.copy(addTemplate,$scope.cat_unique);
        AddTemplate.save(addTemplate, AddTemplateSuccess,AddTemplateFailure);

    }

    function AddTemplateSuccess(res) {
        console.log(res);
        if (res.status == true) {
            $rootScope.loader = "hide";

            $scope.templateLists.push($scope.cat_unique);

            $(".addtemplates").hide();
            $(".main_templates").show();


        }
    }

    function AddTemplateFailure(error) {
        console.log(error);
    }


    getTemplates.get({
        token: $window.sessionStorage.token
    }, getTemplateSuccess, getTemplateFailure);

    function getTemplateSuccess(res) {
        if (res.status == true) {
            $scope.templateLists = res.data;
        }
    }

    function getTemplateFailure(error) {
        console.log(error);
    }

    getTemplateCategory.get({token: $window.sessionStorage.token}, TemplateCategorySuccess, TemplateCategoryFailed);

    function TemplateCategorySuccess(res) {
        if (res.status == true) {
            $scope.categories = res.data;
        } else {
            console.log(res);
        }
    }

    function TemplateCategoryFailed(error) {
        console.log(error);
    }

    $scope.AddCategory = function (category) {

        if (angular.equals({}, category) == false) {
            $scope.hideLoader = 'show';
            //$scope.updateEncounterBtn = true;
            //console.log($scope.displayInfo.patient_id);
            var addCateogry={
                token: $window.sessionStorage.token,
                name: category.cat_name,
                description: category.cat_desc,

            }
            angular.copy(addCateogry,$scope.catt_unique);
            AddTemplateCategory.save(addCateogry, CategorySuccess, CategoryFailure);


        }
    }



    function CategorySuccess(res) {
        console.log(res);
        if (res.status == true) {
            $rootScope.loader = "hide";
            $scope.categories.push($scope.catt_unique);
            console.log($scope.CategoryLists);
            $timeout(function () {
                $('#addcategory').modal('hide');
            },500);
        }
    }

    function CategoryFailure(error) {
        console.log(error);
    }

}]);

AppEHR.value('mySchema', {

});



