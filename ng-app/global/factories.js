AppEHR = angular.module('AppEHR');

AppEHR.factory("AUTH", function ($resource) {
    return $resource(serverPath + 'user_login', {email: '@email', password: '@password'}, {
        get: {method: 'POST'}
    });
});
AppEHR.factory("PatientInformation", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'},
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistration = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        },
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistration;
});
AppEHR.factory("PatientRegistrationAddress", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_address', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationAddress = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationAddress;
});
AppEHR.factory("CheckoutPatient", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'checkout_patient', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationAddress = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationAddress;
});
AppEHR.factory("PatienPlanSaveData", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_plan', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationAddress = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationAddress;
});
AppEHR.factory("PatientRegistrationKin", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_kin', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationKin = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("GetArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_archives', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("SaveFiles", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_archive', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save:function(params,body,success) {
          var res = getResource(params, body);
          return res.save(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("GetResourcesByFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'list_resources', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get:function(params,body,success) {
          var res = getResource(params, body);
          return res.get(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("DeleteFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'delete_patient_resources', params, {
            get: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get:function(params,body,success) {
          var res = getResource(params, body);
          return res.get(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("RemoveArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'remove_patient_archive', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("EditArchives", function ($resource) { // edit filename
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_patient_archive', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("EditFolderArchives", function ($resource) { // edit folder
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'update_patient_resources', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save:function(params,body,success) {
          var res = getResource(params, body);
          return res.save(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("AddFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_resources', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save:function(params,body,success) {
          var res = getResource(params, body);
          return res.save(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("ListFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'list_patient_resources', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get:function(params,body,success) {
          var res = getResource(params, body);
          return res.get(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("AddEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_visit', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var addEncounter = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return addEncounter;
});
AppEHR.factory("GetVisits", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_visits', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetPatientAllData", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_all_data', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("PatientRegistrationEmployer", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_employees', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetPatientInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetEncountersByPatients", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_visit_list', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllEncounters", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_visit_history', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("CheckOut", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_visit_status', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("PatientDemographics", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_demographics', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("UpdateEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_visit', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetOneEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'visit_details', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("RemoveEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'remove_visit', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("AddVitals", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_vitals', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("RemoveAllergy", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'delete_patient_allergies', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("Countries", function ($resource) {
    return $resource(serverPath + 'get_countries', {token: '@token'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("States", function ($resource) {
    return $resource(serverPath + 'get_states', {token: '@token', country_id: '@country_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("City", function ($resource) {
    return $resource(serverPath + 'get_cities', {token: '@token', state_id: '@state_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("GetLocalGovermentArea", function ($resource) {
    return $resource(serverPath + 'get_local_goverment_area', {token: '@token', state_id: '@state_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("DropDownData", function ($resource) {
    return $resource(serverPath + 'get_dropdowndata', {token: '@token'}, {
        get: {method: 'GET'}
    });
});
AppEHR.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
                .success(function () {
                    console.log("here");
                })
                .error(function () {
                    console.log("failed");
                });
    }
}]);
AppEHR.factory("ClinicalProgressNotesFields", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'clinical_progress_note_fields', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var clinicalProgressNotesFields = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return clinicalProgressNotesFields;
});
AppEHR.factory("GetTemplatesDropDown", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'clinical_progress_note_templates', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var clinicalProgressNotesFields = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return clinicalProgressNotesFields;
});
AppEHR.factory("SetClinicalProgressNotes", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_clinical_notes', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var clinicalProgressNotesFields = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return clinicalProgressNotesFields;
});
AppEHR.factory("GetPatientMedications", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_medications', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetVitalsInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_vital_history', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetSupplements", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_supplements', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetAllergies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_allergies', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("UpdateAllergies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_patient_allergies', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllPatients", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_all_patients', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllLabOrders", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_all_lab_orders', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var LabOrders = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return LabOrders;
});
AppEHR.factory("GetLabOrdersHistory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_lab_order_history', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var LabOrdersHistory = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return LabOrdersHistory;
});
AppEHR.factory("getLabOrderInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_lab_order', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var LabOrder = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return LabOrder;
});

AppEHR.factory("getLabTestInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_lab_test_details', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var LabTest = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return LabTest;
});



AppEHR.factory("UpdateAllergies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_patient_allergies', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("ADDSupplements", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_supplements', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("ADDAllergy", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_allergies', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetAllInventory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_stock', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var InventoryLists = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return InventoryLists;
});

AppEHR.factory("GetAllSuppliers", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_suppliers', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var SupplierLists = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return SupplierLists;
});


AppEHR.factory("GetAllCategories", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_category', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var CategoryLists = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return CategoryLists;
});


AppEHR.factory("GetAllPharmacies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_pharmacies', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Pharmacies = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Pharmacies;
});


AppEHR.factory("AddCategory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'create_inventory_category', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var AddCategory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return AddCategory;
});



AppEHR.factory("AddSupplier", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'create_inventory_supplier', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var AddCategory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return AddCategory;
});


AppEHR.factory("AddInventory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_product_inventory', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var AddInventory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return AddInventory;
});

AppEHR.factory("AddProduct", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_product', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var AddProduct = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return AddProduct;
});



AppEHR.factory("UpdateSuppliers", function ($resource) {

    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_inventory_supplier', params,{
            save: {method: 'POST'}
        });
        return res2;
    }
    var UpdateSupplier = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return UpdateSupplier;
});

AppEHR.factory("updateCategory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_inventory_category', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var UpdateCategory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return UpdateCategory;
});

AppEHR.factory("DeleteCategory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'delete_inventory_category', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var DeleteCategory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return DeleteCategory;
});

AppEHR.factory("DeleteSupplier", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'delete_inventory_supplier', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var DeleteSupplier = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return DeleteSupplier;
});





AppEHR.factory("DeleteInventory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'delete_inventory', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var DeleteInventory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return DeleteInventory;
});



AppEHR.factory("GetSingleSupplier", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_single_supplier', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Supplier = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Supplier;
});

