var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

function User(data){
    this.userName = data.name;
    this.userMailID = data.emailID;
    this.available = data.status;

    this.getUserInfo =  function(){
        return "userName: " + this.username + " emailID:" + this.userMailID + " available: " + this.available;
    };

}

function Room(data, host){
    this.users = new Array();
    this.count = 1; // Host is present
    this.roomName = data.name;
    this.roomID = roomIDGen++;
    this.desc = data.desc;
    this.host = host;

    this.addUser = function(data){
        console.log(data);
        this.users.push(data);
        this.count++;
    };
}

var roomIDGen = 0;
var usersList = new Array();
var roomsList = new Array();

module.exports = {

    addUser : function(userData){
        console.log("dao.addUser("+userData+") entry");
        var user = new User(userData);
        usersList.push(user);
        console.log(user);
        console.log("dao.addUser() exit");
        return user;
    },

    getAllRooms : function(){
        console.log("dao.getAllRooms() entry");
        console.log("dao.getAllRooms() exit");
        return roomsList;
    },

    addRoom : function(roomData, host){
        console.log("dao.addRoom() entry");
        var room = new Room(roomData, host);
        console.log(room);
        roomsList.push(room);
        console.log("dao.addRoom() exit");
        return roomsList;
    },

    joinRoom : function(data){
        console.log("dao.joinRoom() entry");
        console.log(data);
        var room = null;
        var isFound = false;
        $(roomsList).each(function(key, value) {
            if(data.roomID == key){
                console.log("room found");
                isFound = true;
                room = $(roomsList).get(key);
                console.log(room);
            }
        });
        if(isFound){
            console.log(room.host);
            console.log(data.user);
            if(room.host.userMailID == data.user.userMailID){
                console.log("Host is already present");
            }else{
                room.addUser(data.user);
                console.log("User is added");
            }    
        }else{
            console.log("Room not found");
        }   
        
        console.log("dao.joinRoom() exit");
        return room;
    }

};