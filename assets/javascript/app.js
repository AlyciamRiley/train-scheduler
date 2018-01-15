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
    var destination = 0;
    var firstTrainTime = 0;
    var firstTimeConverted = 0;
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

    database.ref().on("child_added", function (snapshot) {

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


        //Make sure it is displaying correctly...
        firstTrainConverted = moment(firstTrainTime, "HH:mm").format("HH:mm");
        console.log("The first train time is " + firstTrainConverted);


        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("What is difftime? " + diffTime);

        var tRemainder = diffTime % trainFrequency;
        console.log("What is tRemainder?" + tRemainder);

        minutesAway = trainFrequency - tRemainder;
        console.log("What is minutes away?" + minutesAway);

        var nextArrival = moment().add(minutesAway, "minutes");
        console.log("The next train arrives at " + nextArrival);

        var nextArrivalFormatted = moment(nextArrival).format("hh:mm");
        console.log("The next train arrives at " + nextArrivalFormatted);




        var markup = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"  + trainFrequency + "</td><td>" +  nextArrivalFormatted + "</td><td>" + minutesAway + "</td></tr>";
        $("#trains").prepend(markup);




    });
});
