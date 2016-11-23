<?php

require 'api.class.php';
//define('HOST', 'http://131.107.100.10/ehr/public/api/');
//define('HOST', 'http://localhost/ehr/public/api/');
define('HOST', 'http://demoz.online/ehr/public/api/');
//define('HOST', 'http://demoz.online/dev/ehr/public/api/');
define('APP', '');
define('ROUTE', '');

// Initialize Array
$api_arr = array();


// Login to app
$api = new api();
$api->name = "Login User";
$api->url = HOST . 'user_login';
$api->method = "POST";
$api->description = "Login User";
$api->params->email = "owais@hotmail.com";
$api->params->password = "1234";

$api_arr [] = $api;


// Register User
$api = new api();
$api->name = "Register User";
$api->url = HOST . 'register_user';
$api->method = "POST";
$api->description = "Register User";
$api->params->name = "owais";
$api->params->first_name = "owais";
$api->params->last_name = "owais";
$api->params->email = "owais@gmail.com";
$api->params->password = "1234";
$api->params->role_id = "1";

$api_arr [] = $api;


// Search Patient
$api = new api();
$api->name = "Search Patient";
$api->url = HOST . 'search_patient';
$api->method = "POST";
$api->description = "Search Patient";
$api->params->name = "owais";
$api->params->token = "123";

$api_arr [] = $api;


// Search Patient Listing
$api = new api();
$api->name = "Search Patient Listing";
$api->url = HOST . 'search_patient_listing';
$api->method = "POST";
$api->description = "Search Patient Listing";
$api->params->name = "owais";
$api->params->column_name = "";
$api->params->token = "123";

$api_arr [] = $api;


// Search Doctor
$api = new api();
$api->name = "Search Doctor";
$api->url = HOST . 'search_doctor';
$api->method = "POST";
$api->description = "Search Doctor";
$api->params->name = "owais";
$api->params->token = "123";

$api_arr [] = $api;


// Search Department
$api = new api();
$api->name = "Search Department";
$api->url = HOST . 'search_department';
$api->method = "POST";
$api->description = "Search Department";
$api->params->name = "owais";
$api->params->token = "123";

$api_arr [] = $api;

/*// Login to app
$api = new api();
$api->name = "Register Patient";
$api->url = HOST . 'register_patient';
$api->method = "POST";
$api->description = "Register Patient";
$api->params->first_name = "owais";
$api->params->middle_name = "ahmed";
$api->params->last_name = "imran";
$api->params->date_of_birth = "18-02-1990";
$api->params->age = "20";
$api->params->sex = "1";
$api->params->marital_status = "1";
$api->params->religion = "1";
$api->params->father_firstname = "ahmed";
$api->params->father_middlename = "hassan";
$api->params->father_lastname = "zai";
$api->params->mother_firstname = "fouzai";
$api->params->mother_middlename = "bibi";
$api->params->mother_lastname = "khatoon";
$api->params->refered_name = "james";
$api->params->refered_email = "james@gmail.com ";
$api->params->refered_phone = "021090901980";
$api->params->patient_unit_number = "190";
$api->params->identity_type = "Nigerian";
$api->params->identity_number = "1120";
$api->params->patient_state = "test";
$api->params->patient_local_goverment_area = "190";
$api->params->tribe = "mangolian";
$api->params->language = "english";
$api->params->nationality = "1";
$api->params->blood_group = "B +ve";
$api->params->hospital_plan = "1";
$api->params->occupation = "mechanic";
$api->params->same_as_above = "0";
$api->params->email = "test@test.com";
$api->params->phone_number = "021212121";
$api->params->mobile_number = "03335656563";
$api->params->house_number = "21";
$api->params->street = "1";
$api->params->city = "1";
$api->params->state = "1";
$api->params->postal_code = "0021";
$api->params->country = "1";
$api->params->local_goverment_area = "1";
$api->params->permanent_city = "1";
$api->params->permanent_country = "1";
$api->params->permanent_email = "test@test.com";
$api->params->permanent_housenumber = "1";
$api->params->permanent_mobilenumber = "1";
$api->params->permanent_phonenumber = "1";
$api->params->permanent_postalCode = "1";
$api->params->kin_fullname = "test";
$api->params->kin_middlename = "test";
$api->params->kin_lastname = "test";
$api->params->kin_relationship = "test";
$api->params->others = "tesr";
$api->params->kin_phone_number = "021";
$api->params->kin_mobile_number = "021";
$api->params->kin_email = "test12@test.com";
$api->params->kin_house_number = "21";
$api->params->kin_street = "new street";
$api->params->kin_city = "igbo";
$api->params->kin_state = "Abia";
$api->params->kin_country = "Nigeroa";
$api->params->kin_postal_code = "021";
$api->params->employer_name = "test";
$api->params->employer_phone_number = "021";
$api->params->employer_mobile_number = "021";
$api->params->employer_email = "test@test.com";
$api->params->employer_house_number = "2090";
$api->params->employer_street = "11";
$api->params->employer_city = "igbo";
$api->params->employer_state = "ABIA";
$api->params->employer_country = "Nigeria";
$api->params->patient_plan_id = "1";
$api->params->hmo = "Prepaid Medicine";
$api->params->policies = "Private";
$api->params->insurance_id = "1990909090";
$api->params->principal = "1";
$api->params->depandent = "0";
$api->params->principal_id = "0";
$api->params->depandent_id = "3";
$api->params->principal_relationship = "";
$api->params->dependant_relationship = "Brother";
$api->params->description = "Need Financial Help for Brother";
$api->params->token = "123";


$api_arr [] = $api;*/

// Get Patient
$api = new api();
$api->name = "Get Patient Info";
$api->url = HOST . 'get_patient';
$api->method = "GET";
$api->description = "Get Patient Info";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Add Patient
$api = new api();
$api->name = "Add Patient";
$api->url = HOST . 'add_patient';
$api->method = "POST";
$api->description = "Add Patient";
$api->params->first_name = "owais";
$api->params->middle_name = "ahmed";
$api->params->last_name = "imran";
$api->params->date_of_birth = "18-02-1990";
$api->params->age = "20";
$api->params->sex = "1";
$api->params->patient_image = "";
$api->params->marital_status = "1";
$api->params->religion = "1";
$api->params->father_firstname = "ahmed";
$api->params->father_middlename = "hassan";
$api->params->father_lastname = "zai";
$api->params->mother_firstname = "fouzai";
$api->params->mother_middlename = "bibi";
$api->params->mother_lastname = "khatoon";
$api->params->refered_name = "james";
$api->params->patient_unit_number = "190";
$api->params->identity_type = "Nigerian";
$api->params->identity_number = "1120";
$api->params->patient_state = "test";
$api->params->patient_local_goverment_area = "190";
$api->params->tribe = "mangolian";
$api->params->language = "english";
$api->params->nationality = "1";
$api->params->blood_group = "1";

$api->params->token = "123";


$api_arr [] = $api;



// Delete Patient
$api = new api();
$api->name = "Delete Patient";
$api->url = HOST . 'delete_patient';
$api->method = "POST";
$api->description = "Delete Patient";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Add Patient Address
$api = new api();
$api->name = "Add Patient Address";
$api->url = HOST . 'add_patient_address';
$api->method = "POST";
$api->description = "Add Patient Address";
$api->params->same_as_above = "";
$api->params->patient_id = "1";
$api->params->email = "test@test.com";
$api->params->phone_number = "021212121";
$api->params->mobile_number = "03335656563";
$api->params->house_number = "21";
$api->params->street = "1";
$api->params->city = "1";
$api->params->state = "1";
$api->params->postal_code = "0021";
$api->params->country = "1";
$api->params->local_goverment_area = "1";
$api->params->permanent_street = "1";
$api->params->permanent_city = "1";
$api->params->permanent_state = "1";
$api->params->permanent_country = "1";
$api->params->permanent_email = "test@test.com";
$api->params->permanent_housenumber = "1";
$api->params->permanent_mobilenumber = "1";
$api->params->permanent_phonenumber = "1";
$api->params->permanent_postalCode = "1";
$api->params->token = "123";
$api_arr [] = $api;



// Add Patient Employees
$api = new api();
$api->name = "Add Patient Employees";
$api->url = HOST . 'add_patient_employees';
$api->method = "POST";
$api->description = "Add Patient Employees";
$api->params->patient_id = "1";
$api->params->employer_name = "test";
$api->params->employer_phone_number = "021";
$api->params->employer_mobile_number = "021";
$api->params->employer_email = "test@test.com";
$api->params->employer_house_number = "2090";
$api->params->employer_street = "11";
$api->params->employer_city = "igbo";
$api->params->employer_state = "ABIA";
$api->params->employer_country = "Nigeria";
$api->params->token = "123";
$api_arr [] = $api;


// Add Patient Kin
$api = new api();
$api->name = "Add Patient Kin";
$api->url = HOST . 'add_patient_kin';
$api->method = "POST";
$api->description = "Add Patient Kin";
$api->params->patient_id = "1";
$api->params->kin_fullname = "test";
$api->params->kin_middlename = "test";
$api->params->kin_lastname = "test";
$api->params->kin_relationship = "test";
$api->params->others = "tesr";
$api->params->kin_phone_number = "021";
$api->params->kin_mobile_number = "021";
$api->params->kin_email = "test12@test.com";
$api->params->kin_house_number = "21";
$api->params->kin_street = "new street";
$api->params->kin_city = "igbo";
$api->params->kin_state = "Abia";
$api->params->kin_country = "Nigeroa";
$api->params->kin_postal_code = "021";
$api->params->token = "123";


$api_arr [] = $api;



// Add Visit
$api = new api();
$api->name = "Add Visit";
$api->url = HOST . 'add_visit';
$api->method = "POST";
$api->description = "Add Visit";
$api->params->patient_id = "1";
$api->params->department_id = "1";
$api->params->encounter_class = "123";
$api->params->encounter_type = "123";
$api->params->whom_to_see = "1";
$api->params->decscribe_whom_to_see = "123";
$api->params->reason_of_visit = "";
$api->params->token = "123";


