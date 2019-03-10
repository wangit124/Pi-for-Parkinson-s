$(document).ready(function() {	

  var id = '#dialog';
    
  //Get the screen height and width
  var maskHeight = $(document).height();
  var maskWidth = $(window).width();
    
  //Set heigth and width to mask to fill up the whole screen
  $('#mask').css({'width':maskWidth,'height':maskHeight});
  
  //transition effect
  $('#mask').fadeIn(700);	
  $('#mask').fadeTo("fast",0.8);	
    
  //Get the window height and width
  var winH = $(window).height();
  var winW = $(window).width();
                
  //Set the popup window to center
  $(id).css('top',  winH/2-$(id).height()/2);
  $(id).css('left', winW/2-$(id).width()/2);
    
  //transition effect
  $(id).fadeIn(700); 	
    
  //if close button is clicked
  $('.window .close').click(function (e) {
  //Cancel the link behavior
  e.preventDefault();
  
  $('#mask').hide();
  $('.window').hide();
  });
  
});

$(window).on("load",function() {
  $(window).scroll(function() {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + $(this).outerHeight();
      
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < (windowBottom-80)) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) { $(this).animate({ opacity: 1 }, { duration: 100, queue: false });
          $(this).animate({ "margin-top": "10px" }, { duration: 500, queue: false });}
        }
    });
  }).scroll(); //invoke scroll-handler on page-load
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD9XuaSinw3xkdU-cR9u1lcv7WE8RkSDkM",
  authDomain: "pipe-a7b56.firebaseapp.com",
  databaseURL: "https://pipe-a7b56.firebaseio.com",
  projectId: "pipe-a7b56",
  storageBucket: "pipe-a7b56.appspot.com",
  messagingSenderId: "117373168037"
};
firebase.initializeApp(config);
