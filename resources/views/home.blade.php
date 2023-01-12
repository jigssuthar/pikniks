@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                <form name="updateForm" id="updateForm" method="POST" data-action="{{route('save-file')}}">
                    @csrf
                    <select id="js-file-select" name="filename" data-url="{{route('load-file')}}" >
                        <option value="">--- Select file ---</option>
                        @foreach ($js_files as $js_file )
                            <option value="{{ $js_file }}">{{ $js_file }}</option>
                        @endforeach
                        <option id="" value="{{ $xmlfile }}">{{$xmlfile}}</option>
                    </select>
                    <button type="button" onclick="loadFile()" id="load" name="load_button" class="btn btn-primary" >Load</button>
                    <textarea id="js-code" cols="80" rows="15" id="file_content" name="file_content">{{@$updatedContent}}</textarea>
                    <button type="button" onclick="submitForm()" id="save_button" name="save_button" class="btn btn-info">Save</button>
                </form>
</div>
<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
<script>
    function loadFile ()
    {
        var file = 'js'+$('#js-file-select').val();
        $.ajax({
            url: $('#js-file-select').data('url'),
            data: {'file_name':$('#js-file-select').val()},
            method: 'get',
            dataType: 'text',
            success: function (result) {
                result = JSON.parse(result);
                if(result.success){
                    $("#js-code").val(result.data);
                }else{
                    alert('File not found!');
                }
            }
        });
    }
    function submitForm ()
    {
        if($('#js-file-select').val() != ''){
            var formData = $('#updateForm').serialize();
            var file = $('#js-file-select').val();
            $.ajax({
                url: $('#updateForm').data('action'),
                data: formData,
                method: 'POST',
                dataType: 'json',
                success: function (result) {
                    if(result.success){
                        alert('File Saved');
                        if (file == 'master.xml' ) {
                            window.location.reload(true);
                        }
                    }else{
                        alert('File not saved!');
                    }
                }
            });
        }else{
            alert('Select File!');
        }


    }



</script>
@endsection
