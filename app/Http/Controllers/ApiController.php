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


class ApiController extends Controller
{


    public function __construct(Request $request)
    {

        header('Access-Control-Allow-Origin: *');


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


    public function search_patient(Request $request)
    {


        $name = $request->input('name');

        $patients = DB::table('patients')
            ->select(DB::raw('id,first_name,middle_name,last_name'))
            ->where('first_name','like', "%$name%")
            ->where('plan_id',1)
            ->get();


        if(empty($patients)){


            return response()->json(['status' => false, 'message' => "sorry no patients found"]);


        }

        else{

            return response()->json(['status' => true, 'data' => $patients]);


        }



    }

    public function add_patient(Request $request)
    {


        $first_name = $request->input('first_name');

        $middle_name = $request->input('middle_name');

        $last_name = $request->input('last_name');

        $date_of_birth = $request->input('date_of_birth');

        $age = $request->input('age');

        $sex = $request->input('sex');

        $marital_status = $request->input('marital_status');

        $religion = $request->input('religion');

        $father_firstname = $request->input('father_firstname');

        $father_middlename = $request->input('father_middlename');

        $father_lastname = $request->input('father_lastname');

        $mother_firstname = $request->input('mother_firstname');

        $mother_middlename = $request->input('mother_middlename');

        $mother_lastname = $request->input('mother_lastname');

        $refered_name = $request->input('refered_name');


        $patient_unit_number = $request->input('patient_unit_number');

        $identity_type = $request->input('identity_type');

        $identity_number = $request->input('identity_number');

        $patient_state = $request->input('patient_state');

        $patient_local_goverment_area = $request->input('patient_local_goverment_area');

        $tribe = $request->input('tribe');

        $nationality = $request->input('nationality');

        $blood_group = $request->input('blood_group');

        $currentdatetime = date("Y-m-d  H:i:s");

        $patient_id = $request->input('patient_id');


        if (isset($patient_id)) {


            DB::table('patients')
                ->where('id', $patient_id)
                ->update(array('first_name' => $first_name,
                    'middle_name' => $middle_name,
                    'last_name' => $last_name,
                    'date_of_birth' => $date_of_birth,
                    'age' => $age,
                    'sex' => $sex,
                    'patient_image' => '',
                    'marital_status' => $marital_status,
                    'religion' => $religion,
                    'father_firstname' => $father_firstname,
                    'father_middlename' => $father_middlename,
                    'father_lastname' => $father_lastname,
                    'mother_firstname' => $mother_firstname,
                    'mother_middlename' => $mother_middlename,
                    'mother_lastname' => $mother_lastname,
                    'refered_name' => $refered_name,
                    'patient_unit_number' => $patient_unit_number,
                    'identity_type' => $identity_type,
                    'identity_number' => $identity_number,
                    'state' => $patient_state,
                    'local_goverment_area' => $patient_local_goverment_area,
                    'tribe' => $tribe,
                    'nationality' => $nationality,
                    'blood_group' => $blood_group, 'updated_at' => $currentdatetime));


            return response()->json(['status' => true, 'message' => "Patient updated successfully", "patient_id" => $patient_id]);


        } else {

            if ($request->file('patient_image')) {

                if ($request->file('patient_image')->isValid()) {

                    $destinationPath = base_path() . '/public/uploaded_images'; // upload path
                    $extension = $request->file('patient_image')->getClientOriginalExtension(); // getting image extension
                    $fileName = time() . '.' . $extension; // renameing image

                    $request->file('patient_image')->move($destinationPath, $fileName); // uploading file to given path

                } else {

                    $fileName = '';

                }

            } else {

                $fileName = '';
            }


            DB::table('patients')->insert(
                ['first_name' => $first_name,
                    'middle_name' => $middle_name,
                    'last_name' => $last_name,
                    'date_of_birth' => $date_of_birth,
                    'age' => $age,
                    'sex' => $sex,
                    'patient_image' => $fileName,
                    'plan_id' => 1,
                    'marital_status' => $marital_status,
                    'religion' => $religion,
                    'father_firstname' => $father_firstname,
                    'father_middlename' => $father_middlename,
                    'father_lastname' => $father_lastname,
                    'mother_firstname' => $mother_firstname,
                    'mother_middlename' => $mother_middlename,
                    'mother_lastname' => $mother_lastname,
                    'refered_name' => $refered_name,
                    'patient_unit_number' => $patient_unit_number,
                    'identity_type' => $identity_type,
                    'identity_number' => $identity_number,
                    'state' => $patient_state,
                    'local_goverment_area' => $patient_local_goverment_area,
                    'tribe' => $tribe,
                    'nationality' => $nationality,
                    'blood_group' => $blood_group,
                    'created_at' => $currentdatetime
                ]
            );


            $patient_id = DB::getPdo()->lastInsertId();


            return response()->json(['status' => true, 'message' => "Patient registered successfully", "patient_id" => $patient_id]);

        }


    }


    public function add_patient_address(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $same_as_above = $request->input('same_as_above');

        $status = $same_as_above === 'true' ? true : false;

        $email = $request->input('email');

        $phone_number = $request->input('phone_number');

        $mobile_number = $request->input('mobile_number');

        $house_number = $request->input('house_number');

        $street = $request->input('street');

        $city = $request->input('city');

        $state = $request->input('state');

        $country = $request->input('country');

        $local_goverment_area = $request->input('local_goverment_area');

        $postal_code = $request->input('postal_code');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('patient_address')->where('patient_id', '=', $patient_id)->delete();


        DB::table('patient_address')->insert(
            ['patient_id' => $patient_id,
                'email' => $email,
                'address_type' => 'contact',
                'phone_number' => $phone_number,
                'mobile_number' => $mobile_number,
                'house_number' => $house_number,
                'street' => $street,
                'city' => $city,
                'state' => $state,
                'country' => $country,
                'local_goverment_area' => $local_goverment_area,
                'postal_code' => $postal_code,
                'created_at' => $currentdatetime

            ]
        );

        if ($status == false) {


            $permanent_city = $request->input('permanent_city');

            $permanent_state = $request->input('permanent_state');

            $permanent_street = $request->input('permanent_street');

            $permanent_country = $request->input('permanent_country');

            $permanent_email = $request->input('permanent_email');

            $permanent_housenumber = $request->input('permanent_housenumber');

            $permanent_mobilenumber = $request->input('permanent_mobilenumber');

            $permanent_phonenumber = $request->input('permanent_phonenumber');

            $permanent_postalCode = $request->input('permanent_postalCode');


            DB::table('patient_address')->insert(
                ['patient_id' => $patient_id,
                    'email' => $permanent_email,
                    'address_type' => 'permanent',
                    'phone_number' => $permanent_phonenumber,
                    'mobile_number' => $permanent_mobilenumber,
                    'house_number' => $permanent_housenumber,
                    'street' => $permanent_street,
                    'city' => $permanent_city,
                    'state' => $permanent_state,
                    'country' => $permanent_country,
                    'local_goverment_area' => '',
                    'postal_code' => $permanent_postalCode,
                    'created_at' => $currentdatetime

                ]
            );


        }


        return response()->json(['status' => true, 'message' => "Patient address registered successfully", "patient_id" => $patient_id]);


    }


    public function add_patient_kin(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $kin_fullname = $request->input('kin_fullname');

        $kin_middlename = $request->input('kin_middlename');

        $kin_lastname = $request->input('kin_lastname');

        $kin_relationship = $request->input('kin_relationship');

        $others = $request->input('others');

        $kin_phone_number = $request->input('kin_phone_number');

        $kin_mobile_number = $request->input('kin_mobile_number');

        $kin_email = $request->input('kin_email');

        $kin_house_number = $request->input('kin_house_number');

        $kin_street = $request->input('kin_street');

        $kin_city = $request->input('kin_city');

        $kin_state = $request->input('kin_state');

        $kin_country = $request->input('kin_country');

        $kin_postal_code = $request->input('kin_postal_code');

        $currentdatetime = date("Y-m-d  H:i:s");

        $kin_id = $request->input('kin_id');


        if (isset($kin_id)) {


            DB::table('patient_kin')
                ->where('id', $kin_id)
                ->update(
                    ['patient_id' => $patient_id,
                        'fullname' => $kin_fullname,
                        'middlename' => $kin_middlename,
                        'lastname' => $kin_lastname,
                        'relationship' => $kin_relationship,
                        'others' => $others,
                        'phone_number' => $kin_phone_number,
                        'mobile_number' => $kin_mobile_number,
                        'email' => $kin_email,
                        'house_number' => $kin_house_number,
                        'street' => $kin_street,
                        'city' => $kin_city,
                        'state' => $kin_state,
                        'country' => $kin_country,
                        'postal_code' => $kin_postal_code,
                        'updated_at' => $currentdatetime

                    ]
                );


            return response()->json(['status' => true, 'message' => "Patient kin updated successfully", "patient_id" => $patient_id, "kin_id" => $kin_id]);


        } else {

            DB::table('patient_kin')->insert(
                ['patient_id' => $patient_id,
                    'fullname' => $kin_fullname,
                    'middlename' => $kin_middlename,
                    'lastname' => $kin_lastname,
                    'relationship' => $kin_relationship,
                    'others' => $others,
                    'phone_number' => $kin_phone_number,
                    'mobile_number' => $kin_mobile_number,
                    'email' => $kin_email,
                    'house_number' => $kin_house_number,
                    'street' => $kin_street,
                    'city' => $kin_city,
                    'state' => $kin_state,
                    'country' => $kin_country,
                    'postal_code' => $kin_postal_code,
                    'created_at' => $currentdatetime

                ]
            );


            $kin_id = DB::getPdo()->lastInsertId();

            return response()->json(['status' => true, 'message' => "Patient kin registered successfully", "patient_id" => $patient_id, "kin_id" => $kin_id]);


        }

    }


    public function add_patient_employees(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $employer_name = $request->input('employer_name');

        $employer_phone_number = $request->input('employer_phone_number');

        $employer_mobile_number = $request->input('employer_mobile_number');

        $employer_email = $request->input('employer_email');

        $employer_house_number = $request->input('employer_house_number');

        $employer_street = $request->input('employer_street');

        $employer_city = $request->input('employer_city');

        $employer_state = $request->input('employer_state');

        $employer_country = $request->input('employer_country');

        $employee_id = $request->input('employee_id');

        $currentdatetime = date("Y-m-d  H:i:s");


        if (isset($employee_id)) {


            DB::table('patient_employers')
                ->where('id', $employee_id)
                ->update(
                    ['patient_id' => $patient_id,
                        'name' => $employer_name,
                        'phone_number' => $employer_phone_number,
                        'mobile_number' => $employer_mobile_number,
                        'email' => $employer_email,
                        'house_number' => $employer_house_number,
                        'street' => $employer_street,
                        'city' => $employer_city,
                        'state' => $employer_state,
                        'country' => $employer_country,
                        'updated_at' => $currentdatetime

                    ]
                );


            $employee_id = DB::getPdo()->lastInsertId();


            return response()->json(['status' => true, 'message' => "Patient Employee updated successfully", "patient_id" => $patient_id, "employee_id" => $employee_id]);


        } else {

            DB::table('patient_employers')->insert(
                ['patient_id' => $patient_id,
                    'name' => $employer_name,
                    'phone_number' => $employer_phone_number,
                    'mobile_number' => $employer_mobile_number,
                    'email' => $employer_email,
                    'house_number' => $employer_house_number,
                    'street' => $employer_street,
                    'city' => $employer_city,
                    'state' => $employer_state,
                    'country' => $employer_country,
                    'created_at' => $currentdatetime

                ]
            );


            $employee_id = DB::getPdo()->lastInsertId();


            return response()->json(['status' => true, 'message' => "Patient Employee registered successfully", "patient_id" => $patient_id, "employee_id" => $employee_id]);

        }

    }

    public function register_user(Request $request)
    {


        $username = $request->input('name');

        $email = $request->input('email');

        $password = $request->input('password');

        $password_user = md5($password);

        $user_role_id = $request->input('role_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        $users = DB::table('users')
            ->select(DB::raw('name'))
            ->where('email', $email)
            ->get();

        if (count($users) > 0) {

            return response()->json(['status' => false, 'message' => "Email Exists Already"]);

            exit;


        }


        DB::table('users')->insert(
            ['name' => $username,
                'email' => $email,
                'password' => $password_user,
                'role_id' => $user_role_id,
                'created_at' => $currentdatetime

            ]
        );


        $user_id = DB::getPdo()->lastInsertId();


        $user = DB::table('users')
            ->select(DB::raw('name,id'))
            ->where('id', $user_id)
            ->first();

        $token = JWTAuth::fromUser($user);


        return response()->json(['status' => true, 'message' => "User Registered Successfully", 'data' => $user, 'token' => $token]);


    }

    public function user_login(Request $request)
    {


        $email_address = $request->input('email');

        $password = $request->input('password');

        $password_user = md5($password);

        $user = DB::table('users')
            ->select(DB::raw('id as source_id,email,name,role_id'))
            ->where('email', $email_address)
            ->where('password', $password_user)
            ->get();


        if (count($user) == 1) {

            $users = DB::table('users')
                ->select(DB::raw('id'))
                ->where('email', $email_address)
                ->where('password', $password_user)
                ->get();


            $token = JWTAuth::fromUser($users[0]);

            $user_id = JWTAuth::authenticate($token)->id;

            $user_status = DB::table('users')
                ->select(DB::raw('user_status'))
                ->where('id', $user_id)
                ->first();


            if ($user_status->user_status != 'active') {


                return response()->json(['status' => false, 'message' => 'This user is not active']);

            }

            return response()->json(['status' => true, 'data' => $user[0], 'token' => $token]);

        } else {

            return response()->json(['status' => false, 'message' => 'invalid user']);

        }


    }

    public function add_visit(Request $request)
    {


        $user_id = $request->input('source_id');

        $patient_id = $request->input('patient_id');

        $department_id = $request->input('department_id');

        $encounter_class = $request->input('encounter_class');

        $encounter_type = $request->input('encounter_type');

        $whom_to_see = $request->input('whom_to_see');

        $decscribe_whom_to_see = $request->input('decscribe_whom_to_see');

        $token = $request->input('token');


        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')->insert(
            ['patient_id' => $patient_id,
                'department_id' => $department_id,
                'encounter_class' => $encounter_class,
                'encounter_type' => $encounter_type,
                'whom_to_see' => $whom_to_see,
                'decscribe_whom_to_see' => $decscribe_whom_to_see,
                'created_at' => $currentdatetime

            ]
        );


        return response()->json(['status' => true, 'message' => 'Visit added successfully']);

    }


    public function get_countries()
    {


        $countries = DB::table('countries')
            ->select(DB::raw('id,name,country_code'))
            ->get();

        return response()->json(['status' => true, 'data' => $countries]);

    }


    public function get_states(Request $request)
    {


        $country_id = $request->input('country_id');

        $states = DB::table('states')
            ->select(DB::raw('id,name'))
            ->where('country_id', $country_id)
            ->get();

        return response()->json(['status' => true, 'data' => $states]);

    }


    public function get_cities(Request $request)
    {


        $state_id = $request->input('state_id');

        $cities = DB::table('cities')
            ->select(DB::raw('id,name'))
            ->where('state_id', $state_id)
            ->get();

        return response()->json(['status' => true, 'data' => $cities]);

    }

    public function get_local_goverment_area(Request $request)
    {


        $state_id = $request->input('state_id');

        $local_goverment_area = DB::table('local_goverment_area')
            ->select(DB::raw('id,name'))
            ->where('state_id', $state_id)
            ->get();

        return response()->json(['status' => true, 'data' => $local_goverment_area]);


    }


    public function get_dropdowndata(Request $request)
    {

        $religion = DB::table('religion')
            ->select(DB::raw('id,name'))
            ->get();

        $maritial_status = DB::table('maritial_status')
            ->select(DB::raw('id,name'))
            ->get();

        $nationality = DB::table('nationality')
            ->select(DB::raw('id,name'))
            ->get();

        $bloodgroup = DB::table('blood_group')
            ->select(DB::raw('id,name'))
            ->get();


        $hospital_plan = DB::table('hospital_plan')
            ->select(DB::raw('id,name'))
            ->get();


        $occupation = DB::table('occupation')
            ->select(DB::raw('id,name'))
            ->get();

        $departments = DB::table('departments')
            ->select(DB::raw('id,name'))
            ->get();

        $doctors = DB::table('doctors')
            ->select(DB::raw('id,name'))
            ->get();


        $policies = DB::table('policies')
            ->select(DB::raw('id,name'))
            ->get();

        $hmo = DB::table('hmo')
            ->select(DB::raw('id,name'))
            ->get();

        $relationships = DB::table('relationships')
            ->select(DB::raw('id,name'))
            ->get();


        $patients = DB::table('patients')
            ->select(DB::raw('id,first_name'))
            ->get();


        $data = array(
            "religion" => $religion,
            "maritial_status" => $maritial_status,
            "nationality" => $nationality,
            "blood_group" => $bloodgroup,
            "hospital_plan" => $hospital_plan,
            "occupation" => $occupation,
            "departments" => $departments,
            "doctors" => $doctors,
            "policies" => $policies,
            "hmo" => $hmo,
            "relationships" => $relationships,
            "patients" => $patients
        );

        return response()->json(['status' => true, 'data' => $data]);


    }


    public function patient_visit_list(Request $request)
    {

        $patient_id = $request->input('patient_id');


        $data = DB::table('visits')
            ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
            ->select(DB::raw('*'))
            ->where('visits.patient_id', $patient_id)
            ->get();


        return response()->json(['status' => true, 'data' => $data]);


    }


    public function get_patient_vitals(Request $request)
    {


        $data = DB::table('medical_record_fields')
            ->select(DB::raw('id,category,name'))
            ->get();


        return response()->json(['status' => true, 'data' => $data]);


    }

    public function test_upload(Request $request)
    {

        if ($request->file('patient_image')) {

            if ($request->file('patient_image')->isValid()) {

                $destinationPath = base_path() . '/public/uploaded_images'; // upload path
                $extension = $request->file('patient_image')->getClientOriginalExtension(); // getting image extension
                $fileName = time() . '.' . $extension; // renameing image

                $request->file('patient_image')->move($destinationPath, $fileName); // uploading file to given path

            }

        }


    }


    public function get_patient_plan(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $patient_plan = DB::table('patient_plan')
            ->select(DB::raw('hmo,policies,insurance_id,principal,depandent'))
            ->get();


        foreach ($patient_plan as $plan) {


            if ($plan->principal == 1) {

                $dependants = DB::table('patient_dependants')
                    ->select(DB::raw('dependant_id'))
                    ->get();


                $plan->dependants = $dependants;


            } else {


            }
        }

        return response()->json(['status' => true, 'data' => $plan]);


    }


}