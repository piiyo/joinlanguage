<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class JoinLang extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
		$this->load->library('form_validation');

	}

	public function index()
	{
		$this->load->view('default/header');
		$this->load->view('login_view');
		$this->load->view('default/footer');
	}

	public function registration(){

		$this->load->view('default/header');
		if(isset($_POST["first_name"])){
			$this->load->model("rules_model");
			$this->form_validation->set_rules($this->rules_model->registr_rules);
			$check = $this->form_validation->run();
			if($check == TRUE){
				$reg['first_name'] = $this->input->post('first_name');
				$reg['last_name'] = $this->input->post('last_name');
				$reg['username'] = $this->input->post('username');
				$reg['email'] = $this->input->post('email');
				$reg['password'] = $this->input->post('password');
				$reg['re_password'] = $this->input->post('re_password');

				$this->index();
				//run next function with load Home page.
			}else{
				$this->load->view('register_view');
			}

		}else{
			$this->load->view('register_view');
		}
		//$this->load->view('default/footer');
	}

}
