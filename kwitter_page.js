var firebaseConfig = {
      apiKey: "AIzaSyCLGpxZs2pD9mqZCrFwuOI0gYPdRWN5Ksw",
      authDomain: "kwitter-6abca.firebaseapp.com",
      databaseURL: "https://kwitter-6abca-default-rtdb.firebaseio.com",
      projectId: "kwitter-6abca",
      storageBucket: "kwitter-6abca.appspot.com",
      messagingSenderId: "231606977400",
      appId: "1:231606977400:web:d2d2878892c4b97584fe8d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  

    var user_name=localStorage.getItem("user_name");
    var room_name=localStorage.getItem("room_name");

    function send(){
          msg=document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name:user_name,
                message:msg,
                like:0
          });
          document.getElementById("msg").innerHTML="";
          document.getElementById("msg").value="";
    }

    function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name=message_data['name'];
         message=message_data['message'];
         like=message_data['like'];
         name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
         like_button="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>";
         span_with_tag="<span class='glyhpicon glyphicon-thumbs-up'>Likes: "+like+"</span></button><hr>";

         row=name_with_tag+message_with_tag+like_button+span_with_tag;
         document.getElementById("output").innerHTML+=row;
      } });  }); }
getData();

function updateLike(message_id){
      console.log("Clicked on the like button"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updatedlikes=Number(likes)+1;
      console.log(updatedlikes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updatedlikes
      });
}

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location.replace("index.html");
}