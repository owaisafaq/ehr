<?php namespace App\Http\Middleware;

use Closure;
use DB;
use Illuminate\Http\Request;
use JWTAuth;
use Auth;
use Route;


class CheckRoles
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */


    public function handle($request, Closure $next)
    {
        //dd($request);
        /* if($request->session()->get('admin_data')){

             return $next($request);
         }else{
             return redirect('admin/login');
         }*/

        header('Access-Control-Allow-Origin: *');

        $method_name = $request->segment(2);

        $context_method = DB::table('context_methods')
            ->select(DB::raw('*'))
            ->where('name', $method_name)
            ->first();

        if (empty($context_method)) {
            return response()->json(['status' => false, 'message' => "No Role Assigned to the User", 'error_code' => 500]);
        } else {

            $context_id = $context_method->context_id;
            $right = $context_method->right;

            $user_id = Auth::user()->id;

            $role_id = DB::table('users')
                ->select(DB::raw('role_id'))
                ->where('id', $user_id)
                ->first();

            $role_id = $role_id->role_id;

            if (strpos($method_name,'lab_order') !== false || strpos($method_name,'lab_test') !== false || strpos($method_name,'lab_report') !== false) {
                if ($request->has('lab')) {
                    $type_id = $request->lab;
                }elseif($request->has('lab_test_id') && $method_name !='get_lab_test_pdf' && $method_name !='signoff_lab_report') {

                  /*  $lab = DB::table('lab_tests')
                        ->select(DB::raw('lab'))
                        ->where('id',$request->lab_test_id)
                        ->first();
                    $type_id = $lab->lab;*/

                    $order = DB::table('lab_order_tests')
                        ->select(DB::raw('lab_order_id'))
                        ->where('id', $request->lab_test_id)
                        ->first();
                    $order_id = $order->lab_order_id;

                    $lab = DB::table('lab_orders')
                        ->select(DB::raw('lab'))
                        ->where('id', $order_id)
                        ->first();
                    $type_id = $lab->lab;


                /*dd($type_id);*/

                } elseif($request->has('order_id')) {
                    $lab = DB::table('lab_orders')
                        ->select(DB::raw('lab'))
                        ->where('id',$request->order_id)
                        ->first();
                    $type_id = $lab->lab;

                } elseif ($request->has('lab_test')) {
                    $order = DB::table('lab_order_tests')
                        ->select(DB::raw('lab_order_id'))
                        ->where('id',$request->lab_test)
                        ->first();
                    $order_id = $order->lab_order_id;

                    $lab = DB::table('lab_orders')
                        ->select(DB::raw('lab'))
                        ->where('id', $order_id)
                        ->first();
                    $type_id = $lab->lab;

                } elseif ($request->has('lab_test_id')  && strpos($method_name,'get_lab_test_pdf') !== false) {
                    $order = DB::table('lab_order_tests')
                        ->select(DB::raw('lab_order_id'))
                        ->where('id',$request->lab_test_id)
                        ->first();
                    $order_id = $order->lab_order_id;

                    $lab = DB::table('lab_orders')
                        ->select(DB::raw('lab'))
                        ->where('id', $order_id)
                        ->first();
                    $type_id = $lab->lab;

                } elseif ($request->has('lab_test_id') && strpos($method_name,'signoff_lab_report') !== false) {
                    $order = DB::table('patient_lab_test_values')
                        ->select(DB::raw('lab_order_id'))
                        ->where('id', $request->lab_test_id)
                        ->first();
                    $order_id = $order->lab_order_id;

                    $lab = DB::table('lab_orders')
                        ->select(DB::raw('lab'))
                        ->where('id', $order_id)
                        ->first();
                    $type_id = $lab->lab;

                } elseif ($request->has('lab_order_test_id')) {

                    $order = DB::table('lab_order_tests')
                        ->select(DB::raw('lab_order_id'))
                        ->where('id', $request->lab_order_test_id)
                        ->first();
                    $order_id = $order->lab_order_id;

                    $lab = DB::table('lab_orders')
                        ->select(DB::raw('lab'))
                        ->where('id',$order_id)
                        ->first();
                    $type_id = $lab->lab;

                }
                else {
                    $type_id = 0;
                }

                $role_rights = DB::table('role_rights')
                    ->select(DB::raw('*'))
                    ->where('role_id', $role_id)
                    ->where('context_id', $context_id)
                    ->where($right,1)
                    ->where('type', $type_id)
                    ->get();
            } elseif ((strpos($method_name,'template') !== false) || strpos($method_name,'lab_template') !== false) {
                if ($request->has('template_type')) {
                    $type_id = $request->template_type;
                } elseif ($request->has('template_id')) {
                    $category = DB::table('templates')
                        ->select(DB::raw('category_id'))
                        ->where('id',$request->template_id)
                        ->first();
                    $cat_id = $category->category_id;
                    $type = DB::table('template_categories')
                        ->select(DB::raw('template_type'))
                        ->where('id',$cat_id)
                        ->first();
                    $type_id = $type->template_type;

                } elseif ($request->has('category_id')) {
                    $type = DB::table('template_categories')
                        ->select(DB::raw('template_type'))
                        ->where('id',$request->category_id)
                        ->first();
                    $type_id = $type->template_type;

                } elseif ($request->has('cat_id')) {
                    $type = DB::table('template_categories')
                        ->select(DB::raw('template_type'))
                        ->where('id',$request->cat_id)
                        ->first();
                    $type_id = $type->template_type;
                }elseif(strpos($method_name,'lab_template') !== false)
                {
                    $type_id = 2;
                }
                else {
                    $type_id = 0;
                }

                $role_rights = DB::table('role_rights')
                    ->select(DB::raw('*'))
                    ->where('role_id', $role_id)
                    ->where('context_id', $context_id)
                    ->where($right,1)
                    ->where('type', $type_id)
                    ->get();

            } else {
                $role_rights = DB::table('role_rights')
                    ->select(DB::raw('*'))
                    ->where('role_id', $role_id)
                    ->where('context_id', $context_id)
                    ->where($right, 1)
                    ->get();
            }
        }

        if (empty($role_rights)) {
            return response()->json(['status' => false, 'message' => "This Right is not assigned to this User Role", 'error_code' => 500]);
        } else {
            return $next($request);
        }

    }

}