$api_arr [] = $api;

//  Update Visit
$api = new api();
$api->name = "Update Visit";
$api->url = HOST . 'update_visit';
$api->method = "POST";
$api->description = "Update Visit";
$api->params->visit_id = "1";
$api->params->patient_id = "1";
$api->params->department_id = "1";
$api->params->encounter_class = "123";
$api->params->encounter_type = "123";
$api->params->whom_to_see = "1";
$api->params->decscribe_whom_to_see = "123";
$api->params->reason_of_visit = "";
$api->params->token = "123";

$api_arr [] = $api;

// Get Countries
$api = new api();
$api->name = "Get Countries";
$api->url = HOST . 'get_countries';
$api->method = "GET";
$api->description = "Get Countries";
$api->params->token = "123";


$api_arr [] = $api;


// Get States
$api = new api();
$api->name = "Get States";
$api->url = HOST . 'get_states';
$api->method = "GET";
$api->description = "Get States";
$api->params->country_id = "1";
$api->params->token = "123";


$api_arr [] = $api;

// Get Cities
$api = new api();
$api->name = "Get Cities";
$api->url = HOST . 'get_cities';
$api->method = "GET";
$api->description = "Get Cities";
$api->params->state_id = "1";
$api->params->token = "123";


$api_arr [] = $api;

// Get Local Goverment Area
$api = new api();
$api->name = "Get Local Goverment Area";
$api->url = HOST . 'get_local_goverment_area';
$api->method = "GET";
$api->description = "Get Local Goverment Area";
$api->params->state_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Get Drop Down Data
$api = new api();
$api->name = "Get Drop Dowon Data";
$api->url = HOST . 'get_dropdowndata';
$api->method = "GET";
$api->description = "Get Drop Down Data`";
$api->params->token = "123";

$api_arr [] = $api;



// Get Patient Vital Fields
$api = new api();
$api->name = "Get Patient Vital Fields";
$api->url = HOST . 'get_patient_vitals';
$api->method = "GET";
$api->description = "Get Patient Vital Fields";
$api->params->token = "123";


$api_arr [] = $api;



// Get Patient Plans
$api = new api();
$api->name = "Get Patient Plans";
$api->url = HOST . 'get_patient_plan';
$api->method = "GET";
$api->description = "get_patient_plan";
$api->params->patient_id = "1";
$api->params->token = "123";


$api_arr [] = $api;


// Add Patient Plan
$api = new api();
$api->name = "Add Patient Plan";
$api->url = HOST . 'add_patient_plan';
$api->method = "POST";
$api->description = "Add Patient Plan";
$api->params->patient_id = "1";
$api->params->patient_plan_id = "0";
$api->params->plan_id = "1";
$api->params->is_principal = "1";
$api->params->is_dependant = "0";
$api->params->hmo = "0";
$api->params->policies = "1";
$api->params->insurance_id = "1";
$api->params->description = "Description";
$api->params->retainership = "1";
$api->params->category = "1";
$api->params->principal_patient_id = "1";
$api->params->relationship = "1";
$api->params->notes = "Description";
$api->params->token = "123";


$api_arr [] = $api;


// Get Visits
$api = new api();
$api->name = "Get Visits";
$api->url = HOST . 'get_visits';
$api->method = "GET";
$api->description = "Get Visits";
$api->params->token = "123";


$api_arr [] = $api;



// Get All Patent Data
$api = new api();
$api->name = "Get All Patent Data";
$api->url = HOST . 'get_patient_all_data';
$api->method = "GET";
$api->description = "Get All Patent Data";
$api->params->patient_id = "1";
$api->params->token = "123";


$api_arr [] = $api;




// Get Patient Visit History
$api = new api();
$api->name = "Get Patient Visit History";
$api->url = HOST . 'get_patient_visit_history';
$api->method = "GET";
$api->description = "Get Patient Visit History";
$api->params->patient_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Get Patient Vital History
$api = new api();
$api->name = "Get Patient Vital History";
$api->url = HOST . 'get_patient_vital_history';
$api->method = "GET";
$api->description = "Get Patient Vital History";
$api->params->patient_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;



// update visit status
$api = new api();
$api->name = "update visit status";
$api->url = HOST . 'update_visit_status';
$api->method = "POST";
$api->description = "update visit status";
$api->params->visit_id = "1";
$api->params->status = "checkout";
$api->params->token = "123";

$api_arr [] = $api;

// get Patient Demographics
$api = new api();
$api->name = "get Patient Demographics";
$api->url = HOST . 'get_patient_demographics';
$api->method = "GET";
$api->description = "get Patient Demographics";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Remove Visit
$api = new api();
$api->name = "Remove Visit";
$api->url = HOST . 'remove_visit';
$api->method = "GET";
$api->description = "Remove Visit";
$api->params->visit_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Get Visit Details
$api = new api();
$api->name = "Get Visit Details";
$api->url = HOST . 'visit_details';
$api->method = "GET";
$api->description = "Get Visit Details";
$api->params->visit_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Get Patient Archives
$api = new api();
$api->name = "Get Patient Archives";
$api->url = HOST . 'patient_archives';
$api->method = "GET";
$api->description = "Get Patient Archives";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Update Patient Archive
$api = new api();
$api->name = "Update Patient Archive";
$api->url = HOST . 'update_patient_archive';
$api->method = "POST";
$api->description = "Update Patient Archive";
$api->params->file_id = "1";
$api->params->file_name = "sample";
$api->params->token = "123";

$api_arr [] = $api;



// Remove Patient Archive
$api = new api();
$api->name = "Remove Patient Archive";
$api->url = HOST . 'remove_patient_archive';
$api->method = "GET";
$api->description = "Remove Patient Archive";
$api->params->patient_id = "1";
$api->params->patient_fie_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Get Patient Medications
$api = new api();
$api->name = "Get Patient Medications";
$api->url = HOST . 'patient_medications';
$api->method = "GET";
$api->description = "Get Patient Medications";
$api->params->patient_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Add Patient Medications
$api = new api();
$api->name = "Add Patient Medications";
$api->url = HOST . 'add_patient_medications';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->prescriptions = "";
$api->params->to_date = "2016-06-13";
$api->params->from_date = "2016-06-22";
$api->params->medication_status = "inprocess";
$api->params->token = "123";

$api_arr [] = $api;


// Get Supplements
$api = new api();
$api->name = "Get Supplements";
$api->url = HOST . 'patient_supplements';
$api->method = "GET";
$api->description = "Get Supplements";
$api->params->patient_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Add Supplements
$api = new api();
$api->name = "Add Supplements";
$api->url = HOST . 'add_patient_supplements';
$api->method = "POST";
$api->description = "Add Supplements";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->supplements = "Paracetamol";
$api->params->manufacturer = "manufacturer";
$api->params->dosage = "10";
$api->params->frequency = "5";
$api->params->intake = "2";
$api->params->from_date = "2016-06-22";
$api->params->medicine_status = "fresh";
$api->params->to_date = "2016-06-22";
$api->params->token = "123";

$api_arr [] = $api;



// Get Patient Allergies
$api = new api();
$api->name = "Get Patient Allergies";
$api->url = HOST . 'patient_allergies';
$api->method = "GET";
$api->description = "Get Patient Allergies";
$api->params->patient_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Update Patient Allergies
$api = new api();
$api->name = "Update Patient Allergie";
$api->url = HOST . 'update_patient_allergies';
$api->method = "POST";
$api->description = "Update Patient Allergie";
$api->params->patient_id = "1";
$api->params->allergy_id = "1";
$api->params->allergy_type = "severe";
$api->params->allergies = "tobaco";
$api->params->severity = "high";
$api->params->observed_on = "";
$api->params->allergy_status = "";
$api->params->reaction = "";
$api->params->token = "123";

$api_arr [] = $api;



// Add Patient Allergies
$api = new api();
$api->name = "Add Patient Allergie";
$api->url = HOST . 'add_patient_allergies';
$api->method = "POST";
$api->description = "Add Patient Allergie";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->allergy_type = "severe";
$api->params->allergies = "tobaco";
$api->params->severity = "high";
$api->params->observed_on = "";
$api->params->allergy_status = "";
$api->params->reaction = "";
$api->params->token = "123";

$api_arr [] = $api;


// Delete Patient Allergies
$api = new api();
$api->name = "Delete Patient Allergie";
$api->url = HOST . 'delete_patient_allergies';
$api->method = "POST";
$api->description = "Delete Patient Allergie";
$api->params->allergy_id = "1";
$api->params->patient_id = "1";
$api->params->token = "123";
$api_arr [] = $api;


// Add Patient Vitals
$api = new api();
$api->name = "Add Patient Vitals";
$api->url = HOST . 'add_patient_vitals';
$api->method = "POST";
$api->description = "Add Patient Vitals";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->systolic_mm_hg= "10";
$api->params->diastolic_mm_hg = "10";
$api->params->pulse = "10";
$api->params->respiratory_rate = "10";
$api->params->temperature_c = "10";
$api->params->temperature_f = "10";
$api->params->bmi_result = "100";
$api->params->bmi_weight = "10";
$api->params->bmi_height = "10";
$api->params->notes = "test";
$api->params->token = "123";

$api_arr [] = $api;




