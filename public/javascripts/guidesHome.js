$(function(){
	//background image stretch to fit the page
	$.backstretch("../images/brazilLandscape.jpg");

	var touristChat = $('#touristChatMessenger').html();
	var chatTemplate = Handlebars.compile(touristChat);


	//show/hide sidebar on click
	$("#main_icon").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
	});

	//Toggle Edit/Disable edit on button
	$('#enable').on('click', function(){
		if($(this).text() === 'Edit Profile'){
			$(this).text('Disable Edit');
		}
		else{
			$(this).text('Edit Profile');
		}
	});

	//hide guide Info and show tourist message
	$('.chatName').on('click',function(){
		$("#wrapper").toggleClass("active");
		$(".cover").css('display','none');
		// $("#touristChat").css("display", "block");
		var chatWrapDiv = $("<div class='touristChatBox'></div>");
		$("#touristChat").append(chatWrapDiv);
		chatWrapDiv.html(chatTemplate());
	});

	$(document).on('click', '.removeButton', function(){
		$(".cover").css('display','block');
		$(this).closest('.touristChatBox').remove();
	})


})