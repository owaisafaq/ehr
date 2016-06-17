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
            update: {method: 'PUT'},
            get: {method: 'GET'}
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
        },
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
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
AppEHR.factory("PatienPlanSaveData", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_plan', params, {
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
AppEHR.factory("AddEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_visit', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var addEncounter = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
        }
    };
    return addEncounter;
});
AppEHR.factory("GetVisits", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'get_visits', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetPatientAllData", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'get_patient_all_data', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("PatientRegistrationEmployer", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_employees', params, {
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
AppEHR.factory("GetPatientInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'get_patient', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetEncountersByPatients", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'patient_visit_list', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllEncounters", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'get_patient_visit_history', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("CheckOut", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'update_visit_status', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("PatientDemographics", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'get_patient_demographics', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("UpdateEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'update_visit', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetOneEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'visit_details', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("RemoveEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'remove_visit', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("AddVitals", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_vitals', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save:function(params,body,success) {
          var res = getResource(params, body);  
          return res.save(params,body,success);
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
AppEHR.factory("GetPatientMedications", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'patient_medications', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetVitalsInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'get_patient_vital_history', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetSupplements", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'patient_supplements', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetAllergies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'patient_allergies', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllPatients", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'get_all_patients', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get:function(params,body,success) {
          var res = getResource(params, body);  
          return res.get(params,body,success);
        }
    };
    return patientRegistrationEmployer;
});
