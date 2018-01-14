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
var firstTimeConverted = "";
var trainFrequency = 0;
var nextArrival = 0;
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
    
        var currentTime = moment().format("HH:mm");
        console.log(currentTime);
        
        //Code for handling push
        var newTrain = {
      
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            trainFrequency: trainFrequency,
            nextArrival: nextArrival,
            
            };
          database.ref().push(newTrain);

        
        $("#input-train-name").val("");
        $("#input-destination").val("");
        $("#firstTrainTime").val("");
        $("#input-train-frequency").val("")
      
    });
     
    database.ref().on("child_added", function(snapshot) {
        
        var trainName = snapshot.val().trainName;
        var destination = snapshot.val().destination; 
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
        //var minutesAway = moment().endOf('')
        //take the first train time...
            //var firstTrainTime
        //Make sure it is displaying correctly...
            // var firstTimeConverted
        //add the frequency...
            // var  nextTrain = firstTimeConverted + trainFrequency 
        //grab current time...
            // var currentTime = moment().format(HH:mm)
        //calculate minutes away...
            //val minutesAway = nextTrain - current time
        
        var markup = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway+ "</td></tr>";
        $("#trains").prepend(markup);

        console.log(markup);


        
        
         /*	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");*/

        
    });
});
