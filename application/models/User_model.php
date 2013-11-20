
<?php

class User_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

    public $priviledged_cols = [

    ];

    public $unpriviledged_cols = [
        'user_id',
        'username'
    ];

    private function _is_user_me($user_id) 
    {
        return $this->session->get_userdata['user_id'] === (int) $user_id;
    }

    private function _get_priviledged_cols_sql() 
    {
        return implode(',', $this->priviledged_cols);
    }

    private function _get_unpriviledged_cols_sql() 
    {
        return implode(',', $this->unpriviledged_cols);
    }

    public function login($username, $password) 
    {
        $this->session->sess_destroy();

        $user = $this->db
            ->query('SELECT user_id, username FROM users WHERE username = ? AND password = ?', [$username, md5($password)])->row_array();
        if (!empty($user)) {
            $this->session->set_userdata($user);
            return $user['user_id'];
        } else {
            $this->_last_error_msg = 'Invalid Username/Password Combination';
            return false;
        }

    }

    public function create($username, $password) 
    {
        $existing_user = $this->db
            ->query('SELECT user_id FROM users WHERE username = ?', [$username])
            ->row_array();
            
        if (!empty($existing_user)) {
            $this->_last_error_msg = 'That username is not available';
            return false;
        }

        $result = $this->db
            ->set(['username' => $username, 'password' => md5($password)])
            ->insert('users');
        
        return $result;
    }

    /**
     * 
     */
    public function get_by_username($username)
    {
        $cols = $this->_get_unpriviledged_cols_sql();
        $result = $this->db
            ->query('SELECT ' . $cols . ' FROM users WHERE username = ?', [$username])->row_array();
        
   		return empty($result) ? false : $result;
    }

}