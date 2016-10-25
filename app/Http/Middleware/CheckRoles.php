<?php namespace App\Http\Middleware;

use Closure;
use DB;
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

        $method_name=$request->segment(2);


        $context_method = DB::table('context_methods')
            ->select(DB::raw('*'))
            ->where('name',$method_name)
            ->first();


        if (empty($context_method)) {
            return response()->json(['status' => false, 'message' => "No Role Assigned to the User", 'error_code' => 500]);
        }

        else{

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
                ->where($right,1)
                ->get();

            if (empty($role_rights)) {
                return response()->json(['status' => false, 'message' => "This Right is not assigned to this User Role", 'error_code' => 500]);
            }

            else{
                return $next($request);
            }
        }


        /*    $role_rights = DB::table('role_rights')
                ->select(DB::raw('*'))
                ->where('role_id', $role_id)
                ->get();

            $is_valid = 0;

            foreach($role_rights as $rights){

                if($rights->context_id == $context_id){
                    $is_valid++;
                    break;
                }
            }

            if($is_valid>0){
                return $next($request);
            }else{
                return response()->json(['status'=>false,'message'=>"This Right is not assigned to this User Role",'error_code'=>500]);
            }*/

/*        $user_id = Auth::user()->id;

        $role_id = DB::table('users')
            ->select(DB::raw('role_id'))
            ->where('id', $user_id)
            ->first();

        $role_id = $role_id->role_id;

        if($role_id == 0){
            return response()->json(['status' => false, 'message' => "No Role Assigned to the User",'error_code'=>500]);
        }else{

            $count = DB::table('role_rights')
                 ->select(DB::raw('*'))
                 ->where('role_id',$role_id)
                 ->count();

            if($count<1){
                return response()->json(['status'=>false,'message'=>"This Right is not assigned to this User Role",'error_code'=>500]);
            }

            return $next($request);
        }*/

    }

}
