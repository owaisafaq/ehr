<?php

require 'api.class.php';
define('HOST', 'http://131.107.100.10/vlaunchapp/public/api/');
//define('HOST', 'http://demoz.online/vlunch/public/api/');
define('APP', '');
define('ROUTE', '');

// Initialize Array
$api_arr = array();



// Login to app
$api = new api();
$api->name = "Login User";
$api->url = HOST . 'login_user';
$api->method = "POST";
$api->description = "Login User";
$api->params->email_address = "owais@gmail.com";
$api->params->password = "1234";

$api_arr [] = $api;



// Login to app
$api = new api();
$api->name = "Create User";
$api->url = HOST . 'create_user';
$api->method = "POST";
$api->description = "Create New User";
$api->params->full_name = "test user";
$api->params->email_address = "owais@gmail.com";
$api->params->phone_number = "1234";
$api->params->password = "owais@gmail.com";
$api_arr [] = $api;



// Login to app
$api = new api();
$api->name = "Forget Password";
$api->url = HOST . 'forget_password';
$api->method = "POST";
$api->description = "Forget Password";
$api->params->email_address = "owais@gmail.com";
$api_arr [] = $api;

/*// Login to app
$api = new api();
$api->name = "Verification Code Check";
$api->url = HOST . 'confirm_verification_code';
$api->method = "POST";
$api->description = "Verification Code Check";
$api->params->verification_code = "123";
$api->params->source_id = "123";
$api_arr [] = $api;*/


// Login to app
$api = new api();
$api->name = "Set Password";
$api->url = HOST . 'set_password';
$api->method = "POST";
$api->description = "Set Password";
$api->params->source_id = "123";
$api->params->password = "123";
$api_arr [] = $api;



// Login to app
$api = new api();
$api->name = "Add User Detail";
$api->url = HOST . 'add_user_detail';
$api->method = "POST";
$api->description = "Add User Detail";
$api->params->source_id = "123";
$api->params->user_name = "asif";
$api->params->phone_number = "123";
$api_arr [] = $api;



// Login to app
$api = new api();
$api->name = "Get Delivery Address List";
$api->url = HOST . 'get_delivery_list';
$api->method = "GET";
$api->description = "Get Delivery Address List";
$api->params->source_id = "1";
$api->params->token = "123";
$api_arr [] = $api;


// Login to app
$api = new api();
$api->name = "Add Delivery Address";
$api->url = HOST . 'add_delivery_address';
$api->method = "POST";
$api->description = "Add Delivery Address";
$api->params->source_id = "1";
$api->params->type = "home";
$api->params->address_number = "123";
$api->params->orientation = "Street 123";
$api->params->street_name = "Tariq Road";
$api->params->building_name = "Tariq Center";
$api->params->token = "123";
$api_arr [] = $api;


// Login to app
$api = new api();
$api->name = "Add Credit Card Details";
$api->url = HOST . 'add_credit_card_detail';
$api->method = "POST";
$api->description = "Add Credit Card Details";
$api->params->source_id = "1";
$api->params->credit_card_type = "VISA";
$api->params->credit_card_name = "Owais";
$api->params->credit_card_number = "111190909090909";
$api->params->security_code = "148";
$api->params->expiry_month = "January";
$api->params->year = "2017";
$api->params->token = "123";
$api_arr [] = $api;


// Login to app
$api = new api();
$api->name = "Add Profile";
$api->url = HOST . 'add_profile';
$api->method = "POST";
$api->description = "Add Profile";
$api->params->source_id = "1";
$api->params->preferd_products = "custard";
$api->params->preferd_menu = "dessert";
$api->params->prefered_producer_name = "macdonalds";
$api->params->vegitarian = "yes";
$api->params->is_vegan = "1";
$api->params->allergies = "burgers";
$api->params->token = "123";
$api_arr [] = $api;



// Login to app
$api = new api();
$api->name = "Edit Profile";
$api->url = HOST . 'edit_profile';
$api->method = "POST";
$api->description = "Edit Profile";
$api->params->source_id = "1";
$api->params->preferd_products = "custard";
$api->params->preferd_menu = "dessert";
$api->params->prefered_producer_name = "macdonalds";
$api->params->vegitarian = "yes";
$api->params->is_vegan = "1";
$api->params->allergies = "burgers";
$api->params->token = "123";
$api_arr [] = $api;


