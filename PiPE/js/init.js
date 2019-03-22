var userAuth;
var passAuth;

// Check for valid user login 
$(document).ready(function () {

  // check if current session is active
  if (sessionStorage.getItem("userAuth") && sessionStorage.getItem("passAuth")) {
    $.getJSON("../JSON/credentials.json", function(data){
        var html = '<p>Name: ' + data.username + '<br>'
      + 'D.O.B: ' + data.password + '<br>'
      + 'Blood Type: ' + data.blood + '<br>'
      + 'Family Members: ' + data.family + '<br>'
      + 'Occupation: ' + data.occupation + '<br>'
      + 'Medical History: ' + data.occupation + '<br>'
      + 'Symptoms: ' + data.symptoms + '<br>';

      $(".info").html(html);
    });
    return false;
  }

  // Set timeout function that ch
  var id = '#dialog';

  //transition effect
  $('#mask').fadeIn(700);
  $('#mask').fadeTo("fast", 0.8);

  //transition effect
  $(id).fadeIn(700);

  $(".login-form").click(function(){
    $(".log-in").show();
    $(".sign-up").hide();
  });
  
  $(".signup-form").click(function(){
    $(".log-in").hide();
    $(".sign-up").show();
  });

  // Retrieve credentials
  $.getJSON("../JSON/credentials.json", function(data){
    userAuth = data.username;
    passAuth = data.password;
  });

  //if close button is clicked
  $('.close').click(function (e) {
    
    var name = $("#login_name").val();
    var DOB = $("#login_dob").val();
    var Btype = $("#login_blood").val();
    var Family = $("#login_family").val();
    var Job = $("#login_occupation").val();
    var Medical = $("#login_medical").val();
    var Symptoms = $("#login_symptoms").val();
    var username = $("#login_username").val();
    var password = $("#login_password").val();

    // check if login or signup
    if ($(this).hasClass("signup")) {
      if (name == "" || DOB == "" ||
        Btype == "" || Family == "" ||
        Job == "" || Medical == "" || 
        Symptoms == "" ) {
        alert("Invalid login: missing field.");
        return false;
      }
    }
    else {
      if (username == "" || password == "") {
        alert("Invalid login: missing field.");
        return false;
      }
    }

    // store cookies or check cookies
    if ($(this).hasClass("signup")) {

      // Create json variables
      var user1 = {};
      user1["username"] = name;
      user1["password"] = DOB;
      user1["blood"] = Btype;
      user1["family"] = Family;
      user1["occupation"] = Job;
      user1["medical"] = Medical;
      user1["symptoms"] = Symptoms;

      var myJSON = {users : user1};

      $.post("../php/save_data.php", myJSON, function(data) {
          alert("Thank you for registering!");
      })
    }
    else {
      // check invalid login
      if (username != userAuth || password != passAuth) {
        alert("Invalid login: Incorrect Username/Password.");
        return false;
      }
    }

    $.getJSON("../JSON/credentials.json", function(data){
        var html = '<p>Name: ' + data.username + '<br>'
      + 'D.O.B: ' + data.password + '<br>'
      + 'Blood Type: ' + data.blood + '<br>'
      + 'Family Members: ' + data.family + '<br>'
      + 'Occupation: ' + data.occupation + '<br>'
      + 'Medical History: ' + data.occupation + '<br>'
      + 'Symptoms: ' + data.symptoms + '<br>';

      $(".info").html(html);
    });

    //Cancel the link behavior
    e.preventDefault();

    $('#mask').hide();
    $('.window').hide();

    // Store user session
    sessionStorage.setItem("userAuth", username);
    sessionStorage.setItem("passAuth", password);
  });
});

$(window).on("load", function () {
  $(window).scroll(function () {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function () {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + $(this).outerHeight();

      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < (windowBottom - 80)) { //object comes into view (scrolling down)
        if ($(this).css("opacity") == 0) {
          $(this).animate({ opacity: 1 }, { duration: 100, queue: false });
          $(this).animate({ "margin-top": "10px" }, { duration: 500, queue: false });
        }
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
