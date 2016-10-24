<?php namespace App\Http\Middleware;

use Closure;
use DB;
use JWTAuth;
use Auth;


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

        $user_id = Auth::user()->id;

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
                return response()->json(['status'=>false,'message'=>"No Right Assigned to the Given User Role",'error_code'=>500]);
            }

            return $next($request);
        }

    }

}