// Add resources
$api = new api();
$api->name = "Add Resources";
$api->url = HOST . 'add_resources';
$api->method = "POST";
$api->description = "Add Resources";
$api->params->patient_id = "1";
$api->params->name = "New Folder";
$api->params->followup_parent_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// List Folder Files
$api = new api();
$api->name = "List Folder Files";
$api->url = HOST . 'list_resources';
$api->method = "GET";
$api->description = "List Folder Files";
$api->params->followup_parent_id = "1";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// List Folder Files Back
$api = new api();
$api->name = "Back to  Folder";
$api->url = HOST . 'list_patient_resources_back ';
$api->method = "GET";
$api->description = "List Folder Files Back";
$api->params->followup_parent_id = "1";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Back to  Folder
$api = new api();
$api->name = "Back to  Folder Files";
$api->url = HOST . 'list_resources_back';
$api->method = "GET";
$api->params->followup_parent_id = "1";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// List Patient  Folders
$api = new api();
$api->name = "List Patient Folders";
$api->url = HOST . 'list_patient_resources';
$api->method = "GET";
$api->description = "List Patient Folders";
$api->params->patient_id = "1";
$api->params->followup_parent_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Update Patient Folders
$api = new api();
$api->name = "Update Patient Resources";
$api->url = HOST . 'update_patient_resources';
$api->method = "POST";
$api->description = "Update Patient Resource";
$api->params->resource_id = "1";
$api->params->name = "test";
$api->params->token = "123";

$api_arr [] = $api;


// Remove Patient Folders
$api = new api();
$api->name = "Remove Patient Resources";
$api->url = HOST . 'delete_patient_resources';
$api->method = "POST";
$api->description = "Remove Patient Resource";
$api->params->resource_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Patient Visit List
$api = new api();
$api->name = "Patient Visit List";
$api->url = HOST . 'patient_visit_list';
$api->method = "GET";
$api->description = "Patient Visit List";
$api->params->patient_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Get All Patients
$api = new api();
$api->name = "Get All Patients";
$api->url = HOST . 'get_all_patients';
$api->method = "GET";
$api->description = "Get All Patients";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Get Patient Appointements
$api = new api();
$api->name = "Get Patient Appointements";
$api->url = HOST . 'get_patient_appointments';
$api->method = "GET";
$api->description = "Get Patient Appointements";
$api->params->patient_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Get Single Appointement
$api = new api();
$api->name = "Get Single Appointement";
$api->url = HOST . 'get_single_appointment';
$api->method = "GET";
$api->description = "Get Single Appointement";
$api->params->appointment_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Add Patient Appointements
$api = new api();
$api->name = "Add Patient Appointements";
$api->url = HOST . 'add_patient_appointments';
$api->method = "POST";
$api->description = "Add Patient Appointements";
$api->params->patient_id = "1";
$api->params->department = "1";
$api->params->reason = "1";
$api->params->date = "2016-06-15";
$api->params->start_time = "2:30 P.M";
$api->params->notes = "sample notes";
$api->params->doctor = "1";
$api->params->other_reason = "other";
$api->params->end_time = "3:30 P.M";
$api->params->priority = "high";
$api->params->token = "123";

$api_arr [] = $api;


// Update Patient Appointements
$api = new api();
$api->name = "Update Patient Appointements";
$api->url = HOST . 'update_patient_appointments';
$api->method = "POST";
$api->description = "Update Patient Appointements";
$api->params->appointment_id = "1";
$api->params->patient_id = "1";
$api->params->department = "1";
$api->params->reason = "1";
$api->params->date = "2016-06-15";
$api->params->start_time = "2:30 P.M";
$api->params->notes = "sample notes";
$api->params->doctor = "1";
$api->params->other_reason = "other";
$api->params->end_time = "3:30 P.M";
$api->params->priority = "high";
$api->params->token = "123";

$api_arr [] = $api;


// Delete Patient Appointements
$api = new api();
$api->name = "Delete Patient Appointements";
$api->url = HOST . 'delete_patient_appointments';
$api->method = "POST";
$api->description = "Delete Patient Appointements";
$api->params->appointment_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Clinical Progress Note Templates
$api = new api();
$api->name = "Clinical Progress Note Templates";
$api->url = HOST . 'clinical_progress_note_templates';
$api->method = "GET";
$api->description = "Clinical Progress Note Templates";
$api->params->category_id = "1";
$api->params->template_type = "1";
$api->params->limit = "0";
$api->params->offset = "0";
$api->params->token = "123";

$api_arr [] = $api;



// Clinical Progress Note Fields
$api = new api();
$api->name = "Clinical Progress Note Fields";
$api->url = HOST . 'clinical_progress_note_fields';
$api->method = "GET";
$api->description = "Clinical Progress Note Fields";
$api->params->template_id = "1";
$api->params->limit = "0";
$api->params->offset = "0";
$api->params->token = "123";

$api_arr [] = $api;


// Add Patient Clinical Notes
$api = new api();
$api->name = "Add Patient Clinical Notes";
$api->url = HOST . 'add_patient_clinical_notes';
$api->method = "POST";
$api->description = "Add Patient Clinical Notes";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->template_id = "";
$api->params->value = "";
$api->params->diagnosis = "0";
$api->params->token = "123";

$api_arr [] = $api;

// Update Patient Clinical Notes
$api = new api();
$api->name = "Update Patient Clinical Notes";
$api->url = HOST . 'update_patient_clinical_notes';
$api->method = "POST";
$api->description = "Update Patient Clinical Notes";
$api->params->clinical_notes_id = "1";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->template_id = "";
$api->params->value = "";
$api->params->diagnosis = "0";
$api->params->token = "123";

$api_arr [] = $api;

// Add Clinical Notes Attachments
$api = new api();
$api->name = "Add Clinical Notes Attachments";
$api->url = HOST . 'add_clinical_notes_attachments';
$api->method = "POST";
$api->description = "Add Clinical Notes Attachments";
$api->params->patient_id = "1";
$api->params->image = "attachment";
$api->params->token = "123";

$api_arr [] = $api;


// Checkout Patient
$api = new api();
$api->name = "Checkout Patient";
$api->url = HOST . 'checkout_patient';
$api->method = "POST";
$api->description = "Checkout Patient";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->reason = "No Appointment";
$api->params->notes = "reasons for checkout";
$api->params->pick_date = "2016-06-15";
$api->params->pick_time = "2:30 P.M";
$api->params->admit_date = "2016-06-15";
$api->params->start_time = "2:30 P.M";
$api->params->department_id = "1";
$api->params->ward_id = "1";
$api->params->bed_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Add Patient Referels
$api = new api();
$api->name = "Add Patient Referel";
$api->url = HOST . 'add_patient_referel';
$api->method = "POST";
$api->description = "Add Patient Referel";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->referal_type = "internal";
$api->params->external_referal_email = "test@gmail.com";
//$api->params->department_id = "1";
$api->params->doctor_id = "1";
$api->params->provisional_diagnosis = "";
$api->params->reason_referal = "";
$api->params->history = "";
$api->params->investigations = "";
$api->params->refered_file = "";
//$api->params->allergies = "1";
//$api->params->medication_list = "1";
//$api->params->medicines = "1";
$api->params->token = "123";

$api_arr [] = $api;

// Get ALL Inventory Category
$api = new api();
$api->name = "Get ALL Inventory Category";
$api->url = HOST . 'get_inventory_category';
$api->method = "GET";
$api->params->group = "";
$api->params->token = "";
$api_arr [] = $api;

// Get Single Inventory Category
$api = new api();
$api->name = "Get Single Inventory Category";
$api->url = HOST . 'get_inventory_single_category';
$api->method = "GET";
$api->params->cat_id = "";
$api->params->token = "";
$api_arr [] = $api;

// Add Inventory Category

$api = new api();
$api->name = "Add Inventory Category";
$api->url = HOST . 'create_inventory_category';
$api->method = "POST";
$api->description = "Add Inventory Category";
$api->params->cat_name = "Cat name";
$api->params->cat_desc= "Cat Desc";
$api->params->cat_group = "Cat group";
$api->params->token = "";


$api_arr [] = $api;

// Update Inventory Category
$api = new api();
$api->name = "Update Inventory Category";
$api->url = HOST . 'update_inventory_category';
$api->method = "POST";
$api->description = "Update Inventory Category";
$api->params->cat_id = "1";
$api->params->cat_name = "Cat name";
$api->params->cat_desc= "Cat Desc";
$api->params->cat_group = "Cat group";
$api->params->token = "";

$api_arr [] = $api;

// Delete Inventory Category
$api = new api();
$api->name = "Delete Inventory Category";
$api->url = HOST . 'delete_inventory_category';
$api->method = "POST";
$api->params->cat_id = "1";
$api->params->token = "";

$api_arr [] = $api;



// Get ALL Inventory Suppliers
$api = new api();
$api->name = "Get ALL Inventory suppliers";
$api->url = HOST . 'get_inventory_suppliers';
$api->method = "GET";
$api->params->token = "";
$api_arr [] = $api;


// Get Single Inventory Suppliers
$api = new api();
$api->name = "Get Single Inventory suppliers";
$api->url = HOST . 'get_inventory_single_supplier';
$api->method = "GET";
$api->params->token = "";
$api->params->supplier_id = "1";
$api_arr [] = $api;

// Add Inventory Supplier

$api = new api();
$api->name = "Add Inventory supplier";
$api->url = HOST . 'create_inventory_supplier';
$api->method = "POST";
$api->description = "Add Inventory supplier";
$api->params->name = "name";
$api->params->contact_person = "Contact Person";
$api->params->city = "City";
$api->params->state = "state";
$api->params->country = "country";
$api->params->address_1 = "Address Line 1";
$api->params->address_2 = "Address Line 2";
$api->params->email = "email";
$api->params->work_phone = "Work phone";
$api->params->mobile = "mobile";
$api->params->website = "website";
$api->params->post_code = "post code";
$api->params->token = "";


$api_arr [] = $api;


// Update Inventory Supplier
$api = new api();
$api->name = "Update Inventory Supplier";
$api->url = HOST . 'update_inventory_supplier';
$api->method = "POST";
$api->description = "Update Inventory supplier";
$api->params->supplier_id = "1";
$api->params->name = "name";
$api->params->contact_person = "Contact Person";
$api->params->city = "City";
$api->params->state = "state";
$api->params->country = "country";
$api->params->address_1 = "Address Line 1";
$api->params->address_2 = "Address Line 2";
$api->params->email = "email";
$api->params->work_phone = "Work phone";
$api->params->mobile = "mobile";
$api->params->website = "website";
$api->params->post_code = "post code";
$api->params->token = "";

