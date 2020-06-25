// Load Script once page has loaded and is ready
$(document).ready(function() {
    
    // Variables
    const debugMode = true;
    var currentDay = moment().format("MMMM Do, YYYY");
    var timeOfDay = moment().format("k");
    var mornOrNight = moment().format("A");
    var minuteOfHour = moment().format("m");
    var timeTilNextHour = 60 - minuteOfHour;
    var milleseconds = timeTilNextHour * 60 * 1000;
    var agendaItems = [];
    var storage = localStorage.getItem("storedAgendaItems");


    // Sets the current day to display on the webpage.
    $("#currentDay").text(currentDay);


    // Sets the colors on the divs based on the current hour
    $(".description").each(function() {
        if(( parseInt($(this).attr('data-time')) ) < timeOfDay) {
            $(this).addClass("past");
        };
        if(( parseInt($(this).attr('data-time')) ) == timeOfDay) {
            $(this).addClass("present");
        };
        if(( parseInt($(this).attr('data-time')) ) > timeOfDay) {
            $(this).addClass("future");
        };
    });

    // If production mode is false, then it console.logs all variables out.
    if (debugMode) {
        console.log("Debug Mode Enabled? " + debugMode)
        console.log("Todays Date: " + currentDay)
        console.log("Current Time: " + timeOfDay + " " + mornOrNight)
        console.log("Minute of Hour: " + minuteOfHour);
        console.log("Minutes until next hour: " + timeTilNextHour);
        console.log("Milleseconds: " + milleseconds);
        console.log(agendaItems)
        console.log(storage)
    }
});
