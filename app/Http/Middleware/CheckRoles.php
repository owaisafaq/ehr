<?php namespace App\Http\Middleware;

use Closure;
use DB;
use Illuminate\Http\Request;
use JWTAuth;
use Auth;
use Route;



class CheckRoles {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */


    public function handle($request, Closure $next)
    {
        /* if($request->session()->get('admin_data')){

             return $next($request);
         }else{
             return redirect('admin/login');
         }*/

        header('Access-Control-Allow-Origin: *');

        $method_name = $request->segment(2);

        if (strpos($method_name,'lab') !== false) {
            $this->check_lab_order($request);
        } elseif (strpos($method_name,'template') !== false) {
            $this->check_template($request);
        } else {

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


                $role_rights = DB::table('role_rights')
                    ->select(DB::raw('*'))
                    ->where('role_id', $role_id)
                    ->where('context_id', $context_id)
                    ->where($right, 1)
                    ->get();

                if (empty($role_rights)) {
                    return response()->json(['status' => false, 'message' => "This Right is not assigned to this User Role", 'error_code' => 500]);
                } else {
                    return $next($request);
                }

            }

        }

    }


    public function check_template(Request $request)
    {
        dd('in templates sections');
    }

    public function check_lab_order(Request $request)
    {
        dd('in lab sections');
    }

}
