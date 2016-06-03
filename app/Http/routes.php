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



});




$app->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($app) {


    $app->post('register_patient', 'App\Http\Controllers\ApiController@register_patient');

    $app->post('add_patient', 'App\Http\Controllers\ApiController@add_patient');

    $app->post('search_patient', 'App\Http\Controllers\ApiController@search_patient');

   // $app->put('add_patient', 'App\Http\Controllers\ApiController@add_patient');

    $app->post('add_patient_address', 'App\Http\Controllers\ApiController@add_patient_address');

    $app->put('add_patient_address', 'App\Http\Controllers\ApiController@add_patient_address');

    $app->post('add_patient_kin', 'App\Http\Controllers\ApiController@add_patient_kin');

    $app->post('add_patient_employees', 'App\Http\Controllers\ApiController@add_patient_employees');

    $app->post('add_visit' ,'App\Http\Controllers\ApiController@add_visit');

    $app->get('get_countries' ,'App\Http\Controllers\ApiController@get_countries');

    $app->get('get_states' ,'App\Http\Controllers\ApiController@get_states');

    $app->get('get_cities' ,'App\Http\Controllers\ApiController@get_cities');

    $app->get('get_local_goverment_area' ,'App\Http\Controllers\ApiController@get_local_goverment_area');

    $app->get('get_dropdowndata' ,'App\Http\Controllers\ApiController@get_dropdowndata');

    $app->get('patient_visit_list','App\Http\Controllers\ApiController@patient_visit_list');

    $app->get('get_patient_vitals','App\Http\Controllers\ApiController@get_patient_vitals');

    $app->get('get_patient_plan','App\Http\Controllers\ApiController@get_patient_plan');

});