function get_cookie( cookie_name ) {
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
function save_cookie( key, val ) {
	var cookie_date = new Date(2032, 01, 01);
	document.cookie = key + "=" + val + "; path=/; expires=" + cookie_date.toGMTString();
}

$(document).ready(function() {
	$.each($('form input'), function(i) {
		$(this).click(function() {
			$(this).select();
		});
	});

	$('#formsubmit').click(function(i) {
		$(this).blur();
		$('#emailform').submit();
	});

	$('#formskip').click(function(i) {
		$(this).blur();

		save_cookie( "mailinglist", "false" );
		window.location = "/";
	});
});