AppEHR.factory("GetSingleCategory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_single_category', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Categories = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Categories;
});

AppEHR.factory("GetSingleStock", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_stock_details', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Stocks = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Stocks;
});
AppEHR.factory("GetLabTests", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_lab_tests', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var LabTests = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return LabTests;
});



AppEHR.factory("GetSingleProduct", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_stock_details', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Stocks = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Stocks;
});


AppEHR.factory("GetProduct", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_product', params, {
            get: {method: 'POST'}
        });
        return res2;
    }
    var Product = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Product;
});


AppEHR.factory("GetReorderLevel", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_reorder_level', params, {
            get: {method: 'POST'}
        });
        return res2;
    }
    var reorder_level = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return reorder_level;
});

AppEHR.factory("updateReorderLevel", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_reorder_level', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var update_reorder_level = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return update_reorder_level;
});

AppEHR.factory("ProductUpdate", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_product', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var update_product = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return update_product;
});




AppEHR.factory("cancelLabOrder", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'cancel_lab_order', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var cancelOrder = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return cancelOrder;
});

AppEHR.factory("addOrder", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_lab_order', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var Order = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return Order;
});

AppEHR.factory("updateTestStatus", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_lab_test', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var updateTest = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return updateTest;
});




AppEHR.factory("GetAllBills", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_all_bills', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Bills = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Bills;
});


AppEHR.factory("GetAllInvoices", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_all_invoices', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Invoices = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Invoices;
});

AppEHR.factory("ProcessPayment", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_invoice', params, {
            get: {method: 'POST'}
        });
        return res2;
    }
    var update_inv = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return update_inv;
});

AppEHR.factory("InvoiecStatus", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_invoice_status', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var get_status = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return get_status;
});