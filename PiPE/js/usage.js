$(document).ready(function() {
    var dbRef = firebase.database();
    var currentRef= dbRef.ref("current");

    currentRef.once("value").then(function(snap) {
        $(".current-session").append(snap.val()+' s');
    });

    var totalRef= dbRef.ref("total");

    totalRef.once("value").then(function(snap) {
        $(".total-duration").append(snap.val()+' s');
    });
    
    var numRef= dbRef.ref("numSessions");

    numRef.once("value").then(function(snap) {
        $(".total-sessions").append(snap.val());
    });
});