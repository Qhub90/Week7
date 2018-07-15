var config = {
    apiKey: "AIzaSyC8uV5_ltjHqxIcq9gPNbjr9a0dulUL9bQ",
    authDomain: "train-times-71bde.firebaseapp.com",
    databaseURL: "https://train-times-71bde.firebaseio.com",
    projectId: "train-times-71bde",
    storageBucket: "train-times-71bde.appspot.com",
    messagingSenderId: "480473188325"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainName="";
var trainDest="";
var trainTime="";
var trainFreq="";


$("#submit-info").on("click", function(event) 
    {
    event.preventDefault();
  
    // Get the input values
    trainName = $("#trainName").val().trim();
    trainDest = $("#trainDest").val().trim();
    trainTime = $("#trainTime").val().trim();
    trainFreq = $("#trainFreq").val().trim();
   
    database.ref().push( {
        
        name: trainName,
        destination: trainDest,
        start: trainTime,
        frequency: trainFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#trainName").html("");
        $("#trainDest").html("");
        $("#trainTime").html("");
        $("#trainFreq").html("");
    } );


    
    database.ref().on("child_added", function(childSnapshot) {
        var tFrequency =(childSnapshot.val().frequency);
        var firstTime = (childSnapshot.val().start);        
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm A");


        var tableRow = $("<tr>");

        var tableName = $("<td>").text(childSnapshot.val().name);

          tableRow.append(tableName);

        var tableDes = $("<td>").text(childSnapshot.val().destination);

          tableRow.append(tableDes);

        var tableStart = $("<td>").text(childSnapshot.val().frequency);

          tableRow.append(tableStart);

        var tableNext = $("<td>").text(nextTrain);

          tableRow.append(tableNext);


        var tableMin = $("<td>").text(tMinutesTillTrain);

          tableRow.append(tableMin);
        
         $("#data").append(tableRow);
       
    });