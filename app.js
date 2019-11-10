// Steps to complete:


// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCyIEVutqdBs5CKSQ4hBFVX4dt8VYaMh0c",
  authDomain: "trainscheduler-c988a.firebaseapp.com",
  databaseURL: "https://trainscheduler-c988a.firebaseio.com",
  projectId: "trainscheduler-c988a",
  storageBucket: "trainscheduler-c988a.appspot.com",
  messagingSenderId: "450233946708",
  appId: "1:450233946708:web:03f9fb9c0fd057d4f653c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var train = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  //the following line has problem
  var firstTrainTime = moment($("#first-train-input").val().trim(), "hh:mm:ss").format("hh:mm:ss");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    trainName: train,
    destnationName: destination,
    firstTrain: firstTrainTime,
    frequencyMinutes: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destnationName);
  // console.log(newTrain.start);
  console.log("this is firstTrain: " + newTrain.firstTrain);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding a new train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var train = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destnationName;
  var firstTrainTime = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequencyMinutes;

  // Employee Info
  console.log(train);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  //start from here next time
  // Prettify the employee start
  // var empStartPretty = moment.unix(firstTrain).format("MM/DD/YYYY");


  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
  $("<td>").text(train),
  $("<td>").text(destination),
  $("<td>").text(firstTrainTime),
  $("<td>").text(frequency)
  //$("<td>").text(empRate),
  //$("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
