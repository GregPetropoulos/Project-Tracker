//set up moment

var timeDisplayEl = $('#time-display');
var dueDateInputEl = $('#due-date-input');
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var hourlyRateInputEl = $('#hourly-rate-input');
var projectFormEl = $('#project-form');
var projectDisplayEl = $('#project-display');
var projectModalEl= $('#project-modal');


// Set up moment for jumbotron
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}
setInterval(displayTime, 1000);

//set up for calendar drop down in modal using jQuery UI Modal
dueDateInputEl.datepicker({ minDate: 1 });




//handles the form submit event
function handleProjectFormSubmit(event) {
    event.preventDefault();
    //gets values from user input
    var projectName = projectNameInputEl.val().trim();
    var projectType = projectTypeInputEl.val().trim();
    var hourlyRate = hourlyRateInputEl.val().trim();
    var dueDate = dueDateInputEl.val().trim();

    //This is the row generated , I am creating elements below the static row

    var projectRowEl = $('<tr>')//table row

    var projectNameTdEl = $('<td>').addClass('p-2').text(projectName); //table column with chain of adding padding 2 and value of variable 
    var projectTypeTdEl = $('<td>').addClass('p-2').text(projectType);
    var hourlyRateTdEl = $('<td>').addClass('p-2').text(hourlyRate);
    var dueDateTdEl = $('<td>').addClass('p-2').text(dueDate);

    //days until due date using moment in the ui
    //moment takes in the due date and formats it , diff takes in two arguments (moment is the default of computers current time, and the measurement of days
    var daysToDueDate = moment(dueDate, 'MM/DD/YYYY').diff(moment(), 'days');

    //created an element in the table column for days left
    var daysLeftTdEl = $('<td>').addClass('p-2').text
        (daysToDueDate);

    //take hourly rate x 8 hours a day x number of days it takes
    var totalEarnings = hourlyRate * 8 * daysToDueDate;
    var totalTdEl = $('<td>').addClass('p-2').text('$' + totalEarnings);

    //create a delete project button
    var deleteProjectBtn = $('<td>').addClass('p-2 delete-project-btn text-center').text('X');

//append everything to the table row
projectRowEl.append(projectNameTdEl, projectTypeTdEl, hourlyRateTdEl, dueDateTdEl, daysLeftTdEl, totalTdEl, deleteProjectBtn);

//need to append project row to table body
projectDisplayEl.append(projectRowEl);

//need a way to close modal
projectModalEl.modal('hide');

//need a way to reset the from
projectFormEl[0].reset();

}

//This function will take the click event
function handleDeleteProject(event) {
    //tell jquery to select the exact thing I clicked on
    var btnClicked = $(event.target);
//Looking for the parent of the tr to be removed using dom traverse
    btnClicked.parent('tr').remove();
}

//need to call the function and form submit
projectFormEl.on('submit', handleProjectFormSubmit);

//need a way to actuate the delete button, event delegation within the event, cant have a click to button that doesn't exist yet so had to add a click to the container 
//this is a click event listener
projectDisplayEl.on('click', '.delete-project-btn', handleDeleteProject);
