// This code only runs on the server
Meteor.publish("messages", function () {
  return Messages.find({});//{}, {sort: {createdAt: 1}}, {limit : 5});
});

Meteor.publish("rooms", function () {
  return Rooms.find({});//{}, {sort: {createdAt: 1}}, {limit : 5});
});
