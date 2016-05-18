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

    $app->post('register_user', 'App\Http\Controllers\ApiController@register_user');

    $app->post('user_login', 'App\Http\Controllers\ApiController@user_login');



});




$app->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($app) {


    $app->post('register_patient', 'App\Http\Controllers\ApiController@register_patient');



});