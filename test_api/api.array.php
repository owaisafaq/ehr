<?php

require 'api.class.php';
define('HOST', 'http://131.107.100.10/ehr/public/api/');
//define('HOST', 'http://demoz.online/ehr/public/api/');
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
$api->params->email = "owais@gmail.com";
$api->params->password = "1234";

$api_arr [] = $api;


// Login to app
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

// Login to app
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
$api->params->martial_status = "single";
$api->params->religion = "Islam";
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
$api->params->nationality = "Nigerian";
$api->params->blood_group = "B +ve";
$api->params->hospital_plan = "1";
$api->params->occupation = "mechanic";
$api->params->address_type = "Home";
$api->params->phone_number = "021212121";
$api->params->mobile_number = "03335656563";
$api->params->house_number = "21";
$api->params->street = "Igbo street";
$api->params->city = "Igbo";
$api->params->state = "Abia";
$api->params->country = "Nigeria";
$api->params->local_goverment_area = "Aba North";
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


$api_arr [] = $api;



// Add Encounter
$api = new api();
$api->name = "Add Encounter";
$api->url = HOST . 'add_encounter';
$api->method = "POST";
$api->description = "Add Encounter";
$api->params->source_id="1";
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