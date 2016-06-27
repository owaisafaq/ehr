//var serverPath = "http://131.107.100.10/ehr/public/api/";
var serverPath = "http://demoz.online/ehr/public/api/";
var patientFileUploadPath = "http://demoz.online/ehr/public/uploaded_images/";

var errorMessages = {
    "authFailed": "Email or Password is Invalid",
    "fieldRequired": "Fields required"
};

var dropDownInfo = {
    "IdType": [
        //{"id": "null", "type": "ID Type"},
        {"id": "1", "type": "License"},
        {"id": "2", "type": "National ID Card"},
        {"id": "3", "type": "Passport"}
    ],
    "AllergyType": [
        {"name": "still exists"},
        {"name": "not any more"}
    ]
};
var frequencies = [
    {"id": "1", "name": "abc"},
    {"id": "2", "name": "cde"}
];
var intakeTypes = [
    {"id": "1", "name": "Intake"},
    {"id": "2", "name": "Type"}
];