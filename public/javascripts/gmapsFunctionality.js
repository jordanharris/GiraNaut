$(function(){
	var obj;
	var guideChat = $('#guideChatMessenger').html();
	var chatTemplate = Handlebars.compile(guideChat);
	var newarr = [];

	//user sidebar toggle class
	$("#menu-toggle").click(function(e) {
	        e.preventDefault();
	        $("#wrapper").toggleClass("active");
	});

	$(document).on("click", ".guideChatButton" ,function(){
		var obj = {"name": $(this).closest(".guideInnerCard").find("h2").text(),
				   "image": $(this).closest(".guideInnerCard").find("img").attr("src")
				  };
		if(newarr.length > 0 ){
			if(newarr.indexOf(obj.name) !== -1){
				$("#"+obj.name.split(" ").join("")+"").find(".panel-heading").next().css("display","block");
				$("#"+obj.name.split(" ").join("")+"").find(".panel-heading").next().next().css("display","block");
			}
			else if(newarr.indexOf(obj.name) === -1 && $(".guideChatBox").length < Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth()) ){
				$("#chatMessenger").css("display", "block");
				var chatWrapDiv = $("<div class='guideChatBox' id="+obj.name.split(" ").join("")+"></div>");
				$("#chatMessenger").append(chatWrapDiv);
				chatWrapDiv.html(chatTemplate(obj));
				newarr.push(obj.name);
			}
			else if(newarr.indexOf(obj.name) === -1 && $(".guideChatBox").length >= Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth())){
				console.log('fix later');
			}
		}
		else{
			if($(".guideChatBox").length < Math.floor($(window).innerWidth()/$(".guideChatBox").innerWidth())){
				$("#chatMessenger").css("display", "block");
				var chatWrapDiv = $("<div class='guideChatBox' id="+obj.name.split(" ").join("")+"></div>");
				$("#chatMessenger").append(chatWrapDiv);
				chatWrapDiv.html(chatTemplate(obj));
				newarr.push(obj.name);
			}
		}
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
		var nameFinder = $.trim(guideChatBoxDiv.find(".panel-heading > span").text());
		guideChatBoxDiv.remove();
		newarr.splice(newarr.indexOf(nameFinder),1);
	
	})











})	


