FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("appBody", {area: "home"});
  }
});

FlowRouter.route('/room/:roomId', {
  action: function(params) {
    BlazeLayout.render("appBody", {area: "miniChat"});
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("appBody", {area: "notFound"});
  }
}
