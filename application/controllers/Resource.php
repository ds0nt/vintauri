<?php

class Resource extends CI_Controller {


	//Create a new resource
	public function post() 
	{
		$title = $this->input->post('title');
		$url = $this->input->post('url');
		$tags = $this->input->post('tags');

		$this->load->model('Resource_model');

		$added = $this->Resource_model->create($title, $url, $tags);

		$result['success'] = $added !== false;

		if (!$result['success']) {
			// $result['error'] = $this->Resource_model->_last_error_msg;
		}
		echo json_encode($result);
	}

	public function get()
	{
		$username = $this->input->get('username');

		$this->load->model('Resource_model');

		$resources = $this->Resource_model->get_recent();

		if (!empty($resources))
			echo json_encode(['success' => true, 'resources' => $resources]);
		else 
			echo json_encode(['success' => false]);
	}
}