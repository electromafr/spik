Session.set("resize", null);

Meteor.startup(function() {
  Session.set('all_data_loaded', false);
  Session.set('rooms_data_loaded', false);
  Session.set('messages_data_loaded', false);

  // If the background's seed is not initialised, we give it the value 11 (good looking bg ;)
  if (!Session.get("seedBg")) {
    var seedBg = 11;
    Session.set("seedBg", seedBg);
  }

  // Listens when the window is resized and updates a session variable
  // Useful to trigger a bg resizing elsewhere
  window.addEventListener('resize', function(){
    Session.set("resize", new Date());
  });

});
