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
            ->where('first_name', 'like', "%$name%")
            ->where('plan_id', 1)
            ->get();


        if (empty($patients)) {


            return response()->json(['status' => false, 'message' => "sorry no patients found"]);


        } else {

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


        $address_id = DB::getPdo()->lastInsertId();

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


            $address_id = DB::getPdo()->lastInsertId();

        }


        return response()->json(['status' => true, 'message' => "Patient address registered successfully", "address_id" => $address_id]);


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


            // $employee_id = DB::getPdo()->lastInsertId();


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


        //here

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


        $visit_id = DB::getPdo()->lastInsertId();

        return response()->json(['status' => true, 'message' => 'Visit added successfully', 'visit_id'=>$visit_id]);

    }


    public function update_visit(Request $request)
    {


        $visit_id = $request->input('visit_id');

        $user_id = $request->input('source_id');

        $patient_id = $request->input('patient_id');

        $department_id = $request->input('department_id');

        $encounter_class = $request->input('encounter_class');

        $encounter_type = $request->input('encounter_type');

        $whom_to_see = $request->input('whom_to_see');

        $decscribe_whom_to_see = $request->input('decscribe_whom_to_see');

        $token = $request->input('token');


        //here

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id',$visit_id)
            ->update(
            ['patient_id' => $patient_id,
                'department_id' => $department_id,
                'encounter_class' => $encounter_class,
                'encounter_type' => $encounter_type,
                'whom_to_see' => $whom_to_see,
                'decscribe_whom_to_see' => $decscribe_whom_to_see,
                'updated_at' => $currentdatetime

            ]
        );


        return response()->json(['status' => true, 'message' => 'Visit Updated successfully']);

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
            ->where('status',1)
            ->get();

        $maritial_status = DB::table('maritial_status')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();

        $nationality = DB::table('nationality')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();

        $bloodgroup = DB::table('blood_group')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();


        $hospital_plan = DB::table('hospital_plan')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();


        $occupation = DB::table('occupation')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();

        $departments = DB::table('departments')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();

        $doctors = DB::table('doctors')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();


        $policies = DB::table('policies')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $hmo = DB::table('hmo')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $relationships = DB::table('relationships')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();


        $patients = DB::table('patients')
            ->select(DB::raw('id,first_name'))
            ->where('status', 1)
            ->get();


        $categories = DB::table('categories')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $retainership = DB::table('retainership')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
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
            "patients" => $patients,
            "retainership" => $retainership,
            "categories" => $categories,
            "doctors" => $doctors
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


    public function add_patient_plan(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $plan_id = $request->input('plan_id');

        $is_pricipal = $request->input('is_principal');

        $is_dependant = $request->input('is_dependant');

        $currentdatetime = date("Y-m-d  H:i:s");

        if ($plan_id == 1) {


            DB::table('patients')
                ->where('id', $patient_id)
                ->update(array('hospital_plan' => $plan_id, 'updated_at' => $currentdatetime));

            return response()->json(['status' => true, 'message' => 'Patient Plan added successfully']);

        } else {

            if ($plan_id == 2) {


                $hmo = $request->input('hmo');

                $policies = $request->input('policies');

                $insurance_id = $request->input('insurance_id');

                $description = $request->input('description');


                DB::table('patients')
                    ->where('id', $patient_id)
                    ->update(array('hospital_plan' => $plan_id, 'updated_at' => $currentdatetime));


                DB::table('plan_details')->insert(
                    ['plan_id' => $plan_id,
                        'patient_id' => $patient_id,
                        'is_principal' => $is_pricipal,
                        'is_dependant' => $is_dependant,
                        'hmo' => $hmo,
                        'policies' => $policies,
                        'insurance_id' => $insurance_id,
                        'description' => $description,
                        'created_at' => $currentdatetime

                    ]
                );


                $plan_detail_id = DB::getPdo()->lastInsertId();

                if ($is_dependant == 1) {

                    $principal_patient_id = $request->input('principal_patient_id');

                    $relationship = $request->input('relationship');

                    DB::table('patient_dependants')->insert(
                        ['plan_detail_id' => $plan_detail_id,
                            'principal_id' => $principal_patient_id,
                            'dependant_id' => $patient_id,
                            'relationship' => $relationship,
                            'created_at' => $currentdatetime

                        ]
                    );
                }


                if ($is_pricipal == 1) {

                    $dependents = $request->input('dependents');

                    $patient_dependents = json_decode($dependents);


                    foreach ($patient_dependents as $dependent) {

                        DB::table('patient_dependants')->insert(
                            ['plan_detail_id' => $plan_detail_id,
                                'principal_id' => $patient_id,
                                'dependant_id' => $dependent->dependent_id,
                                'relationship' => $dependent->relationship,
                                'created_at' => $currentdatetime

                            ]
                        );

                    }


                }

                return response()->json(['status' => true, 'message' => 'Patient Plan added successfully']);


            }

            if ($plan_id == 3) {


                $retainership = $request->input('retainership');

                $category = $request->input('category');

                $notes = $request->input('notes');


                DB::table('patients')
                    ->where('id', $patient_id)
                    ->update(array('hospital_plan' => $plan_id, 'updated_at' => $currentdatetime));


                DB::table('plan_details')->insert(
                    ['plan_id' => $plan_id,
                        'patient_id' => $patient_id,
                        'is_principal' => $is_pricipal,
                        'is_dependant' => $is_dependant,
                        'retainership' => $retainership,
                        'category' => $category,
                        'notes' => $notes,
                        'created_at' => $currentdatetime

                    ]
                );


                $plan_detail_id = DB::getPdo()->lastInsertId();

                if ($is_dependant == 1) {

                    $principal_patient_id = $request->input('principal_patient_id');

                    $relationship = $request->input('relationship');

                    DB::table('patient_dependants')->insert(
                        ['plan_detail_id' => $plan_detail_id,
                            'principal_id' => $principal_patient_id,
                            'dependant_id' => $patient_id,
                            'relationship' => $relationship,
                            'created_at' => $currentdatetime

                        ]
                    );
                }


                if ($is_pricipal == 1) {

                    $dependents = $request->input('dependents');

                    $patient_dependents = json_decode($dependents);


                    foreach ($patient_dependents as $dependent) {

                        DB::table('patient_dependants')->insert(
                            ['plan_detail_id' => $plan_detail_id,
                                'principal_id' => $patient_id,
                                'dependant_id' => $dependent->dependent_id,
                                'relationship' => $dependent->relationship,
                                'created_at' => $currentdatetime

                            ]
                        );

                    }


                }


                return response()->json(['status' => true, 'message' => 'Patient Plan added successfully']);


            }

        }

    }


    public function add_patient_archive(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        if ($request->file('patient_archive')) {

            if ($request->file('patient_archive')->isValid()) {

                $destinationPath = base_path() . '/public/patient_archive'; // upload path
                $extension = $request->file('patient_archive')->getClientOriginalExtension(); // getting image extension
                $fileName = time() . '.' . $extension; // renameing image

                $request->file('patient_archive')->move($destinationPath, $fileName); // uploading file to given path

            }


            DB::table('patient_file_access_log')->insert(
                ['patient_id' => $patient_id,
                    'file' => $fileName,
                    'created_at' => $currentdatetime

                ]
            );


        } else {

            return response()->json(['status' => false, 'message' => 'Invalid File']);

        }


        return response()->json(['status' => true, 'message' => 'Patient Archive uploaded successfully']);


    }


    public function get_patient(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $patients = DB::table('patients')
            ->select(DB::raw('*'))
            ->where('id', $patient_id)
            ->get();


        //  dd($patients);

        if ($patients[0]->sex == 1) {

            $patients[0]->sex = 'male';
        } else {

            $patients[0]->sex = 'female';
        }


        if ($patients[0]->marital_status == 1) {

            $patients[0]->marital_status = 'single';
        }

        if ($patients[0]->marital_status == 2) {

            $patients[0]->marital_status = 'married';
        }

        if ($patients[0]->marital_status == 3) {

            $patients[0]->marital_status = 'Divorced';
        }


        return response()->json(['status' => true, 'data' => $patients[0]]);


    }


    public function get_visits()
    {


        $visits = DB::table('visits')
            ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
            ->select(DB::raw('patients.id,first_name,middle_name,last_name'))
            ->where('first_name','!=','null')
            ->get();


        return response()->json(['status' => true, 'data' => $visits]);

    }


    public function get_patient_all_data(Request $request)
    {

        $patient_id = $request->input('patient_id');

        $patient_info = DB::table('patients')
            ->select(DB::raw('*'))
            ->where('id', $patient_id)
            ->first();

        $patient_address = DB::table('patient_address')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient_id)
            ->get();


        $patient_kin = DB::table('patient_kin')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient_id)
            ->first();


        $patient_employers = DB::table('patient_employers')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient_id)
            ->first();

        $data = array(
            "patient_info" => $patient_info,
            "patient_address" => $patient_address,
            "patient_kin" => $patient_kin,
            "patient_employeer" => $patient_employers

        );

        return response()->json(['status' => true, 'data' => $data]);


    }


    public function add_patient_vitals(Request $request){


        $patient_id = $request->input('patient_id');

        $vitals = $request->input('vitals');
        
        $patient_vitals = json_decode($vitals);

        $notes = $request->input('notes');

        $currentdatetime = date("Y-m-d  H:i:s");



        DB::table('medical_record_description')->insert(
            ['patient_id' => $patient_id,
                'notes' => $notes,
                'created_at' => $currentdatetime

            ]
        );


        foreach ($patient_vitals as $patient_vital) {

            DB::table('medical_record_values')->insert(
                ['patient_id' => $patient_id,
                    'field_id' => $patient_vital->field_id,
                    'value' => $patient_vital->value,
                    'created_at' => $currentdatetime

                ]
            );

        }



        return response()->json(['status' => true, 'message' => 'Patient Vitals Added Successfully']);



    }

    public function get_patient_visit_history(Request $request){


        $patient_id = $request->input('patient_id');

        $visit_history = DB::table('visits')
            ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
            ->leftJoin('departments', 'departments.id', '=', 'visits.department_id')
            ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
            ->select(DB::raw('visits.id,visits.patient_id,patients.first_name,patients.middle_name,patients.last_name,visits.encounter_class,visits.encounter_type,visits.whom_to_see,visits.decscribe_whom_to_see,doctors.name,departments.name as faculty,visits.created_at'))
            ->orderby('visits.id','desc')
            ->where('visits.patient_id','!=','null')
            ->where('visits.visit_status','!=','checkout')
            ->where('visits.status','1')
            ->get();


        return response()->json(['status' => true, 'data' => $visit_history]);


    }



    public function get_patient_vital_history(Request $request){


        $patient_id = $request->input('patient_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        $bp = DB::table('medical_record_values')
            ->leftJoin('medical_record_fields', 'medical_record_fields.id', '=', 'medical_record_values.field_id')
            ->select(DB::raw('medical_record_fields.category,medical_record_fields.name,medical_record_values.value'))
            ->where('medical_record_values.status','1')
            ->where('medical_record_fields.category','Blood Pressue(mm HG)')
            ->where('medical_record_values.patient_id', $patient_id)
            ->groupby('medical_record_values.field_id')
            ->get();



        $pulse = DB::table('medical_record_values')
            ->leftJoin('medical_record_fields', 'medical_record_fields.id', '=', 'medical_record_values.field_id')
            ->select(DB::raw('medical_record_fields.category,medical_record_fields.name,medical_record_values.value'))
            ->where('medical_record_values.status','1')
            ->where('medical_record_fields.category','Pulse Rate(min/bpm)')
            ->where('medical_record_values.patient_id', $patient_id)
            ->groupby('medical_record_values.field_id')
            ->get();


        $respiratory = DB::table('medical_record_values')
            ->leftJoin('medical_record_fields', 'medical_record_fields.id', '=', 'medical_record_values.field_id')
            ->select(DB::raw('medical_record_fields.category,medical_record_fields.name,medical_record_values.value'))
            ->where('medical_record_values.status','1')
            ->where('medical_record_fields.category','Respiratory Rate(br/min)')
            ->where('medical_record_values.patient_id', $patient_id)
            ->groupby('medical_record_values.field_id')
            ->get();



        $bmi = DB::table('medical_record_values')
            ->leftJoin('medical_record_fields', 'medical_record_fields.id', '=', 'medical_record_values.field_id')
            ->select(DB::raw('medical_record_fields.category,medical_record_fields.name,medical_record_values.value'))
            ->where('medical_record_values.status','1')
            ->where('medical_record_fields.category','BMI(kg / m^2)')
            ->where('medical_record_values.patient_id', $patient_id)
            ->groupby('medical_record_values.field_id')
            ->get();


        $data = array(
              "bp" => $bp,
              "pulse" => $pulse,
              "respiratory" => $respiratory,
              "bmi" => $bmi,
              "date_time" =>$currentdatetime
          );


        return response()->json(['status' => true, 'data' => $data]);

    }



    public function update_visit_status(Request $request){

        $visit_id= $request->input('visit_id');

        $status=$request->input('status');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(array('visit_status' => $status, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'data' => 'visit updated successfully']);
    }



    public function get_patient_demographics(Request $request){



        $patient_id = $request->input('patient_id');


        $demographics = DB::table('patients')
            ->leftJoin('patient_address', 'patient_address.patient_id', '=', 'patients.id')
            ->leftJoin('patient_kin', 'patient_kin.patient_id', '=', 'patients.id')
            ->leftJoin('religion', 'religion.id', '=', 'patients.religion')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.plan_id')
            ->leftJoin('blood_group', 'blood_group.id', '=', 'patients.blood_group')
            ->select(DB::raw('patients.id,patients.first_name,patients.middle_name,patients.last_name,patients.date_of_birth,patients.sex,patients.age,patients.patient_image,religion.name as religion,maritial_status.name as marital_status,hospital_plan.name as hospital_plan,patient_address.mobile_number,patient_address.email,patient_kin.fullname as next_to_kin,patient_address.house_number,patient_address.street,blood_group.name as blood_group
            '))
            ->where('patients.id', $patient_id)
            ->where('patient_address.address_type', 'contact')
            ->first();


        if($demographics->sex ==1){

            $demographics->gender = 'Male';
        }else{

            $demographics->gender = 'FeMale';
        }


        return response()->json(['status' => true, 'data' => $demographics]);

    }



    public function remove_visit(Request $request){

        $visit_id= $request->input('visit_id');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(array('status' => 0, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'data' => 'visit removed successfully']);

    }


    public function visit_details(Request $request){

        $visit_id= $request->input('visit_id');

        $visit_details = DB::table('visits')
               ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
               ->leftJoin('departments', 'departments.id', '=', 'visits.department_id')
               ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
               ->select(DB::raw('visits.id,visits.patient_id,patients.first_name,patients.middle_name,patients.last_name,visits.encounter_class,visits.encounter_type,visits.whom_to_see,visits.decscribe_whom_to_see,doctors.name,departments.name as faculty,visits.created_at'))
               ->where('visits.patient_id','!=','null')
               ->where('visits.visit_status','!=','checkout')
               ->where('visits.status','1')
               ->where('visits.id',$visit_id)
               ->first();


           return response()->json(['status' => true, 'data' => $visit_details]);


    }



    public function patient_archives(Request $request){

        $patient_id = $request->input('patient_id');

        $file_archive = url('/') . '/patient_archive/';

        $patient_archives = DB::table('patient_file_access_log')
            ->select(DB::raw('id,patient_id,file,CONCAT("' . $file_archive . '",file) as file'))
            ->where('patient_id',$patient_id)
            ->where('status',1)
            ->get();

        return response()->json(['status' => true, 'data' => $patient_archives]);


    }


    public function patient_medications(Request $request){

        $patient_id = $request->input('patient_id');

        $patient_medications = DB::table('medication_shedule')
            ->select(DB::raw('id,prescriptions,to_date,from_date,status'))
            ->where('patient_id',$patient_id)
            ->where('status','inprocess')
            ->get();


        return response()->json(['status' => true, 'data' => $patient_medications]);

    }

    public function patient_supplements(Request $request){

        $patient_id = $request->input('patient_id');

        $patient_supplements = DB::table('medicines')
            ->select(DB::raw('id,dosage,frequency,intake,from_date,to_date'))
            ->where('patient_id',$patient_id)
            ->where('status','1')
            ->get();


        return response()->json(['status' => true, 'data' => $patient_supplements]);

    }



    public function patient_allergies(Request $request){

        $patient_id = $request->input('patient_id');

        $patient_allergies = DB::table('patient_allergies')
            ->select(DB::raw('*'))
            ->where('patient_id',$patient_id)
            ->get();


        return response()->json(['status' => true, 'data' => $patient_allergies]);

    }
}