//set up moment
function displayUpdatingTime(){
    var timeDisplay = moment().format('MMMM Do YYYY, h:mm:ss a');
    $('#time-display').text(timeDisplay)
}
setInterval(displayUpdatingTime, 1000);

//set up cards

//set up table 
