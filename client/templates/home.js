Template.home.helpers({
  errorMessage: function(){
    return Session.get("errorMessage");
  }
});

Template.home.events({
  "submit .urlForm": function (event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form elements
    var urlField = event.target.urlField.value;

    // Insert a task into the collection et open the room
    Meteor.call("addRoom", urlField, function(error, result){

      urlField = urlField.toLowerCase();

      if (error) {
        if(error.error = "roomNameAlreadyExists")
          Session.set("errorMessage", error.reason);
        else {
          Session.set("errorMessage", "Unknown Error.")
        }
      }
      else {
        $(".splash").removeClass("fadeInUp");
        $(".splash").addClass("fadeOutUp");
        urlField ? FlowRouter.go('/room/' + urlField + '') : FlowRouter.go('/room/' + result + '');
      }
    });
  },

});
