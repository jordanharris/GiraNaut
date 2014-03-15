$(function(){
	var obj;
	var touristChat = $('#touristChatMessenger').html();
	var chatTemplate = Handlebars.compile(touristChat);
	var incomingMessage = $('#incomingMessage').html();
	var incomingTemplate = Handlebars.compile(incomingMessage);
	var outgoingMessage = $('#outgoingMessage').html();
	var outgoingTemplate = Handlebars.compile(outgoingMessage);
	var chatInbox = $('#chatInbox').html();
	var chatInboxTemplate = Handlebars.compile(chatInbox);

	//background image stretch to fit the page
	$.backstretch("../images/brazilLandscape.jpg");


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



	//SOCKET CODE FOR GUIDES
	// connect the socket.io server
	var socket = io.connect("http://localhost");

	//define socket events

	socket.on('connect', function(){
	});

	socket.on("message",function(data){
		console.log(data);
		if($('.chatSidebar[data-id='+data.senderID+']').length < 1){
			$("#messageQueue").append(chatInboxTemplate({name: data.name, message: data.message, senderID: data.senderID, image: data.image}));
			appendMessages(data);
			getIncomingMessage(data);
			$('.touristChatBox').css('display','none');
		}
		else{
			getIncomingMessage(data);
		}
	});

	//hide guide Info and show tourist message
	$(document).on('click','.chatName',function(){
		$("#wrapper").toggleClass("active");
		$(".cover").css('display','none');
		var touristID = $(this).attr('data-id');
		$('.chatWindow[data-id='+touristID+']').closest('.touristChatBox').css('display','block');
		// $("#touristChat").css("display", "block");
		// var chatWrapDiv = $("<div class='touristChatBox'></div>");
		// $("#touristChat").append(chatWrapDiv);
		// chatWrapDiv.html(chatTemplate());
	});

	$(document).on('click', '.removeButton', function(){
		$(".cover").css('display','block');
		$(this).closest('.touristChatBox').css('display','none');
	})

	function appendMessages(data){
		var chatWrapDiv = $("<div class='touristChatBox' data-id="+guideData._id+"></div>");
		$("#touristChat").append(chatWrapDiv);
		chatWrapDiv.html(chatTemplate(data));
	}

	function getIncomingMessage(data){
		$('.chatWindow[data-id='+data.senderID+']').find('.chat').append(incomingTemplate(data));
	}
	
	$(document).on('keyup', ".messageBox", function(e){
		if(e.keyCode === 13){
			// var targetID = $(this).closest('.touristChatBox').attr("data-id");
			var message = $(this).val();
			// var name = guideData.firstName;
			socket.emit('message',{message: message, name: guideData.firstName, senderID: guideData._id, image: guideData.picture });
			$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({name: guideData.firstName, message: message, senderID: guideData._id, image: guideData.picture}))
			message = $(this).val("");
		}
	});

	$(document).on("click", ".btn-chat" ,function(){
		// var targetID = $(this).closest('.touristChatBox').attr("data-id");
		var message = $(this).closest('.chatWindow').find(".messageBox").val();
		// var name = guideData.firstName;
		socket.emit('message',{message: message, name: guideData.firstName, senderID: guideData._id, image: guideData.picture});
		$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({name: guideData.firstName, message: message, senderID: guideData._id, image: guideData.picture}))
		message = $(this).val("");
	})


})