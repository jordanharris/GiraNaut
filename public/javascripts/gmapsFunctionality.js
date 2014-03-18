$(function(){
	var obj;
	var guideChat = $('#guideChatMessenger').html();
	var chatTemplate = Handlebars.compile(guideChat);
	var incomingMessage = $('#incomingMessage').html();
	var incomingTemplate = Handlebars.compile(incomingMessage);
	var outgoingMessage = $('#outgoingMessage').html();
	var outgoingTemplate = Handlebars.compile(outgoingMessage);
	var newarr = [];

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
				   "to": $this.attr("data-id"),
				   "userData": data,
				   "from": data._id,
				  };
			if(newarr.length > 0 ){
				if(newarr.indexOf(obj.to) !== -1){
					$('.guideChatBox[data-id='+obj.to+']').show();
					// $("#"+obj.name.split(" ").join("")+"").find(".panel-heading").next().next().css("display","block");
				}
				else if(newarr.indexOf(obj.to) === -1 && $(".guideChatBox").length < Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth()) ){
					$("#chatMessenger").css("display", "block");
					var chatWrapDiv = $("<div class='guideChatBox' data-id="+obj.to+"></div>");
					$("#chatMessenger").append(chatWrapDiv);
					chatWrapDiv.html(chatTemplate(obj));
					newarr.push(obj.to);
				}
				else if(newarr.indexOf(obj.to) === -1 && $(".guideChatBox").length >= Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth())){
					console.log('fix later');
				}
			}
			else{
				if($(".guideChatBox").length < Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth())){
					$("#chatMessenger").css("display", "block");
					var chatWrapDiv = $("<div class='guideChatBox' data-id="+obj.to+"></div>");
					$("#chatMessenger").append(chatWrapDiv);
					chatWrapDiv.html(chatTemplate(obj));
					newarr.push(obj.to);
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
	}

	function getIncomingMessage(data){
		$('.guideChatBox[data-id='+data.from+']').find('.chat').append(incomingTemplate(data));
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
			socket.emit('message',{message: message, name: touristData.firstName, from: touristData._id, image: touristData.picture, to:guideID[0]._id});
			$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({name: touristData.firstName, message: message, image: touristData.picture}));
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
		socket.emit('message',{message: message, name: touristData.firstName, from: touristData._id, image: touristData.picture, to:guideID[0]._id});
		$(this).closest(".chatWindow").find(".chat").append(outgoingTemplate({name: touristData.firstName, message: message, image: touristData.picture}));
		$('.chatBody').scrollTop($('.chat').height());
		message = $(this).closest('.chatWindow').find(".messageBox").val("");
	})

})	


