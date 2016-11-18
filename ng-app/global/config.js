var serverPath = "localhost/ehr/public/api/";
//var serverPath = "http://demoz.online/ehr/public/api/";
//var serverPath = "http://demoz.online/dev/ehr/public/api/";
//var serverPath = "http://131.107.100.10/ehr/public/api/";
//var serverPath = "http://demoz.online/ehr/public/api/";
//var patientFileUploadPath = "http://demoz.online/ehr/public/uploaded_images/";
// http://demoz.online/staging/ehr/public/uploaded_images/
var patientImageDirectory = "http://demoz.online/ehr/public/uploaded_images/";
var errorMessages = {
	"authFailed": "Email or Password is Invalid",
	"fieldRequired": "Fields required",
  "InvalidPatientID" : 'Invalid Patient ID'
};
var diagnosisFields = [
    {"name": "still exists", "id": 0},
    {"name": "not any more", "id": 11}
];
var dropDownInfo = {
	"IdType" :[
		//{"id": "null", "type": "ID Type"},
		{"id": "1", "type": "Drivers License"},
		{"id": "2", "type": "National ID"},
		{"id": "3", "type": "Passport"},
    {"id": "4", "type": "Other"}
	],
    "AllergyType" :[
        {"name": "still exists"},
        {"name": "not any more"}
    ],
    "AllergyDropdownType" :[
        {"name": "1", "id": "1"},
        {"name": "2", "id": "2"}
    ],
    "AllergySeverity" :[
        {"name": "1", "id": "1"},
        {"name": "2", "id": "2"}
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
var priorities = [
    {"id": "High", "name": "High"},
    {"id": "Average", "name": "Average"},
    {"id": "Low", "name": "Low"}
];
var reason = [
    {"id": "High", "name": "High"},
    {"id": "Average", "name": "Average"},
    {"id": "Low", "name": "Low"}
];
var numberOfRecordsDropDown = [
    {"id": "10", "name": "10"},
    {"id": "20", "name": "20"},
    {"id": "30", "name": "30"},
    {"id": "40", "name": "40"},
    {"id": "50", "name": "50"}
];
/*var medicationDropDowns = [
    {"id": "1", "name": "abc"},
    {"id": "2", "name": "eef"},
]
var pharmacyDataDropDown = [
    {"id": "1", "name": "abc"},
    {"id": "2", "name": "eef"},
]*/
