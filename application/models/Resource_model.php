
<?php

class Resource_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

    private function url_checking($str) 
    {
        $pattern = "/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i";
        if (!preg_match($pattern, $str))
        {
            return false;
        }
         
        return true;
    } 

    public function create($title, $url, $tags) 
    {
        if (!is_string($title) || $title == '' 
            || !is_string($url) || !$this->url_checking($url) 
            || !is_array($tags)) {
            return false;
        }

        $resource = $this->db
            ->query('SELECT resource_id, title FROM resources WHERE url = ?', $url)
            ->row_array();
            
        if (is_array($resource)) {
            return false;
        }

        $this->db->trans_start();

        $result = $this->db
            ->set(['title' => $title, 'url' => $url])
            ->insert('resources');

        $last_id = $this->db->insert_id();
        if ($result && !empty($tags)) {            
            $tag_ids = [];
            foreach ($tags as $key => $value) {
                $this->db->set(['tag' => $value])->insert('tags');
                $id = $this->db->insert_id();
                $this->db->set(['tag_id' => $id, 'resource_id' => $last_id])->insert('resource_tags');
            }
        }
        $this->db->trans_complete();
        return $last_id;
    }

    public function get_recent($limit = 15) {
        return $this->db->query('SELECT * FROM resources r LEFT JOIN resource_tags rt on r.resource_id = rt.resource_id LEFT JOIN tags t on rt.tag_id = t.tag_id ORDER BY r.date_created DESC LIMIT ?', [$limit])->result_array();
    }

    public function update($id, $title, $url, $tags = array(), $override_tags = false) 
    {

    }
}