
<?php

class User_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }


    /**
     * 
     */
    public function get($username, $password = false)
    {
    	if ($password) {
    		$result = $this->_database
				->query('SELECT * FROM vintauri.users WHERE username = ? AND password = ?', [$username, $password])
    			->row_array();
    		return empty($result) ? false : $result;
    	}
    }

}