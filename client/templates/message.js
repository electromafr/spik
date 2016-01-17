Template.message.events({
  "click .delete": function () {
    Meteor.call("deleteMessage", this._id);
  }
});

Template.message.onCreated (function (){
  // Scroll to bottom
  scrollToBottom();
});