$api_arr [] = $api;

// Delete Inventory Supplier
$api = new api();
$api->name = "Delete Inventory supplier";
$api->url = HOST . 'delete_inventory_supplier';
$api->method = "POST";
$api->params->supplier_id = "1";
$api->params->token = "";

$api_arr [] = $api;

// Get Lab Tests
$api = new api();
$api->name = "Get Lab Tests";
$api->url = HOST . 'get_lab_tests';
$api->method = "GET";
$api->params->lab = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Get All Lab Orders
$api = new api();
$api->name = "Get All Lab Orders";
$api->url = HOST . 'get_all_lab_orders';
$api->method = "GET";
$api->description = "Get All Lab  Orders";
$api->params->limit = "0";
$api->params->offset = "0";
$api->params->token = "123";

$api_arr [] = $api;


// Get All Radiology Lab Orders
$api = new api();
$api->name = "Get All Radiology Lab Orders";
$api->url = HOST . 'get_all_radiology_lab_orders';
$api->method = "GET";
$api->description = "Get All Lab Radiology Orders";
$api->params->limit = "0";
$api->params->offset = "0";
$api->params->patient_id = "0";
$api->params->visit_id = "0";
$api->params->token = "123";

$api_arr [] = $api;

// Get Patient Lab Orders
$api = new api();
$api->name = "Get Patient Lab Orders";
$api->url = HOST . 'get_patient_lab_orders';
$api->method = "GET";
$api->description = "Get Patient Lab Orders";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->limit = "0";
$api->params->offset = "0";
$api->params->token = "123";

$api_arr [] = $api;


// Get All Lab Orders History
$api = new api();
$api->name = "Get All Lab Orders History";
$api->url = HOST . 'get_lab_order_history';
$api->method = "GET";
$api->description = "Get All Lab Lab Orders History";
$api->params->limit = "0";
$api->params->offset = "0";
$api->params->token = "123";

$api_arr [] = $api;


// Get Lab Order
$api = new api();
$api->name = "Get Lab Order";
$api->url = HOST . 'get_lab_order';
$api->method = "GET";
$api->description = "Get Lab Orders";
$api->params->order_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Add Lab Orders
$api = new api();
$api->name = "Add Lab Orders";
$api->url = HOST . 'add_lab_order';
$api->method = "POST";
$api->description = "Add Lab Orders";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
$api->params->lab = "1";
$api->params->lab_test = "1";
$api->params->clinical_information = "test";
$api->params->diagnosis = "test";
$api->params->lab_test = "";
$api->params->notes = "test";
$api->params->token = "123";

$api_arr [] = $api;

/*// Get  Lab Tests
$api = new api();
$api->name = "Get Lab Tests";
$api->url = HOST . 'get_lab_tests';
$api->method = "GET";
$api->description = "Get All Lab Tests";
$api->params->lab = "1";
$api->params->token = "123";

$api_arr [] = $api;*/




// Cancel Lab Orders
$api = new api();
$api->name = "Cancel Lab Orders";
$api->url = HOST . 'cancel_lab_order';
$api->method = "POST";
$api->description = "Cancel Lab Orders";
$api->params->order_id = "1";
$api->params->order_status = "Cancelled";
$api->params->reason = "Invalid Payment";
$api->params->notes = "Test";
$api->params->token = "123";

$api_arr [] = $api;


// Update Lab Test
$api = new api();
$api->name = "Update Lab Test";
$api->url = HOST . 'update_lab_test';
$api->method = "POST";
$api->params->lab_test = "1";
$api->params->date_time = "2016-10-15 15:46";
//$api->params->lab_order_test_id = "";
$api->params->status = "in progress";
$api->params->token = "123";

$api_arr [] = $api;


// Get Lab Test Fields
$api = new api();
$api->name = "Get Lab Test Fields";
$api->url = HOST . 'get_lab_test_fields';
$api->method = "GET";
$api->params->lab_template = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Add Lab Test Values
$api = new api();
$api->name = "Add Lab Test Values";
$api->url = HOST . 'add_lab_test_values';
$api->method = "POST";
$api->params->lab_order_id = "1";
$api->params->lab_test_id = "1";
$api->params->lab_test_values = "";
$api->params->template_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Get all stocks
$api = new api();
$api->name = "Get Stocks";
$api->url = HOST . 'get_stock';
$api->method = "GET";
$api->params->limit = "0";
$api->params->offset = "0";
$api->params->token = "";

$api_arr [] = $api;


// Get Active stocks
$api = new api();
$api->name = "Get Active stocks";
$api->url = HOST . 'get_active_stock';
$api->method = "GET";
$api->params->token = "";

$api_arr [] = $api;

// Get Inactive stocks
$api = new api();
$api->name = "Get Inactive stocks";
$api->url = HOST . 'get_inactive_stock';
$api->method = "GET";
$api->params->token = "";

$api_arr [] = $api;



// Get stock details
$api = new api();
$api->name = "Get Stocks Details";
$api->url = HOST . 'get_stock_details';
$api->method = "GET";
$api->params->product_id = "";
$api->params->token = "";

$api_arr [] = $api;


// Add Inventory
$api = new api();
$api->name = "Add Inventory";
$api->url = HOST . 'add_inventory';
$api->method = "POST";
$api->params->product_id = "";
$api->params->pharmacy_id = "";
$api->params->manufacturer_id = "";
$api->params->dept_id = "";
$api->params->supplier_id = "";
$api->params->received_date = "";
$api->params->batch_no = "";
$api->params->ref_no = "";
$api->params->expiry = "";
$api->params->quantity= "";
$api->params->order_quantity= "";
$api->params->cost_per_item= "";
$api->params->pack= "";
$api->params->token = "";

$api_arr [] = $api;

// Delete Inventory
$api = new api();
$api->name = "Delete Inventory Details";
$api->url = HOST . 'delete_inventory';
$api->method = "POST";
$api->params->stock_id = "1";
$api->params->token = "";

$api_arr [] = $api;

// Update Inventory
$api = new api();
$api->name = "Update Inventory";
$api->url = HOST . 'update_inventory';
$api->method = "POST";
$api->params->product_id = "";
$api->params->pharmacy_id = "";
$api->params->manufacturer_id = "";
$api->params->dept_id = "";
$api->params->supplier_id = "";
$api->params->received_date = "";
$api->params->batch_no = "";
$api->params->ref_no = "";
$api->params->expiry = "";
$api->params->quantity= "";
$api->params->cost_per_item= "";
$api->params->pack= "";
$api->params->token = "";

$api_arr [] = $api;


// Update Order level
$api = new api();
$api->name = "Update Product order level";
$api->url = HOST . 'update_reorder_level';
$api->method = "POST";
$api->params->product_id = "1";
$api->params->reorder_level = "1";
$api->params->token = "";

$api_arr [] = $api;

// Get Lab Test Templates
$api = new api();
$api->name = "Get Lab Order Templates";
$api->url = HOST . 'get_lab_test_templates';
$api->method = "GET";
$api->params->category_id = "1";
$api->params->token = "";

$api_arr [] = $api;

// Add Lab Test Templates
$api = new api();
$api->name = "Add Lab Order Templates";
$api->url = HOST . 'add_lab_test_templates';
$api->method = "POST";
$api->params->cat_id = "1";
$api->params->type_id = "1";
$api->params->template_name = "test";
$api->params->description = "test";
$api->params->token = "";
$api_arr [] = $api;

// Update Lab Test Templates
$api = new api();
$api->name = "Update Lab Order Templates";
$api->url = HOST . 'update_lab_test_templates';
$api->method = "POST";
$api->params->template_id = "1";
$api->params->cat_id = "1";
$api->params->type_id = "1";
$api->params->template_name = "test";
$api->params->description = "test";
$api->params->token = "";

// Delete Lab Test Templates
$api = new api();
$api->name = "Delete Lab Order Templates";
$api->url = HOST . 'delete_lab_test_templates';
$api->method = "POST";
$api->params->template_id = "1";
$api->params->token = "";

$api_arr [] = $api;


// Get All Pharmacies
$api = new api();
$api->name = "Get All Pharmacies";
$api->url = HOST . 'get_pharmacies';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "";

$api_arr [] = $api;



// Get Single Pharmacy
$api = new api();
$api->name = "Get Single Pharmacy";
$api->url = HOST . 'get_single_pharmacy';
$api->method = "GET";
$api->params->pharmacy_id = "1";
$api->params->token = "";

$api_arr [] = $api;


// Add Pharmacy
$api = new api();
$api->name = "Add Pharmacy";
$api->url = HOST . 'create_pharmacy';
$api->method = "POST";
$api->params->name = "new pharmacy";
$api->params->contact_person = "james";
$api->params->city = "test";
$api->params->state = "test";
$api->params->country = "test";
$api->params->address_1 = "test";
$api->params->address_2 = "test";
$api->params->email = "admin@test.com";
$api->params->work_phone = "admin@test.com";
$api->params->post_code = "0021";
$api->params->token = "";

$api_arr [] = $api;


// Update  Pharmacy
$api = new api();
$api->name = "Update Pharmacy";
$api->url = HOST . 'update_pharmacy';
$api->method = "POST";
$api->params->pharmacy_id = "1";
$api->params->name = "new pharmacy";
$api->params->contact_person = "james";
$api->params->city = "test";
$api->params->state = "test";
$api->params->country = "test";
$api->params->address_1 = "test";
$api->params->address_2 = "test";
$api->params->email = "admin@test.com";
$api->params->work_phone = "admin@test.com";
$api->params->post_code = "0021";
$api->params->token = "";

