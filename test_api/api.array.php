<?php

require 'api.class.php';
//define('HOST', 'http://131.107.100.10/ehr/public/api/');
//define('HOST', 'http://localhost/ehr/public/api/');
define('HOST', 'http://demoz.online/ehr/public/api/');
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
$api->params->token = "123";

$api_arr [] = $api;


// Get Patient Vital History
$api = new api();
$api->name = "Get Patient Vital History";
$api->url = HOST . 'get_patient_vital_history';
$api->method = "GET";
$api->description = "Get Patient Vital History";
$api->params->patient_id = "1";
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
$api->params->token = "123";

$api_arr [] = $api;


// Get Supplements
$api = new api();
$api->name = "Get Supplements";
$api->url = HOST . 'patient_supplements';
$api->method = "GET";
$api->description = "Get Supplements";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Get Patient Allergies
$api = new api();
$api->name = "Get Patient Allergies";
$api->url = HOST . 'patient_allergies';
$api->method = "GET";
$api->description = "Get Patient Allergies";
$api->params->patient_id = "1";
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
$api->params->token = "123";

$api_arr [] = $api;


// Get All Patients
$api = new api();
$api->name = "Get All Patients";
$api->url = HOST . 'get_all_patients';
$api->method = "GET";
$api->description = "Get All Patients";
$api->params->token = "123";

$api_arr [] = $api;



// Get Patient Appointements
$api = new api();
$api->name = "Get Patient Appointements";
$api->url = HOST . 'get_patient_appointments';
$api->method = "GET";
$api->description = "Get Patient Appointements";
$api->params->patient_id = "1";
$api->params->token = "123";

$api_arr [] = $api;



// Add Patient Appointements
$api = new api();
$api->name = "Add Patient Appointements";
$api->url = HOST . 'add_patient_appointments';
$api->method = "POST";
$api->description = "Add Patient Appointements";
$api->params->patient_id = "1";
$api->params->visit_id = "1";
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
$api->params->visit_id = "1";
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
$api->params->token = "123";

$api_arr [] = $api;



// Clinical Progress Note Fields
$api = new api();
$api->name = "Clinical Progress Note Fields";
$api->url = HOST . 'clinical_progress_note_fields';
$api->method = "GET";
$api->description = "Clinical Progress Note Fields";
$api->params->template_id = "1";
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
$api->params->clinical_notes = "";
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
$api->params->token = "123";

$api_arr [] = $api;


// Add Patient Referels
$api = new api();
$api->name = "Add Patient Referel";
$api->url = HOST . 'add_patient_referel';
$api->method = "POST";
$api->description = "Add Patient Referel";
$api->params->patient_id = "1";
$api->params->department_id = "1";
$api->params->doctor_id = "1";
$api->params->provisional_diagnosis = "";
$api->params->reason_referal = "";
$api->params->history = "";
$api->params->investigations = "";
$api->params->allergies = "1";
$api->params->medication_list = "1";
$api->params->medicines = "1";
$api->params->token = "123";

$api_arr [] = $api;

// Get ALL Inventory Category
$api = new api();
$api->name = "Get ALL Inventory Category";
$api->url = HOST . 'get_inventory_category';
$api->method = "GET";
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




// Get All Lab Orders
$api = new api();
$api->name = "Get All Lab Orders";
$api->url = HOST . 'get_all_lab_orders';
$api->method = "GET";
$api->description = "Get All Lab Lab Orders";
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
$api->params->token = "123";

$api_arr [] = $api;



// Get all stocks
$api = new api();
$api->name = "Get Stocks";
$api->url = HOST . 'get_stock';
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
$api->params->token = "";

$api_arr [] = $api;


// Get All Pharmacies
$api = new api();
$api->name = "Get All Pharmacies";
$api->url = HOST . 'get_pharmacies';
$api->method = "GET";
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