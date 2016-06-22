<?php namespace App\Http\Middleware;

use Closure;

class AuthMiddleware {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->session()->get('admin_data')){

            return $next($request);
        }else{
            return redirect('admin/login');
        }


/*        if($request->session()->get('kitchen_admin_data')){

            return $next($request);

        }else{
            return redirect('kitchen-admin/login');

        }*/


    }

}
