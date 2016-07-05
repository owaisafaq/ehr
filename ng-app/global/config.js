//var serverPath = "http://131.107.100.10/ehr/public/api/";
var serverPath = "http://demoz.online/ehr/public/api/";
var patientFileUploadPath = "http://demoz.online/ehr/public/uploaded_images/";

var errorMessages = {
	"authFailed": "Email or Password is Invalid",
	"fieldRequired": "Fields required"
};

var dropDownInfo = {
	"IdType" :[
		//{"id": "null", "type": "ID Type"},
		{"id": "1", "type": "License"},
		{"id": "2", "type": "National ID Card"},
		{"id": "3", "type": "Passport"}
	],
        "AllergyType" :[
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
var medicationDropDowns = [
    {"id": "1", "name": "abc"},
    {"id": "2", "name": "eef"},
]
var pharmacyDataDropDown = [
    {"id": "1", "name": "abc"},
    {"id": "2", "name": "eef"},
]
var immunizations = [
    {"id": "1", "name": "Intake"},
   {"id": "2", "name": "Type"}
];
var buildInstructionObject = {
  "dose" : [
          { "id": "1", "name": "abc" },
          { "id": "2", "name": "def" },
          { "id": "3", "name": "ghi" },
          { "id": "4", "name": "jkl" }
  ],
  "route" : [
          { "id": "1", "name": "abc" },
          { "id": "2", "name": "def" },
          { "id": "3", "name": "ghi" },
          { "id": "4", "name": "jkl" }
  ],
  "direction" : [
          { "id": "1", "name": "abc" },
          { "id": "2", "name": "def" },
          { "id": "3", "name": "ghi" },
          { "id": "4", "name": "jkl" }
  ],
  "unit" : [
          { "id": "1", "name": "abc" },
          { "id": "2", "name": "def" },
          { "id": "3", "name": "ghi" },
          { "id": "4", "name": "jkl" }
  ],
  "frequency" : [
          { "id": "1", "name": "abc" },
          { "id": "2", "name": "def" },
          { "id": "3", "name": "ghi" },
          { "id": "4", "name": "jkl" }
  ],
  "duration" : [
          { "id": "1", "name": "abc" },
          { "id": "2", "name": "def" },
          { "id": "3", "name": "ghi" },
          { "id": "4", "name": "jkl" }
  ]
}