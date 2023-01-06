@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <script src="https://code.jquery.com/jquery-3.6.3.min.js"
                    integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
                <script>
                    $(document).ready(function() {
                    $("#js-file-select").change(function() {
                      var file = 'js'+$(this).val();
                      $.ajax({
                        url: file,
                        dataType: "text",
                        success: function(data) {
                          $("#js-code").val(data);
                        }
                      });
                    });
                  });

                  jQuery(function() {
                    jQuery("#js-code").hide()
                    jQuery("#save").hide()
                    jQuery("#load").click(function(e) {
                        e.preventDefault();
                        var value = jQuery(this).val();
                        jQuery("#js-code").show();
                        jQuery("#save").show();
                        jQuery("#" + value).show();
                    });
                    jQuery("#save").click(function(e) {
                        e.preventDefault();
                        var value = jQuery(this).val();
                        alert('file saved');
                        jQuery("#js-code").hide();
                        jQuery("#save").hide();
                    });
                    });
                </script>
                {{-- @php dd($js_files);@endphp --}}
                <form method="POST" action="/save">
                    @csrf
                <select id="js-file-select" name="filename" >
                    <option value="">--- Select file ---</option>
                    @foreach ($js_files as $js_file)
                    @php $filename= str_replace($public_dir, '', $js_file);  @endphp
                    <option value="{{ $filename }}">{{ $js_file }}</option>
                    @endforeach
                </select>

                <button type="submit" id="load" name="save_button" class="btn btn-primary" >Load</button>

                <textarea id="js-code" cols="100" rows="10" name="file_content"></textarea>
                <button type="submit" id="save" name="save_button" class="btn btn-info">Save</button>
                </form>


</div>

@endsection
