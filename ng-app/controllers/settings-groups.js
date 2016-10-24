var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsGroups', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllContexts', 'addRoleGroup', function($scope,$rootScope,$window,$routeParams,GetAllContexts,addRoleGroup){
	$rootScope.pageTitle = "EHR - Groups";
    $(".rights_list").mCustomScrollbar();
    $('.add-role').click(function () {
        if ($('.add-multiple .select2-chosen').html() != "") {
            $('.rights_list .mCSB_container').append('<div class="right_chip"><span>' + $('.add-multiple .select2-chosen').html() + '</span><div class="rights_icons"><span class="rights create"><i class="fa fa-plus"></i></span><span class="rights update_icn"><i class="fa fa-edit"></i></span><span class="rights delete_icn"><i class="fa fa-times"></i></span><span class="rights read"><i class="fa fa-eye"></i></span></div></div>');
            $(".add-multiple").select2('data', null);
        }
    });
    $(document).on('click','.rights_icons > span',function () {
        $(this).toggleClass('active');
    });

    GetAllContexts.get({
        token: $window.sessionStorage.token
    }, GetAllContextsSuccess, GetAllContextsFailure);
    function GetAllContextsSuccess(res) {
        if (res.status == true) {
            $scope.Contexts = res.data;
        }
    }
    function GetAllContextsFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }
}]);
