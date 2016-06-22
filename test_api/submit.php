<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') { // Form was submitted, do some checks and if it passes send the email

    $errors = 0;  // Keep track of the number of validation errors
    $Log = "";  // Get some details on what didn't validate
    $message = "";  // Starter email message
    $request = array();
    $successLog = "";  // Get some details on what went through
    // Sanitize the inputs
    foreach ($_POST as $formName => $formValue) {
        if (is_array($formValue)) {
            foreach ($formValue as $formName2 => $formValue2) {
                $request[$formName][$formName2] = htmlspecialchars(strip_tags($formValue2));
            }
        } else {
            $request[$formName] = htmlspecialchars(strip_tags($formValue));
        }
    }


    $post_fields = '';

    foreach ($request as $name => $value) {
        if (is_array($value)) {
            $value = implode(", ", $value);
        }
        if ($name != 'form_url' && $name != 'api_method') {
            $post_fields .= $name.'='.$value.'&';
        }
    }

    $post_fields = rtrim($post_fields,'&');
    if($_POST['api_method']=='GET'){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $_POST['form_url'].'?'.$post_fields);

        if(isset($_POST['token'])){
            $headers = array('Authorization: Bearer ' . $_POST['token']);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        }

        // in real life you should use something like:
        // curl_setopt($ch, CURLOPT_POSTFIELDS,
        //          http_build_query(array('postvar1' => 'value1')));

        // receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_output = curl_exec ($ch);

        curl_close ($ch);
        echo $server_output;
    }
    elseif($_POST['api_method']=='POST'){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $_POST['form_url']);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$post_fields);
        if(isset($_POST['token'])){
            $headers = array('Authorization: Bearer ' . $_POST['token']);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        }

        // in real life you should use something like:
        // curl_setopt($ch, CURLOPT_POSTFIELDS,
        //          http_build_query(array('postvar1' => 'value1')));

        // receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_output = curl_exec ($ch);

        curl_close ($ch);
        echo $server_output;
    }else if($_POST['api_method']=='PUT'){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $_POST['form_url']);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_POSTFIELDS,$post_fields);
        if(isset($_POST['token'])){
            $headers = array('Authorization: Bearer ' . $_POST['token']);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        }
        // in real life you should use something like:
        // curl_setopt($ch, CURLOPT_POSTFIELDS,
        //          http_build_query(array('postvar1' => 'value1')));

        // receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_output = curl_exec ($ch);

        curl_close ($ch);
        echo $server_output;
    }else if($_POST['api_method']=='DELETE'){
        $ch = curl_init();
        if(isset($_POST['token'])){
            $headers = array('Authorization: Bearer ' . $_POST['token']);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        }
        curl_setopt($ch, CURLOPT_URL, $_POST['form_url']);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($ch, CURLOPT_POSTFIELDS,$post_fields);

        // in real life you should use something like:
        // curl_setopt($ch, CURLOPT_POSTFIELDS,
        //          http_build_query(array('postvar1' => 'value1')));

        // receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_output = curl_exec ($ch);

        curl_close ($ch);
        echo $server_output;
    }

}
?>