$api_arr [] = $api;


// Delete  Pharmacy
$api = new api();
$api->name = "Delete Pharmacy";
$api->url = HOST . 'delete_pharmacy';
$api->method = "POST";
$api->params->pharmacy_id = "1";
$api->params->token = "";

$api_arr [] = $api;


// Add Product
$api = new api();
$api->name = "Add Product";
$api->url = HOST . 'add_product';
$api->method = "POST";
$api->params->group = "1";
$api->params->product_name = "1";
$api->params->trade_name = "1";
$api->params->route = "1";
$api->params->reorder_level = "1";
$api->params->cat_id = "1";
$api->params->strength = "1";
$api->params->dose_from = "1";
$api->params->token = "";

$api_arr [] = $api;


// Add Product Inventory
$api = new api();
$api->name = "Add Product Inventory";
$api->url = HOST . 'add_product_inventory';
$api->method = "POST";
$api->params->group = "1";
$api->params->product_name = "1";
$api->params->trade_name = "1";
$api->params->route = "1";
$api->params->reorder_level = "1";
$api->params->cat_id = "1";
$api->params->strength = "1";
$api->params->dose_from = "1";
$api->params->pharmacy_id = "";
$api->params->manufacturer_id = "";
$api->params->dept_id = "";
$api->params->supplier_id = "";
$api->params->received_date = "";
$api->params->batch_no = "";
$api->params->ref_no = "";
$api->params->expiry = "";
$api->params->quantity= "";
$api->params->order_quantity= "";
$api->params->cost_per_item= "";
$api->params->pack= "";
$api->params->token = "";

$api_arr [] = $api;


// Add manufacturer
$api = new api();
$api->name = "Add manufacturer";
$api->url = HOST . 'add_manufacturer';
$api->method = "POST";
$api->params->manufacturer_name = "1";
$api->params->token = "1";


$api_arr [] = $api;



//Get Frequency
$api = new api();
$api->name = "Get Frequency";
$api->url = HOST . 'get_frequency';
$api->method = "GET";
$api->params->token = "123435";


$api_arr [] = $api;

//Get Intake
$api = new api();
$api->name = "Get Intake";
$api->url = HOST . 'get_intake';
$api->method = "GET";
$api->params->token = "123435";


$api_arr [] = $api;

//Get Lab Test
$api = new api();
$api->name = "Get Lab Test Details";
$api->url = HOST . 'get_lab_test_details';
$api->method = "GET";
$api->params->lab_test_id = "1";
$api->params->token = "123435";


$api_arr [] = $api;


//Get Template Categories
$api = new api();
$api->name = "Get Template Categories";
$api->url = HOST . 'get_lab_template_categories';
$api->method = "GET";
$api->params->token = "123435";


$api_arr [] = $api;


//Get Template Category
$api = new api();
$api->name = "Get Template Category";
$api->url = HOST . 'get_lab_template_category';
$api->method = "POST";
$api->params->cat_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Add Template Categories
$api = new api();
$api->name = "Add Template Categories";
$api->url = HOST . 'add_lab_template_category';
$api->method = "POST";
$api->params->category_name = "test";
$api->params->description = "test";
$api->params->token = "123435";


$api_arr [] = $api;

//Update Template Categories
$api = new api();
$api->name = "Update Template Categories";
$api->url = HOST . 'update_lab_template_category';
$api->method = "POST";
$api->params->cat_id = "1";
$api->params->category_name = "test";
$api->params->description = "test";
$api->params->token = "123435";


$api_arr [] = $api;

//Delete Template Categories
$api = new api();
$api->name = "Delete  Template Categories";
$api->url = HOST . 'delete_lab_template_category';
$api->method = "POST";
$api->params->cat_id = "1";
$api->params->token = "123435";


//Get Template Types
$api = new api();
$api->name = "Get Template Types";
$api->url = HOST . 'get_lab_template_types';
$api->method = "GET";
$api->params->token = "123435";


$api_arr [] = $api;


//Get Template Type
$api = new api();
$api->name = "Get Template Type";
$api->url = HOST . 'get_lab_template_type';
$api->method = "POST";
$api->params->type_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Add Template Type
$api = new api();
$api->name = "Add Template Types";
$api->url = HOST . 'add_lab_template_types';
$api->method = "POST";
$api->params->type_name = "test";
$api->params->description = "test";
$api->params->token = "123435";


$api_arr [] = $api;

//Update Template Categories
$api = new api();
$api->name = "Update Template Types";
$api->url = HOST . 'update_lab_template_types';
$api->method = "POST";
$api->params->type_id = "1";
$api->params->type_name = "test";
$api->params->description = "test";
$api->params->token = "123435";


$api_arr [] = $api;

//Delete Template Categories
$api = new api();
$api->name = "Delete  Template Types";
$api->url = HOST . 'delete_lab_template_types';
$api->method = "POST";
$api->params->type_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Get Reorderlevel
$api = new api();
$api->name = "Get Reorderlevel";
$api->url = HOST . 'get_reorder_level';
$api->method = "POST";
$api->params->product_id = "1";
$api->params->token = "123435";


$api_arr [] = $api;


//Update Product
$api = new api();
$api->name = "Update Product";
$api->url = HOST . 'update_product';
$api->method = "POST";
$api->params->product_id = "1";
$api->params->description = "test";
$api->params->group = "1";
$api->params->product_name = "test";
$api->params->trade_name = "test";
$api->params->route = "test";
$api->params->reorder_level = "1";
$api->params->cat_id = "1";
$api->params->strength = "test";
$api->params->dose_from = "2016-06-13";
$api->params->token = "123435";


$api_arr [] = $api;



//Get Product
$api = new api();
$api->name = "Get Product";
$api->url = HOST . 'get_product';
$api->method = "POST";
$api->params->product_id = "1";
$api->params->token = "123435";


$api_arr [] = $api;


//Get All Bills
$api = new api();
$api->name = "Get All Bills";
$api->url = HOST . 'get_all_bills';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Invoice to Bills
$api = new api();
$api->name = "Add Invoice to Bills";
$api->url = HOST . 'add_invoice_to_bills';
$api->method = "POST";
$api->params->bill_id = "1";
$api->params->patient_id = "1";
$api->params->product_id = "1";
$api->params->quantity = "";
$api->params->service_id = "";
$api->params->token = "123435";


$api_arr [] = $api;
//Get All Invoices
$api = new api();
$api->name = "Get All Invoices";
$api->url = HOST . 'get_all_invoices';
$api->method = "GET";
$api->params->bill_id = "1";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123435";


$api_arr [] = $api;

//Get Templates
$api = new api();
$api->name = "Get Templates";
$api->url = HOST . 'get_templates';
$api->method = "GET";
$api->params->template_type = "1";
$api->params->category_id = "";
$api->params->token = "123435";


$api_arr [] = $api;


//Get Template
$api = new api();
$api->name = "Get Template";
$api->url = HOST . 'get_template';
$api->method = "GET";
$api->params->template_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Delete Template
$api = new api();
$api->name = "Delete Template";
$api->url = HOST . 'delete_template';
$api->method = "POST";
$api->params->template_id = "1";
$api->params->token = "123435";


$api_arr [] = $api;



//Add Template
$api = new api();
$api->name = "Add Template";
$api->url = HOST . 'add_template';
$api->method = "POST";
$api->params->category_id = "1";
$api->params->description = "test";
$api->params->template = "Lab";
$api->params->token = "123435";


$api_arr [] = $api;



//Edit  Template
$api = new api();
$api->name = "Edit Template";
$api->url = HOST . 'edit_template';
$api->method = "POST";
$api->params->template_id = "1";
$api->params->name = "";
$api->params->category_id = "1";
$api->params->description = "test";
$api->params->template = "Lab";
$api->params->token = "123435";


$api_arr [] = $api;



//Get Templates Categories
$api = new api();
$api->name = "Get Templates Categories";
$api->url = HOST . 'get_templates_categories';
$api->method = "GET";
$api->params->template_type = "1";
$api->params->token = "123435";


$api_arr [] = $api;


//Delete Template Category
$api = new api();
$api->name = "Delete Template Category";
$api->url = HOST . 'delete_template_category';
$api->method = "POST";
$api->params->category_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Add Template Category
$api = new api();
$api->name = "Add Template Category";
$api->url = HOST . 'add_template_category';
$api->method = "POST";
$api->params->template_type = "1";
$api->params->name = "test";
$api->params->description = "test";
$api->params->token = "123435";

$api_arr [] = $api;



//Update Invoice
$api = new api();
$api->name = "Update Invoice";
$api->url = HOST . 'update_invoice';
$api->method = "POST";
$api->params->invoice_id = "1";
$api->params->amount_paid = "100";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Invoice Data
$api = new api();
$api->name = "Get Invoice Data";
$api->url = HOST . 'get_invoice_data';
$api->method = "GET";
$api->params->invoice_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Get Invoice Status
$api = new api();
$api->name = "Get Invoice Status";
$api->url = HOST . 'get_invoice_status';
$api->method = "GET";
$api->params->invoice_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Billing Data
$api = new api();
$api->name = "Get Billing Data";
$api->url = HOST . 'get_billing_data';
$api->method = "GET";
$api->params->bill_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Patient Plan
$api = new api();
$api->name = "Get Patient Plan";
$api->url = HOST . 'get_patient_plan';
$api->method = "GET";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Template Details
$api = new api();
$api->name = "Get Template Details";
$api->url = HOST . 'get_template_details';
$api->method = "GET";
$api->params->template_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Add Patient Prescription
$api = new api();
$api->name = "Add Patient Prescription";
$api->url = HOST . 'add_patient_prescription';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->prescription = "1";
$api->params->visit_id = "1";
/*$api->params->medication = "1";
$api->params->sig = "test";
$api->params->dispense = "1";
$api->params->reffills = "test";
$api->params->pharmacy = "1";*/
$api->params->note_for_pharmacy = "test";
$api->params->token = "123435";