// Login to app
$api = new api();
$api->name = "Submit Order";
$api->url = HOST . 'add_order';
$api->method = "POST";
$api->description = "Submit Order";
$api->params->source_id = "1";
$api->params->credit_card_id = "1";
$api->params->menu_id = "1";
$api->params->quantity = "10";
$api->params->token = "123";
$api_arr [] = $api;


// Login to app
$api = new api();
$api->name = "Checkout Order";
$api->url = HOST . 'checkout_order';
$api->method = "PUT";
$api->description = "Checkout Order";
$api->params->source_id = "1";
$api->params->order_id = "1";
$api->params->token = "123";
$api_arr [] = $api;


$api = new api();
$api->name = "Add Feed Back";
$api->url = HOST . 'add_feedback';
$api->method = "POST";
$api->description = "Add Feed Back";
$api->params->source_id = "1";
$api->params->beverage_comments = "1";
$api->params->order_delivery = "1";
$api->params->food_quality = "10";
$api->params->courier_service = "10";
$api->params->token = "123";
$api_arr [] = $api;


$api = new api();
$api->name = "Add Feed Back Dishes";
$api->url = HOST . 'add_feedback_dishes';
$api->method = "POST";
$api->description = "Add Feed Back Dishes";
$api->params->source_id = "1";
$api->params->order_id = "1";
$api->params->dish_id = "1";
$api->params->comment = "good";
$api->params->rating = "4";
$api->params->token = "123";
$api_arr [] = $api;



$api = new api();
$api->name = "Update Device Token";
$api->url = HOST . 'update_device_token';
$api->method = "PUT";
$api->description = "Update Device Token";
$api->params->source_id = "1";
$api->params->device_token = "4";
$api->params->token = "123";
$api_arr [] = $api;


$api = new api();
$api->name = "Update Gps Location";
$api->url = HOST . 'updated_gps_location';
$api->method = "PUT";
$api->description = "Update Gps Location";
$api->params->source_id = "1";
$api->params->latitude = "0.0";
$api->params->longitude = "0.0";
$api->params->token = "123";
$api_arr [] = $api;



$api = new api();
$api->name = "Nearest Kitchen";
$api->url = HOST . 'nearest_kitchen';
$api->method = "GET";
$api->description = "Nearest Kitchen";
$api->params->source_id = "1";
$api->params->latitude = "0.0";
$api->params->longitude = "0.0";
$api->params->token = "123";
$api_arr [] = $api;


$api = new api();
$api->name = "Kitchen Menus";
$api->url = HOST . 'kitchen_menus';
$api->method = "GET";
$api->description = "Kitchen Menus";
$api->params->source_id = "1";
$api->params->kitchen_id = "1";
$api->params->token = "123";
$api_arr [] = $api;



$api = new api();
$api->name = "Menu Dishes";
$api->url = HOST . 'menu_dishes';
$api->method = "GET";
$api->description = "Menu Dishes";
$api->params->source_id = "1";
$api->params->menu_id = "1";
$api->params->token = "123";
$api_arr [] = $api;



$api = new api();
$api->name = "Dish Details";
$api->url = HOST . 'dish_details';
$api->method = "GET";
$api->description = "Dish Details";
$api->params->source_id = "1";
$api->params->dish_id = "1";
$api->params->token = "123";
$api_arr [] = $api;


$api = new api();
$api->name = "Dish Select";
$api->url = HOST . 'select_dish';
$api->method = "PUT";
$api->description = "Dish Select";
$api->params->source_id = "1";
$api->params->dish_id = "1";
$api->params->menu_id = "1";
$api->params->token = "123";
$api_arr [] = $api;


$api = new api();
$api->name = "Logout User";
$api->url = HOST . 'logout_user';
$api->method = "POST";
$api->description = "Logout User";
$api->params->source_id = "1";
$api->params->token = "123";
$api_arr [] = $api;

$api = new api();
$api->name = "Generate Token";
$api->url = HOST . 'generate_token';
$api->method = "POST";
$api->description = "Generate Token";
$api->params->source_id = "1";
$api->params->password = "123";
$api_arr [] = $api;