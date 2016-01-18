Rooms = new Mongo.Collection("rooms");

Meteor.methods({
 addRoom: function (urlField) {

   urlField = urlField.toLowerCase();

   // if urlField requested, Checks if the urlField not already exists in another room
   if(urlField){
     var room = Rooms.findOne({urlField: urlField});
     if(room){
       throw new Meteor.Error("roomNameAlreadyExists", "This room name already exists.");
     }
   }

   // Insert a room into the collection
   return Rooms.insert({
     urlField: urlField,
     createdAt: new Date() // current time
   });

 },


 deleteRoom: function (roomId) {
   Rooms.remove(roomId);
 },


 addUrlField: function (roomId, urlField) {
   //Checks the arguments
   if (! roomId) {
     throw new Meteor.Error("roomIdNeeded", "User must give a room ID");
   }
   if (! urlField) {
     throw new Meteor.Error("urlFieldNeeded", "User must give a urlField");
   }

   // Checks if room urlField is not already set for this room
   var room = Rooms.findOne({_id: roomId});
   if(room && room.urlField){
     throw new Meteor.Error("urlFieldAlreadyExists", "Room already has a Name");
   }

   // Checks if the urlField not already exists in another room
   room = Rooms.findOne({urlField: urlField});
   if(room){
      throw new Meteor.Error("roomNameAlreadyExists", "This room name already exists.");
   }

   // Set urlField
   Rooms.update(roomId, {urlField: urlField});
 },

 addSeedBg: function (roomId, seed) {

   //Checks the arguments
   if (! roomId) {
     throw new Meteor.Error("roomIdNeeded", "User must give a room ID");
   }
   if (! seed) {
     throw new Meteor.Error("seedNeeded", "User must give a seed");
   }

   // Set seedBg
   Rooms.update(roomId, {
     $set : {seedBg: seed}
   });
 }
});
