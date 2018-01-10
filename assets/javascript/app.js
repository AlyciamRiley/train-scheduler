//Define Global Variables
$(document).ready(function () {

//Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAvRao-Kh91JVY4YgdR5HckZcBqDpZ7W4",
    authDomain: "train-scheduler-3826b.firebaseapp.com",
    databaseURL: "https://train-scheduler-3826b.firebaseio.com",
    projectId: "train-scheduler-3826b",
    storageBucket: "train-scheduler-3826b.appspot.com",
    messagingSenderId: "111413666928"
  };
  firebase.initializeApp(config);
var database = firebase.database();

//initial Values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var trainFrequency = 0;
var minutesAway = 0;


//Capture button click


    $("#trains").on("click", function () {

    });


    $("#add-train").on("click", function (event) {
        event.preventDefault();

        //Grab values from text boxes

        trainName = $("#input-train-name").val().trim();
        destination = $("#input-destination").val().trim();
        firstTrainTime = $("#input-first-train-time").val().trim();
        trainFrequency = $("#input-train-frequency").val().trim();
    


        console.log("submitbtn is working");
        
        //Code for handling push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            trainFrequency: trainFrequency,
           
        });
        
        $("#input-train-name").val("");
        $("#input-destination").val("");
        $("#firstTrainTime").val("");
        $("#input-train-frequency").val("")
      
    });
     
    database.ref().on("value", function(snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().trainName),
        console.log(snapshot.val().destination),
        console.log(snapshot.val().firstTrainTime),
        console.log(snapshot.val().trainFrequency),
        console.log(snapshot.val().minutesAway)
        
        //change the HTML to reflect
        
        var markup = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + trainFrequency + "</td><td>" + minutesAway+ "</td></tr>";
        $("#trains").prepend(markup);

        console.log(markup);


        
        
    });
});
