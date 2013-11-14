<?php

class User extends CI_Controller {

	//Create a new user
	public function post() 
	{
		$username = $this->input->post('username');
		$password = $this->input->post('password');

		$this->load->model('User_model');

		$added = $this->User_model->create($username, $password);

		$result['success'] = $added !== false;

		if (!$result['success']) {
			$result['error'] = $this->User_model->_last_error_msg;
		}
		echo json_encode($result);
	}

	public function get()
	{
		$username = $this->input->get('username');
		$password = $this->input->get('password');

		$this->load->model('User_model');

		$result = $this->User_model->get_by_username($username, $password);
		if ($result)
			echo json_encode(['success' => $result]);
		else 
			echo json_encode(['success' => false]);
	}
}