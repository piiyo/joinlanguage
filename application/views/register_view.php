<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!-- page wrapper -->
<div class="dev-page dev-page-login dev-page-login-v2 dev-page-registration">

	<div class="dev-page-login-block">
		<a class="dev-page-login-block__logo">JoinLang</a>
		<div class="dev-page-login-block__form">
			<form action="<?=base_url();?>index.php/joinlang/registration" method="post" name="registerForm" >
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="First Name" name="first_name" value="<?=set_value("first_name")?>">
							<?=form_error("first_name");?>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Last Name" name="last_name" value="<?=set_value("last_name")?>">
							<?=form_error("last_name");?>
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group no-margin">
							<input type="text" class="form-control" placeholder="Username" name="username" value="<?=set_value("username")?>">
							<?=form_error("username");?>
						</div>
						<span class="help-block">Your profile: <strong>username</strong></span>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<div class="form-group margin-top-30">
							<input type="email" class="form-control" placeholder="Email" name="email" value="<?=set_value("email")?>">
							<?=form_error("email");?>
						</div>
						<div class="form-group">
							<input type="password" class="form-control" placeholder="Password" name="password">
							<?=form_error("password");?>
						</div>
						<div class="form-group">
							<input type="password" class="form-control" placeholder="Repeat Password" name="re_password">
							<?=form_error("re_password");?>
						</div>
					</div>
				</div>

				<div class="form-group no-border">
					<button class="btn btn-danger btn-block" id="signUp">Sign up</button>
				</div>
				<p class="text-center">OR</p>
				<div class="form-group no-border">
					<button class="btn btn-facebook btn-block">Facebook Connect</button>
				</div>
			</form>
		</div>
		<div class="dev-page-login-block__footer">
			© 2016 <strong>JoinLang</strong>. All rights reserved.
		</div>
	</div>

</div>
<script type="javascript">
    $(document).ready(function{
		alert("Hallo");
        $("#test").click(function(){

          var formData = $.getFormData("registerForm");
            console.log(formData);
        });
    });
</script>








