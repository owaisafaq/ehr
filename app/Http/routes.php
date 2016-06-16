<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});


$app->group(['prefix' => 'api'], function () use ($app) {

    $app->post('register_user','App\Http\Controllers\ApiController@register_user');

    $app->post('user_login','App\Http\Controllers\ApiController@user_login');
    
    $app->post('search_patient', 'App\Http\Controllers\ApiController@search_patient');

    $app->post('add_patient_archive','App\Http\Controllers\ApiController@add_patient_archive');

    $app->post('update_patient_archive','App\Http\Controllers\ApiController@update_patient_archive');


});




$app->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($app) {


    $app->post('register_patient', 'App\Http\Controllers\ApiController@register_patient');

    $app->post('add_patient', 'App\Http\Controllers\ApiController@add_patient');

    $app->post('add_patient_address', 'App\Http\Controllers\ApiController@add_patient_address');

    $app->post('add_patient_kin', 'App\Http\Controllers\ApiController@add_patient_kin');

    $app->post('add_patient_employees', 'App\Http\Controllers\ApiController@add_patient_employees');

    $app->post('add_visit' ,'App\Http\Controllers\ApiController@add_visit');

    $app->post('update_visit' ,'App\Http\Controllers\ApiController@update_visit');

    $app->get('get_countries' ,'App\Http\Controllers\ApiController@get_countries');

    $app->get('get_states' ,'App\Http\Controllers\ApiController@get_states');

    $app->get('get_cities' ,'App\Http\Controllers\ApiController@get_cities');

    $app->get('get_local_goverment_area' ,'App\Http\Controllers\ApiController@get_local_goverment_area');

    $app->get('get_dropdowndata' ,'App\Http\Controllers\ApiController@get_dropdowndata');

    $app->get('get_patient_vitals','App\Http\Controllers\ApiController@get_patient_vitals');

    $app->get('get_patient_plan','App\Http\Controllers\ApiController@get_patient_plan');

    $app->post('add_patient_plan','App\Http\Controllers\ApiController@add_patient_plan');

    $app->get('get_patient','App\Http\Controllers\ApiController@get_patient');

    $app->get('get_visits','App\Http\Controllers\ApiController@get_visits');

    $app->get('get_patient_all_data','App\Http\Controllers\ApiController@get_patient_all_data');

    $app->post('add_patient_vitals','App\Http\Controllers\ApiController@add_patient_vitals');

    $app->get('get_patient_visit_history','App\Http\Controllers\ApiController@get_patient_visit_history');

    $app->get('get_patient_vital_history','App\Http\Controllers\ApiController@get_patient_vital_history');

    $app->get('get_patient_vital_history','App\Http\Controllers\ApiController@get_patient_vital_history');

    $app->post('update_visit_status','App\Http\Controllers\ApiController@update_visit_status');

    $app->get('get_patient_demographics','App\Http\Controllers\ApiController@get_patient_demographics');

    $app->get('remove_visit','App\Http\Controllers\ApiController@remove_visit');

    $app->get('visit_details','App\Http\Controllers\ApiController@visit_details');

    $app->get('patient_archives','App\Http\Controllers\ApiController@patient_archives');

    $app->get('remove_patient_archive','App\Http\Controllers\ApiController@remove_patient_archive');

    $app->get('patient_medications','App\Http\Controllers\ApiController@patient_medications');

    $app->get('patient_supplements','App\Http\Controllers\ApiController@patient_supplements');

    $app->get('patient_allergies','App\Http\Controllers\ApiController@patient_allergies');

    $app->get('patient_visit_list','App\Http\Controllers\ApiController@patient_visit_list');

    $app->get('get_all_patients','App\Http\Controllers\ApiController@get_all_patients');

    $app->get('get_patient_appointments','App\Http\Controllers\ApiController@get_patient_appointments');

    $app->post('add_resources','App\Http\Controllers\ApiController@add_resources');

});