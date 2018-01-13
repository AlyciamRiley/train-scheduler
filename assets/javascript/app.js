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
//fvar minutesAway = 0;


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
        var newTrain = {
      
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            trainFrequency: trainFrequency,
            
            };
          database.ref().push(newTrain);

        
        $("#input-train-name").val("");
        $("#input-destination").val("");
        $("#firstTrainTime").val("");
        $("#input-train-frequency").val("")
      
    });
     
    database.ref().on("child_added", function(snapshot) {
        
        var trainName = snapshot.val().trainName;
        var desitnation = snapshot.val().destination; 
        var firstTrainTime = snapshot.val().firstTrainTime;
        var trainFrequency = snapshot.val().trainFrequency;
        
        console.log(snapshot.val());
        console.log(snapshot.val().trainName),
        console.log(snapshot.val().destination),
        console.log(snapshot.val().firstTrainTime),
        console.log(snapshot.val().trainFrequency),
        console.log(snapshot.val().minutesAway)
        
        //change the HTML to reflect
        
        
        //calculate minutes away
        var minutesAway = moment().endOf('')
        
        var markup = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + trainFrequency + "</td><td>" + minutesAway+ "</td></tr>";
        $("#trains").prepend(markup);

        console.log(markup);


        
        
    });
});
