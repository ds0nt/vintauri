<?php

class Welcome extends CI_Controller {

	public function index()
	{
		$this->load->model('User_model');
		$this->load->view('app.html');
	}

	public function about()
	{
		echo 'About';
	}
}