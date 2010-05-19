/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

$(document).ready(function() {

	var name =     $("#name");
	var email =    $("#email");
	var location = $("#location");
	var male =     $("#gendermale");
	var female =   $("#genderfemale");
	var gender =   $("#gender");
	var info =     $("#emailform .info");

	//On Submitting
	$("#emailform").submit(function() {
		info.empty();
		if(validateName() & validateEmail() & validateLocation() & validateGender()) {
			save_cookie("mailinglist", "true");
			true;
		}
		else {
			return false;
		}
	});

	//ajax push to campaign monitor
	function ajax_mail_list_push() {
		var dataArray = new Array();
		$.each($('form#emailform input'), function(i) {
			dataArray[dataArray.length] = $(this)[0].name + "=" + $(this).val();
		});
		var dataString = dataArray.join("&");

		$.ajax({
			type: "POST",
			url:  "http://makemoreconsultingllc.createsend.com/t/r/s/jtlhkr/",
			data: dataString,
			success: function() {
				info[0].empty().append("Thank you for adding your email to the mailing list.  You will receive an email shortly asking to confirm being added.");
			}
		});
	}

	//validation functions
	function validateEmail() {
		//testing regular expression
		var a = email.val();
		var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
		//if it's valid email
		if(filter.test(a)){
			email.removeClass("error");
			return true;
		}
		//if it's NOT valid
		else{
			email.addClass("error");
			info.append("<div class=\"error\">* email address is invalid</div>");
			return false;
		}
	}
	function validateName() {
		//if it's NOT valid
		var a = name.val();
		if(a.length < 3 || a.toLowerCase() == 'name'){
			name.addClass("error");
			info.append("<div class=\"error\">* name is required</div>");
			return false;
		}
		//if it's valid
		else{
			name.removeClass("error");
			return true;
		}
	}
	function validateLocation() {
		//if it's NOT valid
		var a = location.val();
		if(a.length < 4 || a.toLowerCase() == 'location'){
			location.addClass("error");
			info.append("<div class=\"error\">* location is required</div>");
			return false;
		}
		//if it's valid
		else{
			location.removeClass("error");
			return true;
		}
	}
	function validateGender() {
		//if it's NOT valid
		if (!male[0].checked && !female[0].checked) {
			gender.addClass("error");
			info.append("<div class=\"error\">* gender is required</div>");
			return false;
		}
		//if it's valid
		else {
			gender.removeClass("error");
			return true;
		}
	}
});
