<?php

namespace App\Http\Controllers;

use Illuminate\Http\Exception\HttpResponseException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Response as IlluminateResponse;


use Illuminate\Support\Facades\File;
use DB;


class OtherController extends Controller
{


    public function __construct(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        date_default_timezone_set("Africa/Lagos");

        if ($request->input('token')) {

            $token = $request->input('token');
            $user_id = JWTAuth::authenticate($token)->id;

            if (!isset($user_id)) {
                return response()->json(['status' => false, 'message' => 'Invalid Token']);
            }

            $user_status = DB::table('users')
                ->select(DB::raw('user_status'))
                ->where('id', $user_id)
                ->first();

            if ($user_status->user_status == 'block') {
                return response()->json(['status' => false, 'message' => 'This user is Blocked']);
            }
        }
    }


    protected function checkToken($token, $user_id)
    {

        $user_from_token = JWTAuth::authenticate($token)->id;
        if ($user_id != $user_from_token) {

            return false;
        }
        return true;
    }

    public function get_pharmacies(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            $pharmacies = DB::table('pharmacy')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('pharmacy')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->count();

        } else {

            $pharmacies = DB::table('pharmacy')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->get();

            $count = count($pharmacies);
        }
        return response()->json(['status' => true, 'data' => $pharmacies, 'count' => $count]);
    }

    public function get_single_pharmacy(Request $request)
    {
        $id = $request->input('pharmacy_id');
        $pharmacies = DB::table('pharmacy')
            ->select(DB::raw('*'))
            ->where('status', 1)
            ->where('id', $id)
            ->get();

        return response()->json(['status' => true, 'data' => $pharmacies]);
    }

    public function create_pharmacy(Request $request)
    {
        $name = $request->input('name');
        $contact_person = $request->input('contact_person');
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $address_1 = $request->input('address_1');
        $address_2 = $request->input('address_2');
        $email = $request->input('email');
        $work_phone = $request->input('work_phone');
        $post_code = $request->input('post_code');

        $id = DB::table('pharmacy')->insertGetId(
            [
                'name' => $name,
                'contact_person' => $contact_person,
                'city' => $city,
                'state' => $state,
                'country' => $country,
                'address_1' => $address_1,
                'address_2' => $address_2,
                'email' => $email,
                'work_phone' => $work_phone,
                'post_code' => $post_code,
                'created_at' => date("Y-m-d  H:i:s")
            ]
        );
        if ($id) {
            return response()->json(['status' => true, 'message' => "Pharmacy Added Successfully", 'pharmacy_id' => $id], 200);
        } else {
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }

    public function update_pharmacy(Request $request)
    {
        $id = $request->input('pharmacy_id');
        $name = $request->input('name');
        $contact_person = $request->input('contact_person');
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $address_1 = $request->input('address_1');
        $address_2 = $request->input('address_2');
        $email = $request->input('email');
        $work_phone = $request->input('work_phone');
        $post_code = $request->input('post_code');

        $count = DB::table('pharmacy')->where('id', $id)->update(
            [
                'name' => $name,
                'contact_person' => $contact_person,
                'city' => $city,
                'state' => $state,
                'country' => $country,
                'address_1' => $address_1,
                'address_2' => $address_2,
                'email' => $email,
                'work_phone' => $work_phone,
                'post_code' => $post_code,
                'updated_at' => date("Y-m-d  H:i:s")
            ]
        );
        if ($count) {
            return response()->json(['status' => true, 'message' => "Pharmacy Updated Successfully"], 200);
        } else {
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }

    public function delete_pharmacy(Request $request)
    {
        $id = $request->input('pharmacy_id');
        $count = DB::table('pharmacy')->where('id', $id)->update(['status' => 0]);
        if ($count) {
            return response()->json(['status' => true, 'message' => "Pharmacy Deleted Successfully"], 200);
        } else {
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }

    public function add_immunization(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $name = $request->input('name');
        DB::table('patient_immunizations')
            ->insert(
                ['patient_id' => $patient_id,
                    'name' => $name,
                    'created_at' => date("Y-m-d  H:i:s")

                ]
            );

        return response()->json(['status' => true, 'message' => 'Immunization Added Successfully']);

    }

    public function list_immunizations(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $patient_immunizations = DB::table('patient_immunizations')
            ->select(DB::raw('*'))
            ->where('status', 1)
            ->where('patient_id', $patient_id)
            ->get();

        return response()->json(['status' => true, 'data' => $patient_immunizations]);

    }


    public function delete_immunization(Request $request)
    {
        $immuization_id = $request->input('immuization_id');
        DB::table('patient_immunizations')
            ->where('id', $immuization_id)
            ->update(
                ['status' => 0, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        return response()->json(['status' => true, 'message' => 'Immunization Deleted Successfully']);
    }


    public function remove_patient_precription_medications(Request $request)
    {
        $prescribe_medication_id = $request->input('prescribe_medication_id');
        DB::table('patient_prescription_medicine')
            ->where('id', $prescribe_medication_id)
            ->update(
                ['status' => 0, 'updated_at' => date("Y-m-d  H:i:s")]
            );


        return response()->json(['status' => true, 'message' => 'Medication Deleted Successfully']);


    }

    public function get_medicine_units(Request $request)
    {
        $dosage = DB::table('medicine_units')
            ->select(DB::raw('id,dosage'))
            ->where('status', 1)
            ->where('dosage', '!=', '')
            ->get();

        $unit = DB::table('medicine_units')
            ->select(DB::raw('id,unit'))
            ->where('status', 1)
            ->where('unit', '!=', '')
            ->get();

        $route = DB::table('medicine_units')
            ->select(DB::raw('id,route'))
            ->where('status', 1)
            ->where('route', '!=', '')
            ->get();

        $frequency = DB::table('medicine_units')
            ->select(DB::raw('id,frequency'))
            ->where('status', 1)
            ->where('frequency', '!=', '')
            ->get();


        $direction = DB::table('medicine_units')
            ->select(DB::raw('id,direction'))
            ->where('status', 1)
            ->where('direction', '!=', '')
            ->get();


        $duration = DB::table('medicine_units')
            ->select(DB::raw('id,duration'))
            ->where('status', 1)
            ->where('duration', '!=', '')
            ->get();

        $data = array(
            "dosage" => $dosage,
            "unit" => $unit,
            "route" => $route,
            "frequency" => $frequency,
            "direction" => $direction,
            "duration" => $duration

        );

        return response()->json(['status' => true, 'data' => $data]);

    }

    public function get_dashboard_counts(Request $request)
    {
        $patients_count = DB::table('patients')
            ->where('status', 1)
            ->count();

        $visits_count = DB::table('visits')
            ->where('status', 1)
            ->count();

        $appointment_count = DB::table('appointments')
            ->where('status', 1)
            ->count();


        $pharmacy_count = DB::table('pharmacy')
            ->where('status', 1)
            ->count();


        $inventory_products_count = DB::table('inventory_products')
            ->where('status', 1)
            ->count();

        $lab_order_count = DB::table('lab_orders')
            ->where('status', 1)
            ->count();

        $billing_count = DB::table('billing')
            ->where('status', 1)
            ->count();

        $wards_count = DB::table('wards')
            ->where('status', 1)
            ->count();

        $pool_area_count = DB::table('visits')
            ->where('status', 1)
            ->where('visit_status', '!=', 'checkout')
            ->groupby('visits.patient_id')
            ->count();

        $data = array(
            "patients_count" => $patients_count,
            "encounter_count" => $visits_count,
            "patient_registration_count" => $patients_count,
            "appointments_count" => $appointment_count,
            "pharmacy_count" => $pharmacy_count,
            "wards_count" => $wards_count,
            "radiology_count" => 00,
            "patient_pool_area_count" => $pool_area_count,
            "inventory_count" => $inventory_products_count,
            "laboratory_count" => $lab_order_count,
            "billing_count" => $billing_count
        );

        return response()->json(['status' => true, 'data' => $data]);
    }

    public function create_ward(Request $request)
    {
        $ward_id = $request->input('ward_id');
        $ward = $request->input('ward');
        $speciality = $request->input('speciality');
        $number_of_beds = $request->input('number_of_beds');
        $description = $request->input('description');

        if (isset($ward_id)) {
            DB::table('wards')
                ->where('id', $ward_id)
                ->update(
                    ['department_id' => $speciality,
                        'name' => $ward,
                        'number_of_beds' => $number_of_beds,
                        'available_beds' => $number_of_beds,
                        'description' => $description,
                        'updated_at' => date("Y-m-d  H:i:s")]
                );
            return response()->json(['status' => true, 'message' => 'Ward Updated Successfully']);

        } else {
            DB::table('wards')
                ->insert(
                    ['department_id' => $speciality,
                        'name' => $ward,
                        'number_of_beds' => $number_of_beds,
                        'available_beds' => $number_of_beds,
                        'description' => $description,
                        'created_at' => date("Y-m-d  H:i:s")]
                );

            return response()->json(['status' => true, 'message' => 'Ward Added Successfully']);

        }
    }

    public function get_single_ward(Request $request)
    {
        $ward_id = $request->input('ward_id');
        $data = DB::table('wards')
            ->leftJoin('departments', 'departments.id', '=', 'wards.department_id')
            ->select(DB::raw('wards.id,wards.name,wards.number_of_beds,wards.available_beds,wards.number_of_beds_closed,wards.number_of_beds_occupied,departments.name as speciality,wards.description,departments.id as department_id'))
            ->where('wards.status', 1)
            ->where('wards.id', $ward_id)
            ->first();
        return response()->json(['status' => true, 'data' => $data]);
    }

    public function delete_ward(Request $request)
    {
        $ward_id = $request->input('ward_id');

        DB::table('wards')
            ->where('id', $ward_id)
            ->update(
                ['status' => 0, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        return response()->json(['status' => true, 'message' => 'Ward Delteted Successfully']);

    }

    public function bed_occupancy(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');
        if ($limit > 0 || $offset > 0) {
            $data = DB::table('wards')
                ->leftJoin('departments', 'departments.id', '=', 'wards.department_id')
                ->select(DB::raw('wards.id,wards.name,wards.number_of_beds,wards.available_beds,wards.number_of_beds_closed,wards.number_of_beds_occupied,departments.name as speciality,wards.description'))
                ->where('wards.status', 1)
                ->skip($offset)->take($limit)
                ->get();
        } else {
            $data = DB::table('wards')
                ->leftJoin('departments', 'departments.id', '=', 'wards.department_id')
                ->select(DB::raw('wards.id,wards.name,wards.number_of_beds,wards.available_beds,wards.number_of_beds_closed,wards.number_of_beds_occupied,departments.name as speciality,wards.description'))
                ->where('wards.status', 1)
                ->get();
        }
        foreach ($data as $bed) {
            $bed->patients_wating = '';
            $bed->expected_discharge_date = '';
        }
        $count = DB::table('wards')->where('status', 1)->count();
        return response()->json(['status' => true, 'data' => $data, 'count' => $count]);

    }

    public function ward_occupancy(Request $request)
    {
        $ward_id = $request->input('ward_id');
        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {
            $beds = DB::table('beds')
                ->leftJoin('patients_admitted', 'beds.patient_id', '=', 'patients_admitted.patient_id')
                ->leftJoin('patients', 'patients.id', '=', 'patients_admitted.patient_id')
                ->select(DB::raw('beds.id,beds.bed_status,patients.first_name,patients.middle_name,patients.last_name,patients.date_of_birth,patients.sex,patients_admitted.expected_discharge_date'))
                ->where('beds.status', 1)
                ->where('beds.ward_id', $ward_id)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('beds')
                ->leftJoin('patients_admitted', 'beds.patient_id', '=', 'patients_admitted.patient_id')
                ->leftJoin('patients', 'patients.id', '=', 'patients_admitted.patient_id')
                ->select(DB::raw('beds.id,beds.bed_status,patients.first_name,patients.middle_name,patients.last_name,patients.date_of_birth,patients.sex,patients_admitted.expected_discharge_date'))
                ->where('beds.status', 1)
                ->where('beds.ward_id', $ward_id)
                ->count();
        } else {
            $beds = DB::table('beds')
                ->leftJoin('patients_admitted', 'beds.patient_id', '=', 'patients_admitted.patient_id')
                ->leftJoin('patients', 'patients.id', '=', 'patients_admitted.patient_id')
                ->select(DB::raw('beds.id,beds.bed_status,patients.first_name,patients.middle_name,patients.last_name,patients.date_of_birth,patients.sex,patients_admitted.expected_discharge_date'))
                ->where('beds.status', 1)
                ->where('beds.ward_id', $ward_id)
                ->get();

            $count = count($beds);
        }
        foreach ($beds as $bed) {
            if ($bed->sex == 1) {
                $bed->gender = 'Male';
            } else {
                $bed->gender = 'FeMale';
            }
        }

        return response()->json(['status' => true, 'data' => $beds, 'count' => $count]);

    }


    public function patients_admitted(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {
            $data = DB::table('patients_admitted')
                ->leftJoin('beds', 'patients_admitted.patient_id', '=', 'beds.patient_id')
                ->leftJoin('wards', 'patients_admitted.ward_id', '=', 'wards.id')
                ->leftJoin('departments', 'patients_admitted.department_id', '=', 'departments.id')
                ->leftJoin('patients', 'patients_admitted.patient_id', '=', 'patients.id')
                ->select(DB::raw('patients_admitted.id,patients_admitted.patient_id,patients.first_name,patients.middle_name,patients.last_name,patients_admitted.admit_date,patients_admitted.expected_discharge_date,departments.id as department_id,departments.name as speciality,wards.name as ward,beds.id as bed'))
                ->where('patients_admitted.status', 1)
                ->where('patients_admitted.is_discharged', 0)
                ->where('beds.patient_id', '!=', 0)
                ->groupby('patients_admitted.id')
                ->skip($offset)->take($limit)
                ->get();

            $patients = DB::table('patients_admitted')
                ->leftJoin('beds', 'patients_admitted.patient_id', '=', 'beds.patient_id')
                ->leftJoin('wards', 'patients_admitted.ward_id', '=', 'wards.id')
                ->leftJoin('departments', 'patients_admitted.department_id', '=', 'departments.id')
                ->leftJoin('patients', 'patients_admitted.patient_id', '=', 'patients.id')
                ->select(DB::raw('patients_admitted.id,patients_admitted.patient_id,patients.first_name,patients.middle_name,patients.last_name,patients_admitted.admit_date,patients_admitted.expected_discharge_date,departments.id as department_id,departments.name as speciality,wards.name as ward,beds.id as bed'))
                ->where('patients_admitted.status', 1)
                ->where('patients_admitted.is_discharged', 0)
                ->where('beds.patient_id', '!=', 0)
                ->groupby('patients_admitted.id')
                ->get();
            $count = count($patients);

        } else {
            $data = DB::table('patients_admitted')
                ->leftJoin('beds', 'patients_admitted.patient_id', '=', 'beds.patient_id')
                ->leftJoin('wards', 'patients_admitted.ward_id', '=', 'wards.id')
                ->leftJoin('departments', 'patients_admitted.department_id', '=', 'departments.id')
                ->leftJoin('patients', 'patients_admitted.patient_id', '=', 'patients.id')
                ->select(DB::raw('patients_admitted.id,patients_admitted.patient_id,patients.first_name,patients.middle_name,patients.last_name,patients_admitted.admit_date,patients_admitted.expected_discharge_date,departments.id as department_id,departments.name as speciality,wards.name as ward,beds.id as bed'))
                ->where('patients_admitted.status', 1)
                ->where('patients_admitted.is_discharged', 0)
                ->where('beds.patient_id', '!=', 0)
                ->groupby('patients_admitted.id')
                ->get();
            $count = count($data);
        }
        return response()->json(['status' => true, 'data' => $data, 'count' => $count]);
    }

    public function patient_discharge(Request $request)
    {

        $patient_id = $request->input('patient_id');

        $ward = DB::table('patients_admitted')
            ->select(DB::raw('ward_id'))
            ->where('patients_admitted.patient_id', $patient_id)
            ->first();

        $ward_id = $ward->ward_id;

        $bed_number = DB::table('wards')
            ->select(DB::raw('available_beds,number_of_beds_occupied'))
            ->where('wards.status', 1)
            ->where('wards.id', $ward_id)
            ->first();

        $available_beds = $bed_number->available_beds + 1;
        $beds_occupied = $bed_number->number_of_beds_occupied - 1;

        DB::table('wards')
            ->where('id', $ward_id)
            ->update(
                ['available_beds' => $available_beds, 'number_of_beds_occupied' => $beds_occupied, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        DB::table('beds')
            ->where('patient_id', $patient_id)
            ->update(
                ['bed_status' => 'available', 'patient_id' => 0, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        DB::table('patients_admitted')
            ->where('patient_id', $patient_id)
            ->update(['is_discharged' => 1, 'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Patient Discharged Successfully']);
    }

    public function move_patient(Request $request)
    {
        $current_bed_id = $request->input('current_bed_id');
        $bed_id = $request->input('bed_id');
        $current_ward_id = $request->input('current_ward_id');
        $ward_id = $request->input('ward_id');
        $department_id = $request->input('department_id');
        $patient_id = $request->input('patient_id');
        $notes = $request->input('notes');


        DB::table('beds')
            ->where('id', $current_bed_id)
            ->update(
                ['bed_status' => 'available','patient_id'=>0, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        $bed_number = DB::table('wards')
            ->select(DB::raw('available_beds,number_of_beds_occupied'))
            ->where('wards.status', 1)
            ->where('wards.id', $current_ward_id)
            ->first();

        $available_beds = $bed_number->available_beds + 1;
        $beds_occupied = $bed_number->number_of_beds_occupied - 1;

        DB::table('wards')
            ->where('id', $current_ward_id)
            ->update(
                ['available_beds' => $available_beds, 'number_of_beds_occupied' => $beds_occupied, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        DB::table('patients_admitted')
            ->where('patient_id', $patient_id)
            ->update(
                ['department_id' => $department_id, 'ward_id' => $ward_id, 'notes' => $notes, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        DB::table('beds')
            ->where('id', $bed_id)
            ->update(
                ['bed_status' => 'occupied', 'patient_id' => $patient_id, 'ward_id' => $ward_id, 'updated_at' => date("Y-m-d  H:i:s")]
            );

        $bed_number = DB::table('wards')
            ->select(DB::raw('available_beds,number_of_beds_occupied'))
            ->where('wards.status', 1)
            ->where('wards.id', $ward_id)
            ->first();

        $available_beds = $bed_number->available_beds - 1;
        $beds_occupied = $bed_number->number_of_beds_occupied + 1;

        DB::table('wards')
            ->where('id', $ward_id)
            ->update(
                ['available_beds' => $available_beds, 'number_of_beds_occupied' => $beds_occupied, 'updated_at' => date("Y-m-d  H:i:s")]
            );


        return response()->json(['status' => true, 'message' => 'Patient Moved Successfully']);


    }

    public function patients_pool_area(Request $request)
    {
        $encounter = DB::table('visits')
            ->select(DB::raw('CONCAT(patients.first_name," ",patients.last_name) AS patient_name,visits.id'))
            ->leftJoin('patients', 'visits.patient_id', '=', 'patients.id')
            ->where('visits.status',1)
            ->where('patients.status',1)
            ->where('visits.visit_status','queue')
            ->groupby('patients.id')
            ->get();

        $triage = DB::table('visits')
            ->select(DB::raw('CONCAT(patients.first_name," ",patients.last_name) AS patient_name,visits.id'))
            ->leftJoin('patients', 'visits.patient_id', '=', 'patients.id')
            ->where('visits.status', 1)
            ->where('patients.status', 1)
            ->where('visits.visit_status', 'triage')
            ->groupby('patients.id')
            ->get();

        $physician = DB::table('visits')
            ->select(DB::raw('CONCAT(patients.first_name," ",patients.last_name) AS patient_name,visits.id'))
            ->leftJoin('patients', 'visits.patient_id', '=', 'patients.id')
            ->where('visits.status', 1)
            ->where('patients.status', 1)
            ->where('visits.visit_status', 'physician')
            ->groupby('patients.id')
            ->get();

        $checkout = DB::table('visits')
            ->select(DB::raw('CONCAT(patients.first_name," ",patients.last_name) AS patient_name,visits.id'))
            ->leftJoin('patients', 'visits.patient_id', '=', 'patients.id')
            ->where('visits.status', 1)
            ->where('patients.status', 1)
            ->where('visits.visit_status', 'checkout')
            ->groupby('patients.id')
            ->get();

        $data = array(
                  "encounter" => $encounter,
                  "triage" => $triage,
                  "physician" => $physician,
                  "checkout" => $checkout
              );

        return response()->json(['status' => true, 'data' => $data]);
    }

    public function all_wards(Request $request){
        $wards = DB::table('wards')
            ->select(DB::raw('id,name'))
            ->where('wards.status', 1)
            ->where('available_beds','>', 0)
            ->get();
        return response()->json(['status' => true, 'data' => $wards]);
    }

    public function ward_beds(Request $request){

        $ward_id = $request->input('ward_id');
        $beds = DB::table('beds')
            ->select(DB::raw('id'))
            ->where('beds.status', 1)
            ->where('beds.bed_status','available')
            ->where('beds.ward_id',$ward_id)
            ->get();
        return response()->json(['status' => true, 'data' => $beds]);

    }

}

