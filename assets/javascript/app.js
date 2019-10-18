var firebaseConfig = {
    apiKey: "AIzaSyDMtqhXJy3ITCmOMqqC3hvfSVyVZUI2exw",
    authDomain: "train-schedule-268a3.firebaseapp.com",
    databaseURL: "https://train-schedule-268a3.firebaseio.com",
    projectId: "train-schedule-268a3",
    storageBucket: "train-schedule-268a3.appspot.com",
    messagingSenderId: "795979533913",
    appId: "1:795979533913:web:3953dec631ef15ef522b48",
    measurementId: "G-PE94B86XSG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name = "";
var destination = "";
// needs to be a number and the input 
var firstTrain = parseInt("");
var frequency = 0;
var nextTrain = 0;
var minAway = 0;


$("#frequency-input").keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});


$("#submit-button").on("click", function () {
    console.log("clicked");
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#dest-input").val().trim();;
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();






    console.log(moment(firstTrain, "HH:mm A"));
    var timeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(timeConverted);

    var currentTime = moment();
    console.log("current time  " + currentTime.format("HH:mm A"))

    var diffTime = moment().diff(moment(timeConverted))
    console.log("time difference  " + diffTime);

    var remainTime = diffTime % frequency;
    console.log("remaining time  " + remainTime);

    var minutesTillTrain = frequency - remainTime;
    console.log("min till train  " + minutesTillTrain);

    nextTrain = moment().add(remainTime, "minutes");
    console.log(moment(nextTrain).format("hh:mm A"));

    var trainArrive = moment(nextTrain).format("hh:mm A");


    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minutesTillTrain: minutesTillTrain,
        trainArrive: trainArrive,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

});



database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {


    $("#info").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination
        + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().trainArrive
        + "</td><td>" + childSnapshot.val().minutesTillTrain + "</td></tr>");


}, function (errorObjects) {
    console.log("Error " + errorObjects.code)
});



