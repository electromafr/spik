Session.set("formStep", 0);
Session.set("userName", "");


Template.miniChat.helpers({
  room: function () {
    return getRoomFromUrlParam();
  },
  messages: function () {
    var messages = [];
    var room = getRoomFromUrlParam();
    if (room) {
      messages = Messages.find({roomId : room._id}, {sort: {createdAt: 1}});
    }
    Session.set('messages', messages);
    return messages;
  },
  errorMessage: function(){
    return Session.get("errorMessage");
  },
  formStep: function(){
    return Session.get("formStep");
  },
  userName: function(){
    return Session.get("userName");
  }
});

Template.miniChat.events({
  "click .footer .begin": function (event) {
    Session.set("formStep", 1);
  },

  "keyup #userField": function(event) {
    Session.set("userName", event.target.value);
  },

  "submit .form-user": function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // If an userName is gave, access to step 2
    if(Session.get("userName") != "")
      Session.set("formStep", 2);
  },

  "submit .form-message": function (event) {

    // Prevent default browser form submit
    event.preventDefault();

    var room = getRoomFromUrlParam();

    // Get value from form elements
    var text = event.target.messagefield.value;
    var user = Session.get("userName");

    // Method calling to update message into the collection
    Meteor.call("addMessage", user, text, room._id);

    // Clear form
    event.target.messagefield.value = "";
  },

  "submit .new-room-url-field": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    var room = getRoomFromUrlParam();

    // Get value from form elements
    var urlField = event.target.urlField.value;

    // Method calling to update room into the collection
    Meteor.call("addUrlField", room._id, urlField, function(error, result){
      if (error)
       if(error.error)
         Session.set("errorMessage", error.reason);
       else {
         Session.set("errorMessage", "Unknown Error.")
       }
      });

  },
  "click .btn-change-bg": function(){
    var seedBg = generateSeed();
    Session.set("seedBg", seedBg);
    setUpTriangleBg();
  }
});

Template.miniChat.onCreated(function (){
  var self = this;
  self.autorun(function() {

    // Get the room from the url and rewrite it if an urlfield exists
    room = getRoomFromUrlParam();

    if(room && room.urlField) {
      FlowRouter.setParams({roomId: room.urlField});
    }

    self.subscribe('rooms');
    self.subscribe('messages');
  });
});



Template.miniChat.onRendered(function (){
  var self = this;

  self.autorun(function() {

    // messages is the reactive data source
    var messages = Session.get('messages');

    // Scroll to bottom
    scrollToBottom();
  });
});
