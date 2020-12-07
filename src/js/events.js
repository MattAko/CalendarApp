/*
    This JS file is responsible for handling events, such as:
    -Adding new events
    -Showing the add event form
    -Editing events
    -Deleting events
    Written by: Matthew Roberts
*/


/* 
    Show the Add Events Form, this is a toggle
*/
function toggleAddEventForm(){
    document.getElementById('overlay').style.display==='block' ? hideForm() : showForm();

}
function hideForm(){
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none'
    var form = document.getElementById('addEventForm');
    form.parentNode.removeChild(form);
}

function showForm(){
    var overlay = document.getElementById('overlay');
    var container = document.getElementsByClassName('container')[0];

    // Dim background with overlay
    overlay.style.display = 'block'
    // Create form
    var form = document.createElement('form');
    form.id = 'addEventForm';
    form.setAttribute('onSubmit', 'javascript: validateEventForm(event);');
    

    // Create exit button
    var exitFormButton = document.createElement('a');
    exitFormButton.setAttribute( "onClick", "javascript: hideForm();" );
    exitFormButton.href = '#';
    exitFormButton.classList.add('close');
    form.appendChild(exitFormButton);

    // Create input for event name
    var eventNameInput = document.createElement('input');
    eventNameInput.type = 'text';
    eventNameInput.placeholder = 'Event Name';
    eventNameInput.id = 'eventNameInput';
    form.appendChild(eventNameInput);

    // label and input for event date
    var dateInputLabel = document.createElement('dateInputLabel');
    dateInputLabel.innerText = 'Event Date: ';
    dateInputLabel.for = 'eventDate';
    var dateInput = document.createElement('input');
    dateInput.id = 'eventDate'
    dateInput.type = 'date'
    dateInput.min = '2018-01-01'
    dateInput.max = '2021-12-31'
    form.appendChild(dateInputLabel)
    form.appendChild(dateInput);
    
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))
    // Create input for start time
    var startTimeLabel = document.createElement('label');
    startTimeLabel.innerText = 'Start Time: ';
    startTimeLabel.for = 'startTime';
    form.appendChild(startTimeLabel);

    var startTimeSelect = document.createElement('select');
    startTimeSelect.id = 'startTime';
    

    var i = 0;
    var time = 12;
    var ext = 'am';
    for(i = 0; i<24; i++){
        i > 11 ? ext = 'pm' : ext = 'am';
        i < 12 ? time = i : time = i - 12;
        time === 0 ? time = 12 : time = time; 
        var timeOption = document.createElement('option');
        timeOption.value = i;
        timeOption.innerText = time + ext;
        startTimeSelect.appendChild(timeOption);
    }
    startTimeSelect.required = true;
    form.appendChild(startTimeSelect);

    form.appendChild(document.createElement('br'))

    var endTimeLabel = document.createElement('label');
    endTimeLabel.innerText = 'End Time: ';
    endTimeLabel.for = 'endTime';
    form.appendChild(endTimeLabel);
    
    var endTimeSelect = document.createElement('select');
    endTimeSelect.id = 'endTime';
    
    var i = 0;
    var time = 12;
    var ext = 'am';
    for(i = 0; i<24; i++){
        i > 11 ? ext = 'pm' : ext = 'am';
        i < 12 ? time = i : time = i - 12;
        time === 0 ? time = 12 : time = time; 
        var timeOption = document.createElement('option');
        timeOption.value = i;
        timeOption.innerText = time + ext;
        endTimeSelect.appendChild(timeOption);
    }
    endTimeSelect.required = true;
    form.appendChild(endTimeSelect);

    // Create Submit button
    form.appendChild(document.createElement('br'))
    var submit = document.createElement('input');
    submit.type = 'submit'
    submit.id = 'submitEvent';
    submit.value = 'Create Event';
    form.appendChild(submit);

    
    container.appendChild(form);
}

function validateEventForm(e){
    e.preventDefault();
    var complete = true;
    var name = e.target[0].value;
    var date = e.target[1].value;
    
    // Check if the form is filled out correctly
    if(!name){
        alert('Please add an event name')
        complete = false;
    }
    if(!date){
        alert('Please add an event date');
        complete = false;
    }

    var start = parseInt(e.target[2].value);
    var end = parseInt(e.target[3].value);
    // Validate the start and end times
    if(start > end){
        alert('Please make sure that the start time is before the end time.');
        complete = false;
    }
    else if(start === end){
        alert('Your start and end times are the same.');
        complete = false;
    }

    // If the form is complete, add the event to localStorage
    // Otherwise, notify user to fix issues.
    if(complete){
        console.log('Form was filled out successfully!');
        console.log(date);
        var mon = parseInt(date.substr(5,2));
        var year = parseInt(date.substr(0,4));
        date = parseInt(date.substr(8,2));
        var form = [name, date, mon, year, start, end];
        createEvent(form);
    }
    else{
        console.log('Please fix the errors listed above.');
    }
}

/*
    Add event to data
*/
function createEvent(formData){
    console.log(formData);
    events.id.push(counter);
    counter++;

    events.name.push(formData[0]);
    events.date.push(formData[1]);
    events.month.push(formData[2]);
    events.year.push(formData[3]);
    events.start.push(formData[4]);
    events.end.push(formData[5]);
    

    // Update what events are being displayed
    displayEvents();
}


/*
    Go through data and display events
*/
function displayEvents(){
    clearGrid();

    var calendar = document.getElementById('calendar-grid');
    var week = document.getElementsByClassName('weekdayName');
    var time_slots = document.getElementsByClassName('time-slot');
    var i = 0;
    var dayoftheweek = 0;
    // Check if date and month are the same
    console.log(calendar);
    
    for(i = 0; i<events.id.length; i++){
        var validDate = parseInt(week[1].children[0].innerText) <= events.date[i] && parseInt(week[7].children[0].innerText) >= events.date[i];
        //check if 
        if(validDate){
            dayoftheweek = events.date[i] - parseInt(week[1].children[0].innerText);
            console.log('event is in this week');
            
            // Fill the slots based on the event time
            var j = 0;
            var duration = events.end[i] - events.start[i];
            console.log('this is the duration ' + duration);
            
            time_slots[dayoftheweek+events.start[i]*7].innerText = events.name[i];
            for(j = 0; j < duration; j++){
                time_slots[dayoftheweek+(j*7)+events.start[i]*7].classList.add('filled-slot');
            }
        }
    }
    
    console.log(events);
}

function clearGrid(){
    var time_slots = document.getElementsByClassName('time-slot');
    var i = 0;
    for(i=0; i < time_slots.length; i++){
        time_slots[i].classList.remove('filled-slot');
        time_slots[i].innerText = ''
    }
}

/*
    Global event data to store events
*/
events = {
    id: [],
    name: [],
    date: [],
    month: [],
    year: [],
    start: [],
    end: []
}

var counter = 0;