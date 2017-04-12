$(document).ready(function() {

	$("#sign_up").submit(function(e){
		e.preventDefault();

        var csrftoken = getCookie('csrftoken');
        var username = $(e.currentTarget).find("#id_username").val();
        var email = $(e.currentTarget).find("#id_email").val();
        var password = $(e.currentTarget).find('#id_password').val();
        var comfirm_password = $(e.currentTarget).find('#id_comfirm_password').val();

		$.ajax({
			headers: { 'X-CSRFToken': csrftoken },
		    url: '',
		    type: 'POST',
		    data: {'username' : username, 'email': email, 'password' : password, 'comfirm_password' : comfirm_password},
		    success: function(response) {
	            if (response.success){
	                window.location.href = response.data.url;
	            }
            else{
                var errors = JSON.parse(response.data.errors);
                $('.control-label').remove();
                $('.glyphicon').remove();

                if (errors.username){
                    $('#div_id_username').removeClass();
                    $('#id_username').before('<label for="id_username" class="control-label  requiredField">' + errors.username[0].message + '</label>');
                    $('#id_username').before('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_username').addClass('form-group has-error has-feedback');
                }

                else{
                    $('#div_id_username').removeClass();
                    $('#id_username').before(' <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_username').addClass('form-group has-success has-feedback');
                }

                if (errors.email){
                    $('#div_id_email').removeClass();
                    $('#id_email').before('<label for="id_email" class="control-label  requiredField">' + errors.email[0].message + '</label>');
                    $('#id_email').before('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_email').addClass('form-group has-error has-feedback');
                }

                else{
                    $('#div_id_email').removeClass();
                    $('#id_email').before(' <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_email').addClass('form-group has-success has-feedback');
                }

                if (errors.password){
                    $('#div_id_password').removeClass();
                    $('#id_password').before('<label for="id_password" class="control-label  requiredField">' + errors.password[0].message + '</label>');
                    $('#id_password').before('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_password').addClass('form-group has-error has-feedback');

                    $('#div_id_comfirm_password').removeClass();
                    $('#id_comfirm_password').before('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_comfirm_password').addClass('form-group has-error has-feedback');
                }

                else{
                    $('#div_id_password').removeClass();
                    $('#id_password').before(' <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_password').addClass('form-group has-success has-feedback');

                    $('#div_id_comfirm_password').removeClass();
                    $('#id_comfirm_password').before(' <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
                    $('#div_id_comfirm_password').addClass('form-group has-success has-feedback');
                }

            }
		    }
		});
	})

	$("body").on("click", "#login_button", function(e){
		e.preventDefault();
		var csrftoken = getCookie('csrftoken');
		var username = $("#id_login_username").val();
		var password = $("#id_login_password").val();

		$.ajax({
			headers: { 'X-CSRFToken': csrftoken },
		    url: '/login',
		    type: 'POST',
		    data: {'login_username' : username, 'login_password' : password},
		    success: function(response) {
	            if (response.success){
	                window.location.href = response.data.url;
	            }
	            else{
                    $('.control-label').remove();
					$('#id_login_username').before('<label for="id_password" class="control-label  requiredField">' + response.data.errors + '</label>');
	            }
		    }
		})
	})

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }




});