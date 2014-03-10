$(document).ready(function(){
  $(document).mousemove(function(e){
     TweenLite.to($('body'), 
        .5, 
        { css: 
            {
                'background-position':parseInt(event.pageX/8) + "px "+parseInt(event.pageY/12)+"px, "+parseInt(event.pageX/15)+"px "+parseInt(event.pageY/15)+"px, "+parseInt(event.pageX/30)+"px "+parseInt(event.pageY/30)+"px"
            }
        });
  });

  //regex checks for signup validation
	$("#submitSignIn").on("click", function(e){
		// e.preventDefault();	
		var email = $("#emailSignIn").val();
		var password = $("#passwordSignIn").val();
		var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z\s]{2,4}$/;
		var passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
		if (mailformat.test(email) === false) 
		{
			alert("Not a valid e-mail address");
			return false;	
		}
		if (passwordformat.test(password) === false)
		{
			alert("Password must contain at least one Uppercase letter, one Lowercase letter, and one Number");
			return false;
		}
		if($(".checkbox").is(":checked") === false){
			$('#login-nav #emailSignIn, #login-nav #passwordSignIn').val("");
		}
		// window.location = "gmapsLandingPage.html";
	});
});