<?php

/**
 *
 */
class api {

	var $name;
	var $url;
	var $method;
	var $params;
	var $description;
	var $full_url;

	function __construct()	{
		# code...
		$this->name = "";
		$this->url = "";
		$this->params = new stdClass();
		$this->description = "";
		$this->method = "";
		$this->	full_url = "";
	}

}

?>