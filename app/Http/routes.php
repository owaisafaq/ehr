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
    $app->options('add_patient_archive','App\Http\Controllers\ApiController@optadd_patient_archive');
    $app->post('update_patient_archive','App\Http\Controllers\ApiController@update_patient_archive');
    $app->post('upload_patient_image', 'App\Http\Controllers\ApiController@upload_patient_image');
    $app->options('upload_patient_image','App\Http\Controllers\ApiController@optupload_patient_image');


});




$app->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($app) {


    $app->post('register_patient', 'App\Http\Controllers\ApiController@register_patient');


    $app->post('add_patient', 'App\Http\Controllers\ApiController@add_patient');

    $app->post('delete_patient', 'App\Http\Controllers\ApiController@delete_patient');

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

    $app->post('add_patient_medications','App\Http\Controllers\ApiController@add_patient_medications');

    $app->get('patient_supplements','App\Http\Controllers\ApiController@patient_supplements');

    $app->post('add_patient_supplements','App\Http\Controllers\ApiController@add_patient_supplements');

    $app->get('patient_allergies','App\Http\Controllers\ApiController@patient_allergies');

    $app->post('add_patient_allergies','App\Http\Controllers\ApiController@add_patient_allergies');
    
    $app->post('update_patient_allergies','App\Http\Controllers\ApiController@update_patient_allergies');

    $app->post('delete_patient_allergies','App\Http\Controllers\ApiController@delete_patient_allergies');

    $app->get('patient_visit_list','App\Http\Controllers\ApiController@patient_visit_list');

    $app->get('get_all_patients','App\Http\Controllers\ApiController@get_all_patients');

    $app->get('get_patient_appointments','App\Http\Controllers\ApiController@get_patient_appointments');

    $app->post('add_patient_appointments','App\Http\Controllers\ApiController@add_patient_appointments');

    $app->post('update_patient_appointments','App\Http\Controllers\ApiController@update_patient_appointments');

    $app->post('delete_patient_appointments','App\Http\Controllers\ApiController@delete_patient_appointments');

    $app->post('add_resources','App\Http\Controllers\ApiController@add_resources');

    $app->get('list_resources','App\Http\Controllers\ApiController@list_resources');

    $app->get('list_resources_back','App\Http\Controllers\ApiController@list_resources_back');

    $app->get('list_patient_resources','App\Http\Controllers\ApiController@list_patient_resources');

    $app->get('list_patient_resources_back','App\Http\Controllers\ApiController@list_patient_resources_back');

    $app->post('update_patient_resources','App\Http\Controllers\ApiController@update_patient_resources');

    $app->post('delete_patient_resources','App\Http\Controllers\ApiController@delete_patient_resources');

    $app->get('clinical_progress_note_templates','App\Http\Controllers\ApiController@clinical_progress_note_templates');

    $app->get('clinical_progress_note_fields','App\Http\Controllers\ApiController@clinical_progress_note_fields');

    $app->post('add_patient_clinical_notes','App\Http\Controllers\ApiController@add_patient_clinical_notes');

    $app->post('checkout_patient','App\Http\Controllers\ApiController@checkout_patient');

    $app->post('add_patient_referel','App\Http\Controllers\ApiController@add_patient_referel');

    $app->get('get_lab_tests','App\Http\Controllers\OrderController@get_lab_tests');

    $app->get('get_lab_test_details','App\Http\Controllers\OrderController@get_lab_test_details');

    $app->get('get_all_lab_orders','App\Http\Controllers\OrderController@get_all_lab_orders');

    $app->get('get_patient_lab_orders','App\Http\Controllers\OrderController@get_patient_lab_orders');

    $app->get('get_lab_order','App\Http\Controllers\OrderController@get_lab_order');

    $app->post('add_lab_order','App\Http\Controllers\OrderController@add_lab_order');

    $app->post('cancel_lab_order','App\Http\Controllers\OrderController@cancel_lab_order');

    $app->post('update_lab_test','App\Http\Controllers\OrderController@update_lab_test');

    $app->get('get_lab_test_fields','App\Http\Controllers\OrderController@get_lab_test_fields');

    $app->post('add_lab_test_values','App\Http\Controllers\OrderController@add_lab_test_values');

    $app->get('get_lab_test_templates','App\Http\Controllers\OrderController@get_lab_test_templates');

    $app->post('add_lab_test_templates','App\Http\Controllers\OrderController@add_lab_test_templates');

    $app->post('update_lab_test_templates','App\Http\Controllers\OrderController@update_lab_test_templates');

    $app->post('delete_lab_test_templates','App\Http\Controllers\OrderController@delete_lab_test_templates');


    $app->get('get_pharmacies','App\Http\Controllers\OtherController@get_pharmacies');

    $app->get('get_single_pharmacy','App\Http\Controllers\OtherController@get_single_pharmacy');

    $app->post('create_pharmacy','App\Http\Controllers\OtherController@create_pharmacy');

    $app->post('update_pharmacy','App\Http\Controllers\OtherController@update_pharmacy');

    $app->post('delete_pharmacy','App\Http\Controllers\OtherController@delete_pharmacy');

    $app->post('add_manufacturer','App\Http\Controllers\ApiController@add_manufacturer');

    $app->get('get_frequency','App\Http\Controllers\ApiController@get_frequency');

    $app->get('get_intake','App\Http\Controllers\ApiController@get_intake');

    $app->get('get_lab_order_history','App\Http\Controllers\OrderController@get_lab_order_history');

    $app->get('get_lab_template_categories','App\Http\Controllers\OrderController@get_lab_template_categories');
    $app->post('get_lab_template_category','App\Http\Controllers\OrderController@get_lab_template_category');
    $app->post('add_lab_template_category','App\Http\Controllers\OrderController@add_lab_template_category');
    $app->post('update_lab_template_category','App\Http\Controllers\OrderController@update_lab_template_category');
    $app->post('delete_lab_template_category','App\Http\Controllers\OrderController@delete_lab_template_category');

    $app->get('get_lab_template_types','App\Http\Controllers\OrderController@get_lab_template_types');
    $app->post('get_lab_template_type','App\Http\Controllers\OrderController@get_lab_template_type');
    $app->post('update_lab_template_types','App\Http\Controllers\OrderController@update_lab_template_types');
    $app->post('add_lab_template_types','App\Http\Controllers\OrderController@add_lab_template_types');
    $app->post('delete_lab_template_types','App\Http\Controllers\OrderController@delete_lab_template_types');
    $app->get('get_templates','App\Http\Controllers\ApiController@get_templates');
    $app->post('delete_template','App\Http\Controllers\ApiController@delete_template');
    $app->post('add_template','App\Http\Controllers\ApiController@add_template');
    $app->get('get_templates_categories','App\Http\Controllers\ApiController@get_templates_categories');
    $app->post('delete_template_category','App\Http\Controllers\ApiController@delete_template_category');
    $app->post('add_template_category','App\Http\Controllers\ApiController@add_template_category');


    $app->get('get_template_details','App\Http\Controllers\OrderController@get_template_details');
    $app->post('add_patient_prescription','App\Http\Controllers\ApiController@add_patient_prescription');
    $app->post('update_patient_prescription','App\Http\Controllers\ApiController@update_patient_prescription');
    $app->post('add_prescription_medication','App\Http\Controllers\ApiController@add_prescription_medication');
    $app->post('get_all_prescription','App\Http\Controllers\ApiController@get_all_prescription');
    $app->get('get_prescription_list','App\Http\Controllers\ApiController@get_prescription_list');
    $app->get('get_prescription','App\Http\Controllers\ApiController@get_prescription');
    $app->get('get_patient_medications','App\Http\Controllers\ApiController@get_patient_medications');
    $app->post('update_prescription','App\Http\Controllers\ApiController@update_prescription');
    $app->post('remove_patient_precription_medications','App\Http\Controllers\OtherController@remove_patient_precription_medications');


    $app->post('add_immunization','App\Http\Controllers\OtherController@add_immunization');
    $app->get('list_immunizations','App\Http\Controllers\OtherController@list_immunizations');
    $app->post('delete_immunization','App\Http\Controllers\OtherController@delete_immunization');

    $app->get('get_medicine_units','App\Http\Controllers\OtherController@get_medicine_units');
    $app->get('get_dashboard_counts','App\Http\Controllers\OtherController@get_dashboard_counts');

    //services regarding wards

     $app->post('create_ward','App\Http\Controllers\OtherController@create_ward');

});
$app->group(['prefix' => 'api','middleware' => 'jwt.auth'], function () use ($app) {
    $app->post('create_inventory_category','App\Http\Controllers\InventoryAPIController@create_category');
    $app->post('update_inventory_category','App\Http\Controllers\InventoryAPIController@update_category');
    $app->get('get_inventory_category','App\Http\Controllers\InventoryAPIController@get_categories');
    $app->get('get_inventory_single_category','App\Http\Controllers\InventoryAPIController@get_single_category');
    $app->post('delete_inventory_category','App\Http\Controllers\InventoryAPIController@delete_category');

    $app->post('create_inventory_supplier','App\Http\Controllers\InventoryAPIController@create_supplier');
    $app->post('update_inventory_supplier','App\Http\Controllers\InventoryAPIController@update_supplier');
    $app->get('get_inventory_suppliers','App\Http\Controllers\InventoryAPIController@get_suppliers');
    $app->get('get_inventory_single_supplier','App\Http\Controllers\InventoryAPIController@get_single_supplier');
    $app->post('delete_inventory_supplier','App\Http\Controllers\InventoryAPIController@delete_supplier');

    $app->get('get_stock','App\Http\Controllers\InventoryAPIController@get_stock');
    $app->get('get_active_stock','App\Http\Controllers\InventoryAPIController@get_active_stock');
    $app->get('get_inactive_stock','App\Http\Controllers\InventoryAPIController@get_inactive_stock');
    $app->get('get_stock_details','App\Http\Controllers\InventoryAPIController@get_stock_details');
    $app->post('add_inventory','App\Http\Controllers\InventoryAPIController@add_stock');
    $app->post('delete_inventory','App\Http\Controllers\InventoryAPIController@delete_stock');
    $app->post('update_inventory','App\Http\Controllers\InventoryAPIController@update_stock');
    $app->post('update_reorder_level','App\Http\Controllers\InventoryAPIController@update_order_level');
    $app->post('update_reorder_level','App\Http\Controllers\InventoryAPIController@update_order_level');
    $app->post('add_product','App\Http\Controllers\InventoryAPIController@add_product');
    $app->post('add_product_inventory','App\Http\Controllers\InventoryAPIController@add_product_inventory');
    $app->post('get_reorder_level','App\Http\Controllers\InventoryAPIController@get_reorder_level');
    $app->post('update_product','App\Http\Controllers\InventoryAPIController@update_product');
    $app->post('get_product','App\Http\Controllers\InventoryAPIController@get_product');

    $app->get('get_all_bills','App\Http\Controllers\BillingController@get_all_bills');
    $app->get('get_all_invoices','App\Http\Controllers\BillingController@get_all_invoices');
    $app->post('update_invoice','App\Http\Controllers\BillingController@update_invoice');
    $app->get('get_invoice_data','App\Http\Controllers\BillingController@get_invoice_data');
    $app->get('get_invoice_status','App\Http\Controllers\BillingController@get_invoice_status');
    $app->get('get_billing_data','App\Http\Controllers\BillingController@get_billing_data');
    $app->post('delete_invoice','App\Http\Controllers\BillingController@delete_invoice');

    $app->get('get_lab_test_pdf','App\Http\Controllers\PDFController@get_lab_test_pdf');
    $app->post('send_invoice_email','App\Http\Controllers\PDFController@send_invoice_email');
    $app->get('get_bill_invoices','App\Http\Controllers\BillingController@get_bill_invoices');
    $app->post('inventory_inactive','App\Http\Controllers\InventoryAPIController@inventory_inactive');

});