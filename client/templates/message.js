Template.message.helpers({
  myMessage: function () {
    if (Session.get("userName") === this.user)
      return "my-message";
  }
});

Template.message.events({
  "click .delete": function () {
    Meteor.call("deleteMessage", this._id);
  }
});

Template.message.onCreated (function (){
  // Scroll to bottom
  scrollToBottom();
});
