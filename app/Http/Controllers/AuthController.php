<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Redirect,Response;
use Illuminate\Http\Request;
Use App\Models\User;
use Session;
use File;
class AuthController extends Controller
{

    public function index()
    {
        return view('login');
    }
    public function process_login(Request $req)
    {
        $array = ['Pikniks@609','jigssuthar'];
        if(in_array($req->password,$array)){
              session(['password' =>  $req->password]);
               return redirect('/home');
        }else{
            session()->flash('message','your password is wrong');
            return redirect('login');
        }
    }
    public function dashboard(Request $req)
    {
        if(!empty($req->session()->get('password'))){
            $public_dir = public_path();
            $js_files = glob($public_dir . '\*.js');

            return view('/home',compact('js_files','public_dir'));
        }else{
          return redirect('login');
        }
    }
    public function logout(Request $req)
    {
        $req->session()->forget('password');
        $req->session()->flash('message','You have succesfully Logout');
        return redirect('login');
    }
    public function save(Request $request)
    {
        if ($request->has('save_button')) {
            $new_content = $request->input('file_content');
            $filepath=public_path().$request->filename;
            File::put($filepath, $new_content);
            return back();
        }
    }


}
