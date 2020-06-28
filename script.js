// Load Script once page has loaded and is ready
$(document).ready(function() {

    var workDay = [
        {
            id: "0",
            hour: "9",
            militaryTime: "9",
            amPM: "am",
            agendaItem: ""
        },
        {
            id: "1",
            hour: "10",
            militaryTime: "10",
            amPM: "am",
            agendaItem: ""
        },
        {
            id: "2",
            hour: "11",
            militaryTime: "11",
            amPM: "am",
            agendaItem: ""
        },
        {
            id: "3",
            hour: "12",
            militaryTime: "12",
            amPM: "pm",
            agendaItem: ""
        },
        {
            id: "4",
            hour: "1",
            militaryTime: "13",
            amPM: "pm",
            agendaItem: ""
        },
        {
            id: "5",
            hour: "2",
            militaryTime: "14",
            amPM: "pm",
            agendaItem: ""
        },
        {
            id: "6",
            hour: "3",
            militaryTime: "15",
            amPM: "pm",
            agendaItem: ""
        },
        {
            id: "7",
            hour: "4",
            militaryTime: "16",
            amPM: "pm",
            agendaItem: ""
        },
        {
            id: "8",
            hour: "5",
            militaryTime: "17",
            amPM: "pm",
            agendaItem: ""
        }
    ]
    
    // Variables
    const debugMode = false;
    var currentDay = moment().format("MMMM Do, YYYY");
    var timeOfDay = moment().format("k");
    var mornOrNight = moment().format("A");
    var minuteOfHour = moment().format("m");
    var timeTilNextHour = 60 - minuteOfHour;
    var milleseconds = timeTilNextHour * 60 * 1000;

    timeOfDay = "12";

    // Sets the current day to display on the webpage.
    $("#currentDay").text(currentDay);

    function init() { // Initialize Stored Data
        var storedDay = JSON.parse(localStorage.getItem("workDay"));
        if (storedDay) {
            workDay = storedDay;
        }
        displayAgendaItems();
    };
    
    function displayAgendaItems() { // displayReminders
        workDay.forEach(function(_thisHour) {
            $(`#${_thisHour.id}`).text(_thisHour.agendaItem);
            $("textarea[data-id='" + _thisHour.id + "']").val(_thisHour.agendaItem);
        })
    };

    function saveAgendaItems() { //saveReminders
        localStorage.setItem("workDay", JSON.stringify(workDay));
        console.log(workDay);
    }

    workDay.forEach(function(thisHour) {

        // Creates Table
        var timeTable = $("<table>");
        $(".container").append(timeTable);

        // Creates Time Row
        var timeRow = $("<tr>");
        timeTable.append(timeRow);

        // Creates Agenda Rows
        var timeBlock = $("<td>").addClass("time-block hour");
        var descBlock = $("<td>").addClass("description").attr("data-time", thisHour.hour);
        var saveBlock = $("<td>").addClass("saveBtnContainer");

        var timeTag = thisHour.hour + " " + thisHour.amPM;
        timeBlock.append(timeTag);

        var agendaData = $("<textarea>").attr("data-id", thisHour.id);
        descBlock.append(agendaData);
        
        // Creates Save Button
        var saveButton = $("<i class='far fa-save fa-lg'>");
        var saveAgenda = $("<button>").attr("class", "saveBtn").attr("data-id", thisHour.id);
        saveAgenda.append(saveButton);
        saveBlock.append(saveAgenda);
        timeRow.append(timeBlock, descBlock, saveBlock);

        function updateHourColors() {
            if (parseInt(thisHour.militaryTime) < timeOfDay) {
                descBlock.addClass("past");
            }
            if (parseInt(thisHour.militaryTime) == timeOfDay) {
                descBlock.addClass("present");
            }
            if (parseInt(thisHour.militaryTime) > timeOfDay) {
                descBlock.addClass("future");
            }

            setTimeout(updateHourColors, 60 * 60 * 1000);
        }

        setTimeout(updateHourColors, timeTilNextHour);
    })

    $(document).on("click", ".saveBtn", function(event) {
        workDay[$(this).attr("data-id")].agendaItem = $(this).parent().siblings('.description').children("textarea").val();
        saveAgendaItems();
    });

    // Initializes Page
    init();

    // If debug mode is true, then it console.logs all variables out.
    if (debugMode) {
        console.log("Debug Mode Enabled? " + debugMode)
        console.log("Todays Date: " + currentDay)
        console.log("Current Time: " + timeOfDay + " " + mornOrNight)
        console.log("Minute of Hour: " + minuteOfHour);
        console.log("Minutes until next hour: " + timeTilNextHour);
        console.log("Milleseconds: " + milleseconds);
        console.log(workDay)
        console.log(localStorage)
    }
});
