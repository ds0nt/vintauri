<?php
class User extends CI_Controller {
	
	public function get()
	{
		$username = $this->input->get('username');
		$password = $this->input->get('password');

		$this->load->model('User_model');

		$result = $this->User_model->get($username, $password);

		echo json_encode($result);
	}
}