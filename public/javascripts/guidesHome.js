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
		// console.log(data);
		if($('.chatSidebar[data-id='+data.from+']').length < 1){
			$("#messageQueue").append(chatInboxTemplate({name: data.name, message: data.message, from: data.from, image: data.image}));
			appendMessages(data);
			getIncomingMessage(data);
			$('.chatWindow[data-id='+data.from+']').closest('.touristChatBox').hide();
		}
		else{
			getIncomingMessage(data);
			$('.chatBody').scrollTop($('.chat').height());
		}
	});

	//hide guide Info and show tourist message
	$(document).on('click','.chatName',function(){
		if($('.chatName').length >1){
			$('.touristChatBox').hide();
		}
		$("#wrapper").toggleClass("active");
		$(".cover").hide();
		var touristID = $(this).attr('data-id');
		$('.chatWindow[data-id='+touristID+']').closest('.touristChatBox').css('display','block');
		$('.chatBody').scrollTop($('.chat').height());
		// $("#touristChat").css("display", "block");
		// var chatWrapDiv = $("<div class='touristChatBox'></div>");
		// $("#touristChat").append(chatWrapDiv);
		// chatWrapDiv.html(chatTemplate());
	});

	$(document).on('click', '.removeButton', function(){
		$(".cover").show();
		$(this).closest('.touristChatBox').hide();
	})

	function appendMessages(data){
		var chatWrapDiv = $("<div class='touristChatBox' data-id="+guideData._id+"></div>");
		$("#touristChat").append(chatWrapDiv);
		chatWrapDiv.html(chatTemplate(data));
	}

	function getIncomingMessage(data){
		data.timestamp = moment(data.timestamp).format('MMM D, h:mm a');
		$('.chatWindow[data-id='+data.from+']').find('.chat').append(incomingTemplate(data));
	}
	
	$(document).on('keyup', ".messageBox", function(e){
		if(e.keyCode === 13){
			var receiverID = $(this).closest('.chatWindow').attr("data-id");
			var message = $(this).val();
			// var name = guideData.firstName;
			var timestamp = moment().format('MMM D, h:mm a YYYY');
			socket.emit('message',{message: message, timestamp: timestamp, name: guideData.firstName, from: guideData._id, image: guideData.picture, to: receiverID});
			$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({timestamp: moment(timestamp).format('MMM D, h:mm a'), name: guideData.firstName, message: message, from: guideData._id, image: guideData.picture}));
			$('.chatBody').scrollTop($('.chat').height());
			message = $(this).val("");
		}
	});

	$(document).on("click", ".btn-chat" ,function(){
		var receiverID = $(this).closest('.chatWindow').attr("data-id");
		var message = $(this).closest('.chatWindow').find(".messageBox").val();
		// var name = guideData.firstName;
		var timestamp = moment().format('MMM D, h:mm a YYYY');
		socket.emit('message',{message: message, timestamp: timestamp, name: guideData.firstName, from: guideData._id, image: guideData.picture, to: receiverID});
		$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({timestamp: moment(timestamp).format('MMM D, h:mm a'), name: guideData.firstName, message: message, from: guideData._id, image: guideData.picture}));
		$('.chatBody').scrollTop($('.chat').height());
		message = $(this).val("");
	})


})