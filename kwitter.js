function addUser(){
    get_username=document.getElementById("user_name").value;
    localStorage.setItem("Username",get_username);
    window.location="kwitter_room.html";
}