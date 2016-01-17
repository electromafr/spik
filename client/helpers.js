/////////////////////
// Template Helpers//
/////////////////////

//Date formating to DD-MM-YYYY
//Useful for showing messages date
Template.registerHelper("formatDate", function(timestamp) {
    return moment(timestamp).format('DD-MM-YYYY');
});

//Give the entire URL of the name of a picture located in /images/cats folder
//Useful to show random pictures
Template.registerHelper("findPic", function(name) {
    return '/images/cats/' + textToNumber(name) + '.jpg';
});

//Return true if the 2 parameters are equals
Template.registerHelper('equals', function (a, b) {
    return a === b;
});





////////////////////
// Utils functions//
////////////////////

// Get a string and give an int related to it
// Useful to generate a picture from the user name
textToNumber = function(txt){
    var res = 0;
    txt = txt.toLowerCase();
    for(var i = 0; i< txt.length; i++){
      res  = res + 'abcdefghijklmnopqrstuvwxyz'.indexOf(txt[i])+1
    }
    return res%100;
}

// Get the name or id and give the id
// Useful to get the id of the room from the URL (the url can be the id or the room name)
getRoomFromUrlParam = function() {
  var roomId = FlowRouter.getParam('roomId');
  return Rooms.findOne({urlField: roomId}) || Rooms.findOne({_id: roomId});
}





/////////////////////
// JQuery functions//
/////////////////////

//Scroll to the bottom of the chat
//Useful at conversation rendering or message adding
scrollToBottom = function() {
  var height = 0;
  $('.messages-list .message').each(function(i, value){
    height += parseInt($(this).height());
  });
  height += '';
  $('.messages-list').animate({scrollTop: height});
}





/////////////////////////////////
// Background related functions//
/////////////////////////////////

// Useful to generate the background pattern
generatePattern = function(seed, width, height) {
  var pattern = Trianglify({
      width: width,
      height: height,
      seed: seed
  });
  return pattern;
}

// Takes the seed, the wdth, the heigt, call generatePattern and put it in the background
setUpTriangleBg = function() {
  var seedBg = Session.get('seedBg');
  var width = $(window).width();
  var height = $(window).height();

  $('.triangle-bg').addClass("fadeOut");
  $('.triangle-bg').empty();
  $('.triangle-bg').append(generatePattern(seedBg, width, height).canvas());
  $('.triangle-bg').removeClass("fadeOut");
  $('.triangle-bg').addClass("fadeIn");
}

// Generates a seed number between 0 and 1000 to generate a random pattern
generateSeed = function() {
  var seedBgRMax = 1000;
  var seedBgRMin = 0;
  var seedBg = Math.floor(Math.random() * (seedBgRMax - seedBgRMin)) + seedBgRMin;
  return seedBg;
}
