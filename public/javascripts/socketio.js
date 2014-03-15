// $(function(){
// 	// connect the socket.io server
// 	var socket = io.connect("http://localhost");

// 	//define socket events

// 	socket.on('connect', function(){
// 	});

// 	socket.on("message",function(data){
// 		appendMessage(data)
// 		$("#room").append("<div>"+data.name+": "+ data.message);
// 	});
	

// 	$("#btn-input").on('keyup', function(e){
// 		if(e.keyCode === 13){
// 			var message = $(this).val();
// 			socket.emit('message',{message: message, name: user.firstName});
// 			message = $(this).val("");
// 		}
// 	});

// 	$("#btn-chat").on('click', function(e){
// 		var message = $(this).val();
// 		socket.emit('message',{message: message, name: user.firstName});
// 		message = $(this).val("");
// 	});

// 	function appendMessage(data){
// 		<li class="right clearfix"><span class="chat-img pull-right">
//           <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" /></span>
//           <div class="chat-body clearfix">
//               <div class="header">
//                   <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small>
//                   <strong class="pull-right primary-font">{{user.firstName}}</strong>
//               </div>
//               <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
//                   dolor, quis ullamcorper ligula sodales.
//               </p>
//           </div>
//       </li>
// 	}

// });