$api_arr [] = $api;

//update Patient Prescription
$api = new api();
$api->name = "Update Patient Prescription";
$api->url = HOST . 'update_patient_prescription';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->prescribe_medication_id = "1";
$api->params->prescription = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Patient Prescription Medication
$api = new api();
$api->name = "Add Patient Prescription Medication";
$api->url = HOST . 'add_prescription_medication';
$api->method = "POST";
$api->params->prescription_id = "1";
$api->params->prescription = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Get All Prescription
$api = new api();
$api->name = "Get All Prescription";
$api->url = HOST . 'get_all_prescription';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;




//Get Prescription List
$api = new api();
$api->name = "Get Prescription List";
$api->url = HOST . 'get_prescription_list';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->pharmacy_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Delete Invoice
$api = new api();
$api->name = "Delete Invoice";
$api->url = HOST . 'delete_invoice';
$api->method = "POST";
$api->params->invoice_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Lab test pdf
$api = new api();
$api->name = "Get Lab Test PDF";
$api->url = HOST . 'get_lab_test_pdf';
$api->method = "GET";
$api->params->lab_test_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Get Prescription
$api = new api();
$api->name = "Get Prescription";
$api->url = HOST . 'get_prescription';
$api->method = "GET";
$api->params->precription_id = "1";
$api->params->pharmacy_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Update Prescription
$api = new api();
$api->name = "Update Prescription";
$api->url = HOST . 'update_prescription';
$api->method = "POST";
$api->params->precription_id = "1";
$api->params->prescribe_medication_id = "1";
$api->params->medication = "1";
$api->params->sig = "test";
$api->params->dispense = "test";
$api->params->reffills = "test";
$api->params->pharmacy = "1";
$api->params->note_of_pharmacy = "test";
$api->params->token = "123435";

$api_arr [] = $api;



//Get Bill Invoices
$api = new api();
$api->name = "Get Bill Invoices";
$api->url = HOST . 'get_bill_invoices';
$api->method = "GET";
$api->params->bill_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Send invoice email
$api = new api();
$api->name = "Send invoice email";
$api->url = HOST . 'send_invoice_email';
$api->method = "POST";
$api->params->invoice_id = "1";
$api->params->email_address = "smovaishassan12@hotmail.com";
$api->params->token = "123435";

$api_arr [] = $api;


//inventory inactive
$api = new api();
$api->name = "Inventory Inactive";
$api->url = HOST . 'inventory_inactive';
$api->method = "POST";
$api->params->stock_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Patient Immunizations
$api = new api();
$api->name = "Add Patient Immunizations";
$api->url = HOST . 'add_immunization';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->name = "";
$api->params->immunization_date = "2016-06-15";
$api->params->token = "123435";

$api_arr [] = $api;


//List Patient Immunizations
$api = new api();
$api->name = "List Patient Immunizations";
$api->url = HOST . 'list_immunizations';
$api->method = "GET";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Delete Patient Immunizations
$api = new api();
$api->name = "Delete Patient Immunizations";
$api->url = HOST . 'delete_immunization';
$api->method = "POST";
$api->params->immuization_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Patient Active Problems
$api = new api();
$api->name = "Add Patient Active Problems";
$api->url = HOST . 'add_active_problems';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->name = "";
$api->params->token = "123435";

$api_arr [] = $api;


//List Patient Active Problems
$api = new api();
$api->name = "List Patient Active Problems";
$api->url = HOST . 'list_active_problems';
$api->method = "GET";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Delete Patient Active Problems
$api = new api();
$api->name = "Delete Patient Active Problems";
$api->url = HOST . 'delete_active_problems';
$api->method = "POST";
$api->params->active_problem_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Add Patient Family History
$api = new api();
$api->name = "Add Patient Family History";
$api->url = HOST . 'add_family_history';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->name = "";
$api->params->token = "123435";

$api_arr [] = $api;


//List Patient Family History
$api = new api();
$api->name = "List Patient Family History";
$api->url = HOST . 'list_family_history';
$api->method = "GET";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Delete Patient Family History
$api = new api();
$api->name = "Delete Patient Family History";
$api->url = HOST . 'delete_family_history';
$api->method = "POST";
$api->params->family_history_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Get Patient Medicines
$api = new api();
$api->name = "Get Patient Medicines";
$api->url = HOST . 'get_patient_medications';
$api->method = "GET";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Remove Patient Prescription Medications
$api = new api();
$api->name = "Remove Patient Prescription Medications";
$api->url = HOST . 'remove_patient_precription_medications';
$api->method = "POST";
$api->params->prescribe_medication_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Get Medicine Units
$api = new api();
$api->name = "Get Medicine Units";
$api->url = HOST . 'get_medicine_units';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;

//Get Dashboard Counts
$api = new api();
$api->name = "Get Dashboard Counts";
$api->url = HOST . 'get_dashboard_counts';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;

//Create Ward
$api = new api();
$api->name = "Create Ward";
$api->url = HOST . 'create_ward';
$api->method = "POST";
$api->params->ward_id = "1";
$api->params->ward = "Orthopadic ward";
$api->params->speciality = "1";
$api->params->number_of_beds = "10";
$api->params->description = "";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Single Ward
$api = new api();
$api->name = "Get Single Ward";
$api->url = HOST . 'get_single_ward';
$api->method = "GET";
$api->params->ward_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Delete Ward
$api = new api();
$api->name = "Delete Ward";
$api->url = HOST . 'delete_ward';
$api->method = "POST";
$api->params->ward_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Bed Occupancy
$api = new api();
$api->name = "Bed Occupancy";
$api->url = HOST . 'bed_occupancy';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Ward Occupancy
$api = new api();
$api->name = "Ward Occupancy";
$api->url = HOST . 'ward_occupancy';
$api->method = "GET";
$api->params->ward_id = "1";
$api->params->offset = "0";
$api->params->limit = "10";
$api->params->token = "123435";

$api_arr [] = $api;

//Patients Admitted
$api = new api();
$api->name = "Patients Admitted";
$api->url = HOST . 'patients_admitted';
$api->method = "GET";
$api->params->offset = "0";
$api->params->limit = "5";
$api->params->token = "123435";

$api_arr [] = $api;


//Update Discharge Date
$api = new api();
$api->name = "Update Discharge Date";
$api->url = HOST . 'update_discharge_date';
$api->method = "POST";
$api->params->patient_admitted_id = "";
$api->params->expected_discharge_date = "2016-09-08 09:36:00";
$api->params->token = "123435";

$api_arr [] = $api;


//Discharge Patient
$api = new api();
$api->name = "Discharge Patient";
$api->url = HOST . 'patient_discharge';
$api->method = "POST";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Upload Patient Image
$api = new api();
$api->name = "Upload Patient Image";
$api->url = HOST . 'upload_patient_image';
$api->method = "POST";
$api->params->patient_image = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Move Patient
$api = new api();
$api->name = "Move Patient";
$api->url = HOST . 'move_patient';
$api->method = "POST";
$api->params->patient_id = "";
$api->params->department_id = "";
$api->params->current_ward_id = "";
$api->params->ward_id = "";
$api->params->bed_id = "";
$api->params->current_bed_id = "";
$api->params->notes = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Patient Pool Area
$api = new api();
$api->name = "Patient Pool Area";
$api->url = HOST . 'patients_pool_area';
$api->method = "GET";
$api->params->offset = "0";
$api->params->limit = "5";
$api->params->token = "123435";

$api_arr [] = $api;



//All Wards
$api = new api();
$api->name = "All Wards";
$api->url = HOST . 'all_wards';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;


//Ward Beds
$api = new api();
$api->name = "Ward Beds";
$api->url = HOST . 'ward_beds';
$api->method = "GET";
$api->params->ward_id = "0";
$api->params->token = "123435";

$api_arr [] = $api;


//Appointment Dates
$api = new api();
$api->name = "Appointment Dates";
$api->url = HOST . 'appointment_dates';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;

//Appointment Date Patients
$api = new api();
$api->name = "Appointment Dates Patients";
$api->url = HOST . 'appointment_dates_patients';
$api->method = "GET";
$api->params->patient_id = "";
$api->params->token = "123435";

$api_arr [] = $api;


//Appointment Date Doctors
$api = new api();
$api->name = "Appointment Dates Doctors";
$api->url = HOST . 'appointment_dates_doctors';
$api->method = "GET";
$api->params->doctor_id = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Appointment Date Department
$api = new api();
$api->name = "Appointment Dates Departments";
$api->url = HOST . 'appointment_dates_departments';
$api->method = "GET";
$api->params->department_id = "";
$api->params->token = "123435";

$api_arr [] = $api;



//Add Billing Category
$api = new api();
$api->name = "Add Billing Category";
$api->url = HOST . 'add_billing_category';
$api->method = "POST";
$api->params->name = "";
$api->params->description = "";
$api->params->token = "123435";

$api_arr [] = $api;


//Update Billing Category
$api = new api();
$api->name = "Update Billing Category";
$api->url = HOST . 'update_billing_category';
$api->method = "POST";
$api->params->category_id = "1";
$api->params->name = "";
$api->params->description = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Delete Billing Category
$api = new api();
$api->name = "Delete Billing Category";
$api->url = HOST . 'delete_billing_category';
$api->method = "POST";
$api->params->category_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Billing Category
$api = new api();
$api->name = "Get Billing Category";
$api->url = HOST . 'get_billing_category';
$api->method = "GET";
$api->params->offset = "0";
$api->params->limit = "10";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Single Billing Category
$api = new api();
$api->name = "Get Single Billing Category";
$api->url = HOST . 'get_single_billing_category';
$api->method = "GET";
$api->params->category_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Code
$api = new api();
$api->name = "Add Code";
$api->url = HOST . 'add_billing_code';
$api->method = "POST";
$api->params->code = "";
$api->params->description = "";
$api->params->charge = "";
$api->params->category_id = "";
$api->params->tax = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Get All Billing Codes
$api = new api();
$api->name = "Get All Billing Codes";
$api->url = HOST . 'get_all_billing_codes';
$api->method = "GET";
$api->params->offset = "0";
$api->params->limit = "10";
$api->params->token = "123435";

