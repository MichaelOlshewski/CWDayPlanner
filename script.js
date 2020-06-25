// Load Script once page has loaded and is ready
$(document).ready(function() {
    
    // Variables
    const production = false;
    var timeOfDay = moment().format("k");
    var mornOrNight = moment().format("A");
    var minuteOfHour = moment().format("m");
    var timeTilNextHour = 60 - minuteOfHour;
    var milleseconds = timeTilNextHour * 60 * 1000;
    var agendaItems = [];
    var storage = localStorage.getItem("storedAgendaItems");


    /* if (!production) {
        timeOfDay = 12;
    } */

    // Onclick listeners
    $(".saveBtn").on("click", saveToLocalStorage);


    $(".description").each(function() {
        if($(this).attr('data-time') < timeOfDay) {
            $(this).addClass("past");
        }
        if($(this).attr('data-time') == timeOfDay) {
            $(this).addClass("present");
        }
        if($(this).attr('data-time') > timeOfDay) {
            $(this).addClass("future");
        }

    })
    
    function saveToLocalStorage() {
        console.log($(this).attr('data-id'))
        console.log($(this).prev().children().text());
    }

    if (!production) {
        console.log("Current Time: " + timeOfDay + " " + mornOrNight)
        console.log("Minute of Hour: " + minuteOfHour);
        console.log("Minutes until next hour: " + timeTilNextHour);
        console.log(localStorage)
    }

});
