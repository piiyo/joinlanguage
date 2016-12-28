<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rules_model extends CI_Model {

    public $registr_rules = array(
        array(
            "field" => "first_name",
            "label" => "First Name is required",
            "rules" => "required|min_length[2]|max_length[18]|trim"
        ),
        array(
            "field" => "last_name",
            "label" => "Last Name is required",
            "rules" => "required|min_length[2]|max_length[18]|trim"
        ),
        array(
            "field" => "username",
            "label" => "Username is required",
            "rules" => "required|min_length[2]|max_length[18]|trim"
        ),
        array(
            "field" => "email",
            "label" => "Email is required",
            "rules" => "required|min_length[5]|trim|valid_email"
        ),
        array(
            "field" => "password",
            "label" => "Password is required",
            "rules" => "required|min_length[8]|trim"
        ),
        array(
            "field" => "re_password",
            "label" => "Password is required",
            "rules" => "required|min_length[8]|trim"
        )


    );

}