$api_arr [] = $api;

//Get Billing Code
$api = new api();
$api->name = "Get Billing Code";
$api->url = HOST . 'get_billing_code';
$api->method = "GET";
$api->params->billing_code_id = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Update Code
$api = new api();
$api->name = "Update Code";
$api->url = HOST . 'update_billing_code';
$api->method = "POST";
$api->params->billing_code_id = "";
$api->params->code = "";
$api->params->description = "";
$api->params->charge = "";
$api->params->category_id = "";
$api->params->tax = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Delete Billing Code
$api = new api();
$api->name = "Delete Billing Code";
$api->url = HOST . 'delete_billing_code';
$api->method = "POST";
$api->params->billing_code_id = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Tax Rates
$api = new api();
$api->name = "Add Tax Rates";
$api->url = HOST . 'add_tax_rates';
$api->method = "POST";
$api->params->name = "";
$api->params->rate = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Update Tax Rate
$api = new api();
$api->name = "Update Tax Rate";
$api->url = HOST . 'update_tax_rates';
$api->method = "POST";
$api->params->tax_rate_id = "1";
$api->params->name = "";
$api->params->rate = "";
$api->params->token = "123435";

$api_arr [] = $api;

//List All Tax Rates
$api = new api();
$api->name = "List All Tax Rates";
$api->url = HOST . 'list_tax_rates';
$api->method = "GET";
$api->params->offset = "0";
$api->params->limit = "10";
$api->params->token = "123435";

$api_arr [] = $api;

//List  Tax Rate
$api = new api();
$api->name = "List Tax Rate";
$api->url = HOST . 'list_tax_rate';
$api->method = "GET";
$api->params->tax_rate_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Delete Tax Rates
$api = new api();
$api->name = "Delete Tax Rates";
$api->url = HOST . 'delete_tax_rate';
$api->method = "POST";
$api->params->tax_rate_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Investigation Billing Code
$api = new api();
$api->name = "Add Investigation Billing Code";
$api->url = HOST . 'add_investigation_billing_code';
$api->method = "POST";
$api->params->investigation_type = "";
$api->params->code = "";
$api->params->charge = "";
$api->params->tax = "";
$api->params->description = "";
$api->params->token = "123435";

$api_arr [] = $api;



//Delete Investigation Billing Code
$api = new api();
$api->name = "Delete Investigation Billing Code";
$api->url = HOST . 'delete_investigation_billing_code';
$api->method = "POST";
$api->params->investigation_billing_code_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get All Investigation Billing Codes
$api = new api();
$api->name = "Get All Investigation Billing Codes";
$api->url = HOST . 'get_all_investigation_billing_codes';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Investigation Billing Code
$api = new api();
$api->name = "Get Investigation Billing Code";
$api->url = HOST . 'get_investigation_billing_code';
$api->method = "GET";
$api->params->investigation_billing_code_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Update Investigation Billing Code
$api = new api();
$api->name = "Update Investigation Billing Code";
$api->url = HOST . 'update_investigation_billing_code';
$api->method = "POST";
$api->params->investigation_billing_code_id = "1";
$api->params->investigation_type = "";
$api->params->code = "";
$api->params->charge = "";
$api->params->tax = "";
$api->params->description = "";
$api->params->token = "123435";

$api_arr [] = $api;


//Add Radiology Templates
$api = new api();
$api->name = "Add Radiology Templates";
$api->url = HOST . 'add_radiology_template';
$api->method = "POST";
$api->params->investigation_type = "1";
$api->params->template = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Get Radiology Templates
$api = new api();
$api->name = "Get Radiology Templates";
$api->url = HOST . 'get_radiology_templates';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;

//Delete Radiology Template
$api = new api();
$api->name = "Delete Radiology Template";
$api->url = HOST . 'delete_radiology_template';
$api->method = "POST";
$api->params->template_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Radiology Template
$api = new api();
$api->name = "Get Radiology Template";
$api->url = HOST . 'get_radiology_template';
$api->method = "GET";
$api->params->template_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Update Radiology Template
$api = new api();
$api->name = "Update Radiology Template";
$api->url = HOST . 'update_radiology_template';
$api->method = "POST";
$api->params->template_id = "1";
$api->params->investigation_type = "1";
$api->params->template = "";
$api->params->token = "123435";

$api_arr [] = $api;


//Move Appointment to Visit
$api = new api();
$api->name = "Move Appointment to Visit";
$api->url = HOST . 'move_appointment';
$api->method = "POST";
$api->params->appointment_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;



//Appointment Reminder
$api = new api();
$api->name = "Appointment Reminder";
$api->url = HOST . 'appointment_reminder';
$api->method = "POST";
$api->params->appointment_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Clinical Notes Pdf
$api = new api();
$api->name = "Get Clinical Notes Pdf";
$api->url = HOST . 'get_clinical_notes_pdf';
$api->method = "POST";
$api->params->patient_clinical_notes_id = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Patient Beds
$api = new api();
$api->name = "Add Patient Beds";
$api->url = HOST . 'add_patient_beds';
$api->method = "POST";
$api->params->ward_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Delete Patient Bed
$api = new api();
$api->name = "Delete Patient Bed";
$api->url = HOST . 'delete_patient_bed';
$api->method = "POST";
$api->params->ward_id = "1";
$api->params->bed_id = "";
$api->params->token = "123435";

$api_arr [] = $api;


//Edit Patient Bed
$api = new api();
$api->name = "Edit Patient Bed";
$api->url = HOST . 'edit_patient_bed';
$api->method = "POST";
$api->params->ward_id = "1";
$api->params->bed_id = "";
$api->params->status = "";
$api->params->token = "123435";

$api_arr [] = $api;


//Patients Discharged
$api = new api();
$api->name = "Patients Discharged";
$api->url = HOST . 'patients_discharged';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;


//Signoff Lab Report
$api = new api();
$api->name = "Signoff Lab Report";
$api->url = HOST . 'signoff_lab_report';
$api->method = "POST";
$api->params->lab_test_id = "";
$api->params->token = "123435";

$api_arr [] = $api;

//Signoff Clinical Report
$api = new api();
$api->name = "Signoff Clinical Report";
$api->url = HOST . 'signoff_clinical_report';
$api->method = "POST";
$api->params->patient_clinical_notes_id = "";
$api->params->token = "123435";

$api_arr [] = $api;


//check clinical notes status
$api = new api();
$api->name = "check clinical notes status";
$api->url = HOST . 'check_clinical_notes_status';
$api->method = "POST";
$api->params->patient_id = "";
$api->params->visit_id = "";
$api->params->token = "123435";

$api_arr [] = $api;



//check lab orders status
$api = new api();
$api->name = "check lab orders status";
$api->url = HOST . 'check_lab_orders_status';
$api->method = "POST";
$api->params->lab_order_test_id = "";
$api->params->token = "123435";

$api_arr [] = $api;



//update lab orders
$api = new api();
$api->name = "update lab orders";
$api->url = HOST . 'update_lab_test_values';
$api->method = "POST";
$api->params->lab_test_id = "";
$api->params->template_id = "";
$api->params->lab_test_values = "";
$api->params->token = "123435";

$api_arr [] = $api;



//Get Diagnosis
$api = new api();
$api->name = "Get Diagnosis";
$api->url = HOST . 'get_diagnosis';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Prescription Medicines
$api = new api();
$api->name = "Get Prescription Medicines";
$api->url = HOST . 'get_prescription_medicines';
$api->method = "GET";
$api->params->pharmacy_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Get Prescription Supplements
$api = new api();
$api->name = "Get Prescription Supplements";
$api->url = HOST . 'get_prescription_supplements';
$api->method = "GET";
$api->params->pharmacy_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Get Clinical Notes Template Category
$api = new api();
$api->name = "Get Clinical Notes Template Category";
$api->url = HOST . 'get_template_category';
$api->method = "POST";
$api->params->cat_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Update Clinical Notes Template Categories
$api = new api();
$api->name = "Update Clinical Notes Template Categories";
$api->url = HOST . 'update_template_category';
$api->method = "POST";
$api->params->cat_id = "1";
$api->params->category_name = "test";
$api->params->description = "test";
$api->params->token = "123435";

$api_arr [] = $api;



//Get Prescription Pdf
$api = new api();
$api->name = "Get Prescription Pdf";
$api->url = HOST . 'get_prescription_pdf';
$api->method = "GET";
$api->params->prescription_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;

//Get Inventory Categories
$api = new api();
$api->name = "Get Inventory Categories";
$api->url = HOST . 'get_inventory_categories';
$api->method = "GET";
$api->params->token = "123435";

$api_arr [] = $api;

//Add Material
$api = new api();
$api->name = "Add Material";
$api->url = HOST . 'add_material';
$api->method = "POST";
$api->params->lab_order_id = "1";
$api->params->material = "";
$api->params->token = "123435";

$api_arr [] = $api;


// Get Todays All Appointments
$api = new api();
$api->name = "Get Todays All Appointments";
$api->url = HOST . 'get_all_todays_appointments';
$api->method = "GET";
$api->description = "Get Todays All Appointments";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


// Get Todays All Visits
$api = new api();
$api->name = "Get Todays All Visits";
$api->url = HOST . 'get_todays_all_visits';
$api->method = "GET";
$api->description = "Get Todays All Visitss";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Add Lab
$api = new api();
$api->name = "Add Lab";
$api->url = HOST . 'add_lab';
$api->method = "POST";
$api->params->name = "";
$api->params->code = "";
$api->params->description = "";
$api->params->token = "123";

