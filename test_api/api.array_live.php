<?php

    require 'api.class.php';
    //define('HOST', 'http://hiapp.dev/api/');
    define('HOST', 'http://aplosinnovations.com/demos/hiapp/api/');
    define('APP', '');
    define('ROUTE', '');

    // Initialize Array
    $api_arr = array();

    // Login to app
    $api = new api();
    $api->name = "Log In";
    $api->url =  HOST . 'user/login' ;
    $api->method = "GET";
    $api->description = "Login to app";
    $api->params->username = "peter";
    $api->params->password = "e10adc3949ba59abbe56e057f20f883e";
    $api_arr [] = $api;

    // Register user
    $api = new api();
    $api->name = "Register";
    $api->url =  HOST . 'user/register' ;
    $api->method = "POST";
    $api->description = "Register user";
    $api->params->username = "peter";
    $api->params->password = "e10adc3949ba59abbe56e057f20f883e";
    $api->params->email = 'test@test.com';
    $api_arr [] = $api;

    // Get Location
    $api = new api();
    $api->name = "Get Location";
    $api->url =  HOST . 'user/location' ;
    $api->method = "GET";
    $api->description = "Get User Location";
    $api->params->user_id = "1";
    $api_arr [] = $api;

    // Post Location
    $api = new api();
    $api->name = "Set Location";
    $api->url =  HOST . 'user/location' ;
    $api->method = "POST";
    $api->description = "POST User Location";
    $api->params->id = "1";
    $api->params->city = "Karachi";
    $api->params->lat = "123456";
    $api->params->lon = "123456";
    $api_arr [] = $api;


    // Forgot Password
    $api = new api();
    $api->name = "Forgot Password";
    $api->url =  HOST . 'user/forgot_password' ;
    $api->method = "POST";
    $api->description = "Forgto Password Request";
    $api->params->email = "ghulammurtaza@dezigncore.com";
    $api_arr [] = $api;


    // Get Categories
    $api = new api();
    $api->name = "Get Categories (No Params)";
    $api->url =  HOST . 'user/post_types' ;
    $api->method = "GET";
    $api_arr [] = $api;


    // Save Post News
    $api = new api();
    $api->name = "Save Post News";
    $api->url =  HOST . 'user/savepost' ;
    $api->method = "POST";
    $api->params->title = 'title';
    $api->params->lat = '123456';
    $api->params->lon = '123456';
    $api->params->content = 'Temp';
    $api->params->city_id = '1';
    $api->params->is_premium_content = '0';
    $api->params->user_id = '1';
    $api->params->post_type_id = '1';
    $api->params->image1 = 'file';
    $api->params->image2 = 'file';
    $api->params->image3 = 'file';
    $api_arr [] = $api;


    // Save Post Event
    $api = new api();
    $api->name = "Save Post Event";
    $api->url =  HOST . 'user/savepost' ;
    $api->method = "POST";
    $api->params->title = 'title';
    $api->params->lat = '123456';
    $api->params->lon = '123456';
    $api->params->content = 'Temp';
    $api->params->city_id = '1';
    $api->params->category_id = '3';
    $api->params->is_premium_content = '0';
    $api->params->user_id = '1';
    $api->params->post_type_id = '2';
    $api->params->image1 = 'file';
    $api->params->image2 = 'file';
    $api->params->image3 = 'file';
    // Events param
    $api->params->venue = 'Dolmen mall';
    $api->params->start_time = '10am';
    $api->params->end_time = '03:30pm';
    $api->params->event_website_url = 'http://www.google.com';
    $api->params->is_repeat = '0';
    $api->params->repeat_frequency = '0';
    $api->params->phone = '0123456';
    $api->params->ticket_purchase_url = 'http://www.yahoo.com';
    $api->params->age_range = '20-30';
    $api_arr [] = $api;


    // Get Posts
    $api = new api();
    $api->name = "Get Posts";
    $api->url =  HOST . 'user/posts' ;
    $api->method = "GET";
    $api->params->where = 'a=a';
    $api_arr [] = $api;

    // Like Post
    $api = new api();
    $api->name = "Like Posts";
    $api->url =  HOST . 'user/like' ;
    $api->method = "POST";
    $api->params->post_id = '1';
    $api->params->user_id = '1';
    $api->params->action = 'like';
    $api_arr [] = $api;


    // Ignite Post
    $api = new api();
    $api->name = "Ignite Post";
    $api->url =  HOST . 'user/ignite' ;
    $api->method = "POST";
    $api->params->post_id = '1';
    $api->params->user_id = '1';
    $api->params->action = 'ignite';
    $api_arr [] = $api;

    // Flag Post
    $api = new api();
    $api->name = "Flag Post";
    $api->url =  HOST . 'user/flag' ;
    $api->method = "POST";
    $api->params->post_id = '1';
    $api->params->user_id = '1';
    $api->params->action = 'flag';
    $api_arr [] = $api;

    // Comment on Post
    $api = new api();
    $api->name = "Comment Post";
    $api->url =  HOST . 'user/comment' ;
    $api->method = "POST";
    $api->params->post_id = '1';
    $api->params->user_id = '1';
    $api->params->content = 'This was a great';
    $api_arr [] = $api;


    // Delete comment Post
    $api = new api();
    $api->name = "Delete a Comment on Post";
    $api->url =  HOST . 'user/comment' ;
    $api->method = "POST";
    $api->params->comment_id = '1';
    $api_arr [] = $api;

    // Comment on Post
    $api = new api();
    $api->name = "Share Post";
    $api->url =  HOST . 'user/share' ;
    $api->method = "POST";
    $api->params->post_id = '1';
    $api->params->user_id = '1';
    $api->params->share_channel = 'Facebook';
    $api_arr [] = $api;


    // Get Cities
    $api = new api();
    $api->name = "Get Cities";
    $api->url =  HOST . 'user/cities' ;
    $api->method = "GET";
    $api_arr [] = $api;


    // Get Hot Cities
    $api = new api();
    $api->name = "Get Hot Cities";
    $api->url =  HOST . 'user/hot_cities' ;
    $api->method = "GET";
    $api_arr [] = $api;





    
