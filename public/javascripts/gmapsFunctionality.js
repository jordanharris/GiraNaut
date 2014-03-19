$(function(){
	var obj;
	var guideChat = $('#guideChatMessenger').html();
	var chatTemplate = Handlebars.compile(guideChat);
	var incomingMessage = $('#incomingMessage').html();
	var incomingTemplate = Handlebars.compile(incomingMessage);
	var outgoingMessage = $('#outgoingMessage').html();
	var outgoingTemplate = Handlebars.compile(outgoingMessage);
	var newarr = [];
	var allMessages = messageData.filter(function(item){
		return item;
	})

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

	var falseMessages = messageData.filter(function(item){
		return item.loggedIn === false;
	})
	console.log(allMessages);
	//user sidebar toggle class
	$("#menu-toggle").click(function(e) {
	        e.preventDefault();
	        $("#wrapper").toggleClass("active");
	});

	$(document).on("click", ".guideChatButton" ,function(){
		var $this = $(this);
		$.get('/userDoc', function(data){
			var obj = {"name": $this.closest(".guideInnerCard").find("h2").text(),
				   "image": $this.closest(".guideInnerCard").find("img").attr("src"),
				   "from": $this.attr("data-id"),
				   "userData": data,
				   "to": data._id,
				  };
			if(newarr.length > 0 ){
				if(newarr.indexOf(obj.from) !== -1){
					$('.guideChatBox[data-id='+obj.from+']').show();
					// $("#"+obj.name.split(" ").join("")+"").find(".panel-heading").next().next().css("display","block");
				}
				else if(newarr.indexOf(obj.from) === -1 && $(".guideChatBox").length < Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth()) ){
					$("#chatMessenger").css("display", "block");
					appendMessages(obj)
					// var chatWrapDiv = $("<div class='guideChatBox' data-id="+obj.from+"></div>");
					// $("#chatMessenger").append(chatWrapDiv);
					// chatWrapDiv.html(chatTemplate(obj));
					newarr.push(obj.from);
				}
				else if(newarr.indexOf(obj.from) === -1 && $(".guideChatBox").length >= Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth())){
					console.log('fix later');
				}
			}
			else{
				if($(".guideChatBox").length < Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth())){
					$("#chatMessenger").css("display", "block");
					appendMessages(obj)
					// var chatWrapDiv = $("<div class='guideChatBox' data-id="+obj.from+"></div>");
					// $("#chatMessenger").append(chatWrapDiv);
					// chatWrapDiv.html(chatTemplate(obj));
					newarr.push(obj.from);
				}
			}
		})
	})

	$(document).on("click", ".panel-heading" ,function(){
			if($(this).next().css("display")==="none"){
				$(this).next().css("display","block");
				$(this).next().next().css("display","block");
			}
			else{
				$(this).next().css("display","none");
				$(this).next().next().css("display","none");
			}
	})

	$(document).on("click", ".chevronButton" ,function(){
			if($(this).closest(".panel-heading").next().css("display")==="none"){
				$(this).closest(".panel-heading").next().css("display","block");
				$(this).closest(".panel-heading").next().next().css("display","block");
			}
			else{
				$(this).closest(".panel-heading").next().css("display","none");
				$(this).closest(".panel-heading").next().next().css("display","none");
			}
	})

	$(document).on("click", ".removeButton" ,function(){
		var guideChatBoxDiv = $(this).closest(".guideChatBox");
		var guideAttrID = guideChatBoxDiv.attr('data-id');
		guideChatBoxDiv.hide();
		// newarr.splice(newarr.indexOf(guideAttrID),1);
	
	})

	// connect the socket.io server
	var socket = io.connect("http://localhost");

	//define socket events

	socket.on('connect', function(){
		console.log("connected")
	});

	// socket.on('disconnect', function(){
	// 	console.log("disconnected")
	// });

	socket.on("message",function(data){
		if($('.guideChatBox[data-id='+data.from+']').length < 1){
			$("#chatMessenger").css("display", "block");
			appendMessages(data);
			getIncomingMessage(data);
			$('.chatBody').scrollTop($('.chat').height());
			newarr.push(data.from);
		}
		else{
			getIncomingMessage(data);
			$('.chatBody').scrollTop($('.chat').height());
			newarr.push(data.from);
		}
		// $('.chatWindow[data-id='+data.from+']').find('.chat').append(incomingTemplate(data));
		// $(".chat").append(outgoingTemplate({name: data.name, message: data.message, from: data.targetID}));
	});

	function appendMessages(data){
		var chatWrapDiv = $("<div class='guideChatBox' data-id="+data.from+"></div>");
		$("#chatMessenger").append(chatWrapDiv);
		chatWrapDiv.html(chatTemplate(data));
		// console.log(data);
	}

	function getIncomingMessage(data){
		// if (allMessages.length > 0) {
		// 	for (var i = 0; i < allMessages.length; i++) {
		// 		data.timestamp = moment(data.timestamp).format('MMM D, h:mm a');
		// 		$('.guideChatBox[data-id='+allMessages[i].from._id+']').find('.chat').append(incomingTemplate({timestamp:allMessages[i].time , from: allMessages[i].from._id, message: allMessages[i].message, image: allMessages[i].from.picture, name: allMessages[i].from.firstName}));
		// 	};
		// }
		// else{
			data.timestamp = moment(data.timestamp).format('MMM D, h:mm a');
			$('.guideChatBox[data-id='+data.from+']').find('.chat').append(incomingTemplate(data));
		// }
	}

	$(document).on('keyup', ".messageBox", function(e){
		if(e.keyCode === 13){
			var guideChatID = $(this).closest('.guideChatBox').attr("data-id");
			var guideID = guidesData.filter(function(guides){
				return guides._id === guideChatID;
			})
			// var targetID = $(this).closest('.chatWindow').attr("data-id");
			var message = $(this).val();
			var name = guideID[0].firstName;
			var picture = guideID[0].picture;
			var timestamp = moment().format('MMM D, h:mm a YYYY');
			socket.emit('message',{message: message, timestamp: timestamp, name: touristData.name, from: touristData._id, image: touristData.picture, to:guideID[0]._id});
			$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({timestamp: moment(timestamp).format('MMM D, h:mm a'), name: touristData.firstName, message: message, image: touristData.picture}));
			$('.chatBody').scrollTop($('.chat').height());
			message = $(this).val("");
		}
	});

	$(document).on("click", ".btn-chat" ,function(){
		var guideChatID = $(this).closest('.guideChatBox').attr("data-id");
		var guideID = guidesData.filter(function(guides){
			return guides._id === guideChatID;
		})
		// console.log(guideID);
		// var targetID = $(this).closest('.chatWindow').attr("data-id");
		var message = $(this).closest('.chatWindow').find(".messageBox").val();
		var name = guideID[0].firstName;
		var picture = guideID[0].picture;
		var timestamp = moment().format('MMM D, h:mm a YYYY');
		socket.emit('message',{message: message, timestamp: timestamp, name: touristData.name, from: touristData._id, image: touristData.picture, to:guideID[0]._id});
		$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({timestamp: moment(timestamp).format('MMM D, h:mm a'), name: touristData.firstName, message: message, image: touristData.picture}));
		$('.chatBody').scrollTop($('.chat').height());
		message = $(this).closest('.chatWindow').find(".messageBox").val("");
	});

	for (var i = 0; i < falseMessages.length; i++) {
		if($('.guideChatBox[data-id='+falseMessages[i].from._id+']').length < 1){
			$("#chatMessenger").css("display", "block");
			appendMessages({name:falseMessages[i].from.name, to: falseMessages[i].to, from: falseMessages[i].from._id});
			getIncomingMessage({timestamp:falseMessages[i].time , from: falseMessages[i].from._id, message: falseMessages[i].message, image: falseMessages[i].from.picture, name: falseMessages[i].from.firstName});
			$('.chatBody').scrollTop($('.chat').height());
			newarr.push(falseMessages[i].from._id);
		}
		else{
			getIncomingMessage({timestamp:falseMessages[i].time , from: falseMessages[i].from._id, message: falseMessages[i].message, image: falseMessages[i].from.picture, name: falseMessages[i].from.firstName});
			$('.chatBody').scrollTop($('.chat').height());
			newarr.push(falseMessages[i].from._id);
		}
	};

})	


