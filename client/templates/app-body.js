Template.appBody.onRendered(function(){
  setUpTriangleBg();
});

Template.appBody.helpers({
  // When resize (session variable containing a date) is updated, it launch the
  // updating bg function
  resized: function(){
    setUpTriangleBg();
    return Session.get('resize');
  }
});
