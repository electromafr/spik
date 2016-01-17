Messages = new Mongo.Collection("messages");

Meteor.methods({
 addMessage: function (user, text, roomId) {
   // Make sure the user is logged in before inserting a task
   if (! user) {
     throw new Meteor.Error("User must give a name");
   }
   if (! text) {
     throw new Meteor.Error("User must give a text");
   }
   if (! roomId) {
     throw new Meteor.Error("User must give a roomId");
   }

   // Make sure the given room exists
   var room = Rooms.findOne({_id: roomId});
   if (!room) {
     throw new Meteor.Error("User must choose an existing room");
   }


   // Insert a task into the collection
   Messages.insert({
     text: text,
     createdAt: new Date(), // current time
     user: user,
     roomId: roomId
   });
 },
 deleteMessage: function (messageId) {
   Messages.remove(messageId);
 }
});
