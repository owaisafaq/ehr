<?php
require 'api.array.php';

if (isset($_REQUEST['index'])) {

	$api = $api_arr[ $_REQUEST['index'] ];
	echo '<BR />';
	echo '<div align="center">';

	if($api->method == 'URI'){
		echo '<table width="400" style="border: 1px solid gray">';
		foreach($api->params as $key => $value){
			echo '<tr>';
			echo '<td align="right" height="25">' . $key . '</td>';
			echo '<td><input type="text" name="parameters[]" id="parameters" value="' . $value . '" /></td>';
			echo '</tr>';
		}
		echo '<tr><td>&nbsp;</td><td><button id="call-api" onclick="callApi();">Call</button></td></tr>';

		echo '<tr><td colspan="2" height="30" style="padding-left: 2px;">';
		echo '<a href="' . basename($_SERVER['PHP_SELF']) . '">.. Back?</a>';
		echo '</td></tr>';
		echo '</table>';

		echo '<div align="left" style="width: 33%; margin: 0 auto; font-size: 13px; color: black">';
		echo 'Method : ' . $api->method . '<BR />';
		echo 'TO : ' . $api->full_url;
		echo '</div>';
		echo '</div>';

	}else {
		// Remaining logic
		echo '<form action="submit.php" method="post" enctype="multipart/form-data">';
		echo '<input type="hidden" name="form_url" value="'.$api->url.'">';
		echo '<input type="hidden" name="api_method" value="'.$api->method.'">';
		echo '<table width="400">';
		echo '<tr><td colspan="2" align="center" bgcolor="lightgray" height="30">';
		echo '<B>' . $api->name . '</B>';
		echo '</td></tr>';

		foreach ($api->params as $key => $value) {
			echo '<tr>';
			if ($value != "") {
				echo '<td align="right" height="25">' . $key . '</td>';
				echo '<td>';

				if ($key == "params") {

					$value = str_replace("\n", "", $value);
					$value = str_replace("  ", "", $value);
					echo '<textarea name="params" cols=30 rows=5>' . $value . '</textarea>';
				}else {
					if($value == "file"){
						echo '<input type="file" name="' . $key . '" value="' . $value . '" />';
					}else{
						echo '<input type="txt" name="' . $key . '" value="' . $value . '" />';
					}
				}

				echo '</td>';
			} else {
				echo '<td align="right" height="25">' . $key . '</td>';
				echo '<td>';
				echo '<input type="text" name="' . $key . '"/>';
				echo '</td>';
			}
			echo '</tr>';
		}
		echo '<tr><td colspan="2" bgcolor="lightgray" height="30" style="padding-left: 10px;">';
		echo '<button type="submit">submit</button>';
		echo '<span style="padding-left: 4px;"></span>';
		echo '<button type="reset" >reset</button>';
		echo '</td></tr>';

		echo '<tr><td colspan="2" height="30" style="padding-left: 2px;">';
		echo '<a href="' . basename($_SERVER['PHP_SELF']) . '">.. Back?</a>';
		echo '</td></tr>';
		echo '</table>';
		echo '</form>';

		echo '<div align="left" style="width: 33%; margin: 0 auto; font-size: 13px; color: black">';
		echo 'Method : ' . $api->method . '<BR />';
		echo 'TO : ' . $api->url;
		echo '</div>';
		echo '</div>';
		//End Remaining Logic
	}


} else {

	echo '<H3>List Of API</H3>';
	echo '<ul>';
	$x = 0;
	foreach ($api_arr as $api) {
		echo '<li><a target="_blank" href="?index=' . $x . '">' . $api->name . '</a></li>';
		$x++;
	}
	echo '</ul>';
}





?>
<script type="text/javascript">
	function callApi(){
		var parmas = document.getElementsByName('parameters[]')
		var url = '<?php echo $api->url ?>';
		for(var i=0; i < parmas.length; i++){
			url+= '/'+parmas[i].value;
		}
		window.location.href = url;
	}
</script>