$api_arr [] = $api;


//Get Labs
$api = new api();
$api->name = "Get Labs";
$api->url = HOST . 'get_labs';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Get Lab
$api = new api();
$api->name = "Get Lab";
$api->url = HOST . 'get_lab';
$api->method = "GET";
$api->params->lab_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Update Lab
$api = new api();
$api->name = "Update Lab";
$api->url = HOST . 'update_lab';
$api->method = "POST";
$api->params->lab_id = "1";
$api->params->name = "";
$api->params->code = "";
$api->params->description = "";
$api->params->token = "123";

$api_arr [] = $api;


//Delete Lab
$api = new api();
$api->name = "Delete Lab";
$api->url = HOST . 'delete_lab';
$api->method = "POST";
$api->params->lab_id = "1";
$api->params->token = "123";

$api_arr [] = $api;

//Get All Lab Tests
$api = new api();
$api->name = "Get All Lab Tests";
$api->url = HOST . 'get_all_lab_tests';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Get Single Test
$api = new api();
$api->name = "Get Single Test";
$api->url = HOST . 'get_single_test';
$api->method = "GET";
$api->params->lab_test_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Add Lab Test
$api = new api();
$api->name = "Add Lab Test";
$api->url = HOST . 'add_lab_test';
$api->method = "POST";
$api->params->lab_id = "1";
$api->params->name = "";
$api->params->code = "";
$api->params->cost = "";
$api->params->description = "";
$api->params->token = "123";

$api_arr [] = $api;


//Update Lab Test
$api = new api();
$api->name = "Update Lab Test";
$api->url = HOST . 'update_current_lab_test';
$api->method = "POST";
$api->params->lab_test_id = "1";
$api->params->lab_id = "1";
$api->params->name = "";
$api->params->code = "";
$api->params->cost = "";
$api->params->description = "";
$api->params->token = "123";

$api_arr [] = $api;



//Delete Lab Test
$api = new api();
$api->name = "Delete Lab Test";
$api->url = HOST . 'delete_lab_test';
$api->method = "POST";
$api->params->lab_test_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



//Dispense Medication
$api = new api();
$api->name = "Dispense Medication";
$api->url = HOST . 'dispense_medication';
$api->method = "POST";
$api->params->prescribe_medication_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Query Medication
$api = new api();
$api->name = "Query Medication";
$api->url = HOST . 'query_medication';
$api->method = "POST";
$api->params->prescribe_medication_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Download Archive
$api = new api();
$api->name = "Download Archive";
$api->url = HOST . 'download_archive';
$api->method = "POST";
$api->params->resource_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Get All Products
$api = new api();
$api->name = "Get All Products";
$api->url = HOST . 'get_all_prodducts';
$api->method = "GET";
$api->params->token = "123";

$api_arr [] = $api;


//Add Update Hospital
$api = new api();
$api->name = "Add Update Hospital";
$api->url = HOST . 'add_update_hospital';
$api->method = "POST";
$api->params->is_update = "1";
$api->params->name = "New Hospital";
$api->params->image = "image";
$api->params->address = "";
$api->params->type = "";
$api->params->city = "1";
$api->params->registration_number = "";
$api->params->state = "1";
$api->params->category = "";
$api->params->country = "1";
$api->params->number_of_departments = "10";
$api->params->phone = "";
$api->params->date_registration = "18-2-1990";
$api->params->email = "";
$api->params->number_beds = "10";
$api->params->website = "newhospital.com";
$api->params->name_proprietor = "james";
$api->params->accredation_lab = "W1-01";
$api->params->accredation_pharmacy = "W2-021";
$api->params->accredation_others = "w3-021";
$api->params->token = "123";

$api_arr [] = $api;

//Get Hospital Profile
$api = new api();
$api->name = "Get Hospital Profile";
$api->url = HOST . 'get_hospital_profile';
$api->method = "GET";
$api->params->token = "123";

$api_arr [] = $api;



//Departments Api

//Add Department
$api = new api();
$api->name = "Add Department";
$api->url = HOST . 'add_department';
$api->method = "POST";
$api->params->name = "";
$api->params->description = "";
$api->params->token = "123";

$api_arr [] = $api;


//Get Departments
$api = new api();
$api->name = "Get Departments";
$api->url = HOST . 'get_departments';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Get Department
$api = new api();
$api->name = "Get Department";
$api->url = HOST . 'get_department';
$api->method = "GET";
$api->params->department_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Update Department
$api = new api();
$api->name = "Update Department";
$api->url = HOST . 'update_department';
$api->method = "POST";
$api->params->department_id = "1";
$api->params->name = "";
$api->params->description = "";
$api->params->token = "123";

$api_arr [] = $api;


//Delete Department
$api = new api();
$api->name = "Delete Department";
$api->url = HOST . 'delete_department';
$api->method = "POST";
$api->params->department_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Get All Users
$api = new api();
$api->name = "Get All Users";
$api->url = HOST . 'get_all_users';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;

//Get User
$api = new api();
$api->name = "Get User";
$api->url = HOST . 'get_user';
$api->method = "GET";
$api->params->user_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Delete User
$api = new api();
$api->name = "Delete User";
$api->url = HOST . 'delete_user';
$api->method = "POST";
$api->params->user_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



//Get All Contexts
$api = new api();
$api->name = "Get All Contexts";
$api->url = HOST . 'get_all_contexts';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Add Role Group
$api = new api();
$api->name = "Add Role Group";
$api->url = HOST . 'add_role_group';
$api->method = "POST";
$api->params->name = "Doctor";
$api->params->role_rights = "";
$api->params->token = "123";

$api_arr [] = $api;

//Update Role Group
$api = new api();
$api->name = "Update Role Group";
$api->url = HOST . 'update_role_group';
$api->method = "POST";
$api->params->role_id = "3";
$api->params->name = "3";
$api->params->role_rights = "";
$api->params->token = "123";

$api_arr [] = $api;



//Get Roles
$api = new api();
$api->name = "Get Roles";
$api->url = HOST . 'get_roles';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Delete Role
$api = new api();
$api->name = "Delete Role";
$api->url = HOST . 'delete_role';
$api->method = "POST";
$api->params->role_id = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Get User Role
$api = new api();
$api->name = "Get User Role";
$api->url = HOST.'get_user_role';
$api->method = "GET";
$api->params->role_id = "1";
$api->params->token = "123";

$api_arr [] = $api;

//Export patients
$api = new api();
$api->name = "Export patients";
$api->url = HOST . 'import_patients';
$api->method = "POST";
$api->params->token = "123435";

$api_arr [] = $api;



//Export Nhis
$api = new api();
$api->name = "Export Nhis";
$api->url = HOST . 'export_nhis';
$api->method = "POST";
$api->params->token = "123435";

$api_arr [] = $api;


//Get all patient orders
$api = new api();
$api->name = "Get all patient orders";
$api->url = HOST . 'get_all_patient_orders';
$api->method = "GET";
$api->params->offset = "1";
$api->params->limit = "1";
$api->params->patient_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Waive Bill
$api = new api();
$api->name = "Waive Bill";
$api->url = HOST . 'waive_bill';
$api->method = "POST";
$api->params->bill_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Waive Invoice
$api = new api();
$api->name = "Waive Invoice";
$api->url = HOST . 'waive_invoice';
$api->method = "POST";
$api->params->invoice_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


//Add Patient Bill
$api = new api();
$api->name = "Add Patient Bill";
$api->url = HOST . 'add_patient_bill';
$api->method = "POST";
$api->params->patient_name = "Jack";
$api->params->token = "123435";

$api_arr [] = $api;


// Search Patient Bill
$api = new api();
$api->name = "Search Patient Bill";
$api->url = HOST . 'search_patient_bill';
$api->method = "POST";
$api->description = "Search Patient Bill";
$api->params->name = "owais";
$api->params->token = "123";

$api_arr [] = $api;


// Add Prescription Material
$api = new api();
$api->name = "Add Prescription Material";
$api->url = HOST . 'add_prescription_material';
$api->method = "POST";
$api->description = "Add Prescription Material";
$api->params->prescripion_id = "1";
$api->params->material = "1";
$api->params->token = "123";

$api_arr [] = $api;


//Download Patient Referal
$api = new api();
$api->name = "Download Patient Referal";
$api->url = HOST . 'download_patient_referal';
$api->method = "GET";
$api->params->referal_id = "1";
$api->params->token = "123435";

$api_arr [] = $api;


// Get Bill Purpose's
$api = new api();
$api->name = "Get Bill Purpose's";
$api->url = HOST . 'get_bill_purposes';
$api->method = "GET";
$api->description = "Get Bill Purpose's";
$api->params->purpose = "";
$api->params->hospital_plan = "self";
$api->params->token = "123";

$api_arr [] = $api;


// Search Patients without encounters
$api = new api();
$api->name = "Search Patients without encounters";
$api->url = HOST . 'search_patient_without_encounters';
$api->method = "POST";
$api->description = "Search Patients without encounters";
$api->params->name = "owais";
$api->params->token = "123";

$api_arr [] = $api;



// Search Patient Bills
$api = new api();
$api->name = "Search Patient Bills";
$api->url = HOST . 'search_patient_bills';
$api->method = "POST";
$api->description = "Search Patient Bills";
$api->params->name = "owais";
$api->params->token = "123";

$api_arr [] = $api;


// Get Inventory Categories by groups
$api = new api();
$api->name = "Get Inventory Categories by groups";
$api->url = HOST . 'get_inventory_categories_groups';
$api->method = "GET";
$api->description = "Get Inventory Categories by groups";
$api->params->group = "Drugs";
$api->params->token = "123";

$api_arr [] = $api;



// Check Patient Exists
$api = new api();
$api->name = "Check Patient Exists";
$api->url = HOST . 'check_patient_exists';
$api->method = "GET";
$api->description = "Check Patient Exists";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;

