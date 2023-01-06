<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $public_dir = public_path();
        $js_files = glob($public_dir . '\*.js');

        return view('home',compact('js_files','public_dir'));
    }
    public function save(Request $request){

        if ($request->has('save_button')) {
        $new_content = $request->input('file_content');
        $filepath=public_path().$request->filename;
        File::put($filepath, $new_content);
        return back();
        }
    }


}
