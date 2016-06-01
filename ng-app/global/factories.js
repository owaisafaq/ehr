var AppEHR = angular.module('AppEHR');

AppEHR.factory("AUTH", function ($resource) {
    return $resource(serverPath +  'user_login', {email: '@email', password: '@password'}, {
        get: {method: 'POST'}
    });
});
AppEHR.factory("PatientInformation", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistration = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
        },
        update:function(params,body,success) {
          var res = getResource(params, body);  
          return res.update(params,body,success);
        }
    };
    return patientRegistration;
});
AppEHR.factory("PatientRegistrationAddress", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_address', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationAddress = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
        },
        update:function(params,body,success) {
          var res = getResource(params, body);  
          return res.update(params,body,success);
        }
    };
    return patientRegistrationAddress;
});
AppEHR.factory("PatientRegistrationKin", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_kin', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationKin = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
        },
        update:function(params,body,success) {
          var res = getResource(params, body);  
          return res.update(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("PatientRegistrationEmployer", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_employer', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
        },
        update:function(params,body,success) {
          var res = getResource(params, body);  
          return res.update(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("Countries", function ($resource) {
    return $resource(serverPath +  'get_countries', {token: '@token'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("States", function ($resource) {
    return $resource(serverPath +  'get_states', {token: '@token', country_id: '@country_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("City", function ($resource) {
    return $resource(serverPath +  'get_cities', {token: '@token', state_id: '@state_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("GetLocalGovermentArea", function ($resource) {
    return $resource(serverPath +  'get_local_goverment_area', {token: '@token', state_id: '@state_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("DropDownData", function ($resource) {
    return $resource(serverPath +  'get_dropdowndata', {token: '@token'}, {
        get: {method: 'GET'}
    });
});
AppEHR.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            console.log("here");
        })
        .error(function(){
            console.log("failed");
        });
    }
}]);
