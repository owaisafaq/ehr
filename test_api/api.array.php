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
$api->params->source_id="1";
$api->params->email="1";
$api->params->name="1";
$api->params->password="1";
$api->params->first_name = "owais";
$api->params->middle_name = "ahmed";
$api->params->last_name = "imran";
$api->params->date_of_birth = "18-02-1990";
$api->params->age = "20";
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
$api->params->address_type = "Home";
$api->params->phone_number = "021212121";
$api->params->mobile_number = "03335656563";
$api->params->house_number = "21";
$api->params->street = "chester le street";
$api->params->city = "annfield";
$api->params->state = "yorkshire";
$api->params->country = "England";
$api->params->local_goverment_area = "2nd street";
$api->params->kin_fullname = "test";
$api->params->kin_middlename = "test";
$api->params->kin_lastname = "test";
$api->params->kin_relationship = "test";
$api->params->others = "tesr";
$api->params->kin_phone_number = "021";
$api->params->kin_mobile_number = "021";
$api->params->kin_email = "test@test.com";
$api->params->kin_house_number = "21";
$api->params->kin_street = "new street";
$api->params->kin_city = "london";
$api->params->kin_state = "yorkshire";
$api->params->kin_country = "UK";
$api->params->kin_postal_code = "021";
$api->params->employer_name = "test";
$api->params->employer_phone_number = "021";
$api->params->employer_mobile_number = "021";
$api->params->employer_email = "test@test.com";
$api->params->employer_house_number = "2090";
$api->params->employer_street = "11";
$api->params->employer_city = "east london";
$api->params->employer_state = "lancashire";
$api->params->employer_country = "UK";
$api->params->token = "123";


$api_arr [] = $api;