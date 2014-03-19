$(function(){
	//cycle through background Images
	var imageCycle = ["imageCycle1", "imageCycle2"/*, "imageCycle3"*/];
	var randomNumber = Math.floor(Math.random()*imageCycle.length);
	$(".landingPageSection").addClass(imageCycle[randomNumber]);
	
	//scroll to navbar name tage on page
	$(document).on("click", ".navbar-brand", function(){
		$('body').animatescroll();
	})
	$(document).on("click", "#tourists", function(){
		$('#touristInfo').animatescroll();
	})
	$(document).on("click", "#tourGuides", function(){
		$('#tourGuideInfo').animatescroll();
	})
	$(document).on("click", "#contactUs", function(){
		$('#contactInfo').animatescroll();
	})
	//scroll to #touristInfo on Explore GiraNaut click
	$(document).on("click", "#explore", function(){
		$('#touristInfo').animatescroll();
	})


	$(window).on("scroll", function(){
		var windowLocation = $(this).scrollTop();
		var navbarHeight = $(".navbar-inverse").height();
		var sectionTourists = $("#touristInfo").offset().top;
		var sectionTourGuides = $("#tourGuideInfo").offset().top;
		var sectionContactUs = $("#contactInfo").offset().top;
		if(windowLocation < (sectionTourists - navbarHeight)){
			$(".navGuide").removeClass("active");
		}
		else if(windowLocation >= (sectionTourists - navbarHeight) && windowLocation < (sectionTourGuides - navbarHeight)){
			$(".navGuide").removeClass("active");
			$("#tourists").addClass("active");
		}
		else if(windowLocation >= (sectionTourGuides - navbarHeight) && windowLocation < (sectionContactUs - navbarHeight)){
			$(".navGuide").removeClass("active");
			$("#tourGuides").addClass("active");
		}
		else{
			$(".navGuide").removeClass("active");
			$("#contactUs").addClass("active");
		}
	})


	//regex checks for signup validation
	$("#submitSignIn").on("click", function(e){
		var email = $("#emailSignIn").val();
		var password = $("#passwordSignIn").val();
		var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z\s]{2,4}$/;
		var passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
		if (mailformat.test(email) === false && passwordformat.test(password) === false) 
		{
			$('.email').addClass('has-error');
			$('.password').addClass('has-error');
			$('#emailSignIn').val('');
			$('#emailSignIn').popover({
				trigger: 'focus',
				placement: "top",
				content: "Not a valid e-mail address"});
			$('#passwordSignIn').val('');
			$('#passwordSignIn').popover({
				trigger: 'focus',
				placement: 'bottom',
				content:"Password must contain at least one Uppercase and Lowercase letter, and one Number"});
			return false;	
		}
		else if(mailformat.test(email) === false){
			$('.password').removeClass('has-error');
			$('#passwordSignIn').popover('destroy');
			$('.email').addClass('has-error');
			$('#emailSignIn').val('');
			$('#emailSignIn').popover({
				trigger: 'focus',
				placement: "top",
				content: "Not a valid e-mail address"});
			return false;
		}
		else if(passwordformat.test(password) === false){
			$('.email').removeClass('has-error');
			$('#emailSignIn').popover('destroy');
			$('.password').addClass('has-error');
			$('#passwordSignIn').val('');
			$('#passwordSignIn').popover({
				trigger: 'focus',
				placement: 'bottom',
				content:"Password must contain at least one Uppercase and Lowercase letter, and one Number"});
			return false;
		}

		// clear sign-in fields if "remember me" isn't checked
		if($(".checkbox").is(":checked") === false){
			$('#login-nav #emailSignIn, #login-nav #passwordSignIn').val("");	
		}
	});

	//Switch between "+" & "-" when FAQ item is clicked
	$('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-minus"></i>');
    });
    $('.collapse').on('hide.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-plus"></i>');
    });

	//clear input values of GiraNaut sign-in modal
	$('.socialMediaImageGiraNaut').on('click',function(){
		$('#myModal').modal('show');
		if($(".checkbox").is(":checked") === false){
			$('#login-nav #emailSignIn, #login-nav #passwordSignIn').val("");
		}
	})

})