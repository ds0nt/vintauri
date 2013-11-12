<?php

class Welcome extends CI_Controller {

	public function index()
	{
		$this->load->model('User_model');
		echo 'Welcome Index';
	}

	public function about()
	{
		echo 'About';
	}
}