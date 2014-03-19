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



    //on click remove blinking class
    $(document).on('click', '.messageQueueDesign', function(){
    	$(this).removeClass('newMessage');
    })
	//SOCKET CODE FOR GUIDES
	// connect the socket.io server
	var socket = io.connect("http://localhost");

	//define socket events

	socket.on('connect', function(){
	});

	socket.on("message",function(data){
		if($('.chatSidebar[data-id='+data.from+']').length < 1){
			$("#messageQueue").prepend(chatInboxTemplate({name: data.name, message: data.message, from: data.from, image: data.image}));
			appendMessages(data);
			getIncomingMessage(data);
			$('.chatWindow[data-id='+data.from+']').closest('.touristChatBox').hide();
		}
		else{
			$('#messageQueue').prepend($('.chatSidebar[data-id='+data.from+']').closest('.messageQueueDesign').addClass('newMessage'));
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
	});

	$(document).on('click', '.removeButton', function(){
		$(".cover").show();
		$(this).closest('.touristChatBox').hide();
	})

	function appendMessages(data){
		var chatWrapDiv = $("<div class='touristChatBox' data-id="+guideData._id+"></div>");
		$("#touristChat").append(chatWrapDiv);
		chatWrapDiv.html(chatTemplate(data));
		console.log(data)
	}

	function getIncomingMessage(data){
		data.timestamp = moment(data.timestamp).format('MMM D, h:mm a');
		$('.chatWindow[data-id='+data.from+']').find('.chat').append(incomingTemplate(data));
	}

	function getOutgoingMessage(data){
		data.timestamp = moment(data.timestamp).format('MMM D, h:mm a');
		$('.chatWindow[data-id='+data.from+']').find('.chat').append(outgoingTemplate(data));
		console.log("oops ", data)
	}
	
	$(document).on('keyup', ".messageBox", function(e){
		if(e.keyCode === 13){
			var receiverID = $(this).closest('.chatWindow').attr("data-id");
			var message = $(this).val();
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
		var timestamp = moment().format('MMM D, h:mm a YYYY');
		socket.emit('message',{message: message, timestamp: timestamp, name: guideData.firstName, from: guideData._id, image: guideData.picture, to: receiverID});
		$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({timestamp: moment(timestamp).format('MMM D, h:mm a'), name: guideData.firstName, message: message, from: guideData._id, image: guideData.picture}));
		$('.chatBody').scrollTop($('.chat').height());
		message = $(this).val("");
	});

	var allMessages = messageData.filter(function(item){
		return item;
	});

	allMessages.sort(function(a,b){
		if(a.date > b.date){
			return 1
		}
		else if(a.date < b.date){
			return -1
		} 
		else{
			return 0
		}
	})
	console.log(allMessages)
	for (var i = 0; i < allMessages.length; i++) {
		if(allMessages[i].from._id !== guideData._id ){
			if($('.chatSidebar[data-id='+allMessages[i].from._id+']').length < 1 ){
					$("#messageQueue").prepend(chatInboxTemplate({from: allMessages[i].from._id , name: allMessages[i].from.name, image: allMessages[i].from.picture}));
					appendMessages({name: allMessages[i].from.name, from: allMessages[i].from._id});
					getIncomingMessage({name: allMessages[i].from.firstName, from: allMessages[i].from._id, image: allMessages[i].from.picture, message:allMessages[i].message, timestamp: allMessages[i].time});
					$('.chatWindow[data-id='+allMessages[i].from._id+']').closest('.touristChatBox').hide();
					console.log(i)
			}
			else{
				$('#messageQueue').prepend($('.chatSidebar[data-id='+allMessages[i].from._id+']').closest('.messageQueueDesign'))
				getIncomingMessage({name: allMessages[i].from.firstName, from: allMessages[i].from._id, image: allMessages[i].from.picture, message:allMessages[i].message, timestamp: allMessages[i].time});
				$('.chatBody').scrollTop($('.chat').height());
			}
		}
		else{
			if($('.chatSidebar[data-id='+allMessages[i].to._id+']').length < 1 ){
					$("#messageQueue").prepend(chatInboxTemplate({from: allMessages[i].to_id , name: allMessages[i].to.name, image: allMessages[i].to.picture}));
					appendMessages({name: allMessages[i].to.name, from: allMessages[i].to._id});
					getOutgoingMessage({name: allMessages[i].from.firstName, from: allMessages[i].to._id, image: allMessages[i].from.picture, message:allMessages[i].message, timestamp: allMessages[i].time});
					$('.chatWindow[data-id='+allMessages[i].to._id+']').closest('.touristChatBox').hide();
					console.log("hey")
			}
			else{
				$('#messageQueue').prepend($('.chatSidebar[data-id='+allMessages[i].to._id+']').closest('.messageQueueDesign'))
				getOutgoingMessage({name: allMessages[i].from.firstName, from: allMessages[i].to._id, image: allMessages[i].from.picture, message:allMessages[i].message, timestamp: allMessages[i].time});
				$('.chatBody').scrollTop($('.chat').height());
				console.log("hey bud")
			}		
		};
	}

		
})