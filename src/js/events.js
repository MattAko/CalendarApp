/*
    This JS file is responsible for handling events, such as:
    -Adding new events
    -Showing the add event form
    -Editing events
    -Deleting events
    Written by: Matthew Roberts
*/

/*
    Global event data to store events
*/
events = (localStorage.getItem('eventList')) ? JSON.parse(localStorage.getItem('eventList')): {
    id: [],
    name: [],
    date: [],
    month: [],
    year: [],
    start: [],
    end: []
}

function eventsObjectUpdated() {
    localStorage.setItem('eventList', JSON.stringify(events));
}

var counter = 0;    //Used for IDs
displayEvents();

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

/*
    Display the form for adding events
    **Will most likely convert to this HTML and just edit the display...**
*/
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
    eventNameInput.classList.add('inputText');
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

/*
    Validate the input for the form data
    This calls createEvent() if the form is filled out correctly
*/
function validateEventForm(e){
    e.preventDefault();
    var complete = true;
    var name = e.target[0].value;
    var date = e.target[1].value;
    var form = document.getElementById('addEventForm')

    document.querySelectorAll('.errorMsg').forEach(function(a) {
        a.remove()
    })

    // Check if the form is filled out correctly
    if(!name){
        var nameError = document.createElement('p');
        nameError.textContent = 'Please add an event name';
        nameError.classList.add('errorMsg');
        form.appendChild(nameError);
        //alert('Please add an event name')
        complete = false;
    }
    if(!date){
        var dateError = document.createElement('p');
        dateError.textContent = 'Please add an event date';
        dateError.classList.add('errorMsg');
        form.appendChild(dateError);
        //alert('Please add an event date');
        complete = false;
    }

    var start = parseInt(e.target[2].value);
    var end = parseInt(e.target[3].value);
    // Validate the start and end times
    if(start > end){
        //alert('Please make sure that the start time is before the end time.');
        var timeError = document.createElement('p');
        timeError.textContent = 'Please make sure that the start time is before the end time.';
        timeError.classList.add('errorMsg');
        form.appendChild(timeError);
        complete = false;
    }
    else if(start === end){
        var timeError = document.createElement('p');
        timeError.textContent = 'Your start and end times are the same.';
        form.appendChild(timeError);
        timeError.classList.add('errorMsg');
        //alert('Your start and end times are the same.');
        complete = false;
    }

    // If the form is complete, add the event to localStorage
    // Otherwise, notify user to fix issues.
    if(complete){
        console.log('Form was filled out successfully!');
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
    hideForm();
    eventsObjectUpdated();
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
    for(i = 0; i<events.id.length; i++){
        var validDate = parseInt(week[1].children[0].innerText) <= events.date[i] && parseInt(week[7].children[0].innerText) >= events.date[i];

        var validMonth = events.month[i] === globalDate.getMonth()+1;
        console.log(validMonth);
        if(validDate && validMonth){
            dayoftheweek = events.date[i] - parseInt(week[1].children[0].innerText);
            
            // Fill the slots based on the event time
            var j = 0;
            var duration = events.end[i] - events.start[i];
            
            time_slots[dayoftheweek+events.start[i]*7].innerText = events.name[i];
            for(j = 0; j < duration; j++){
                time_slots[dayoftheweek+(j*7)+events.start[i]*7].classList.add('filled-slot');
                time_slots[dayoftheweek+(j*7)+events.start[i]*7].value = events.id[i];
            }
        }
    }
}

/*
    Clear the grid whenever the week is changed
*/
function clearGrid(){
    var time_slots = document.getElementsByClassName('time-slot');
    var i = 0;
    for(i=0; i < time_slots.length; i++){
        time_slots[i].classList.remove('filled-slot');
        time_slots[i].innerText = ''
        time_slots[i].value = undefined;
    }
}

/*
    Edit event form
*/
function editEvent(e){
    e.preventDefault();

    id = e.target.value;
    if(Number.isInteger(id)){
        // Animation for edit form dropping down
        var editForm = document.getElementById('editForm');
        var overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        editForm.style.display = 'block';
        editForm.style.transform = 'translate(-50%, -50%)';
        editForm.style.animation =  'fallIn forwards 0.7s';


        var startTime = document.getElementById('editStartTime');
        var endTime = document.getElementById('editEndTime');
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
            startTime.appendChild(timeOption);
        }

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
            endTime.appendChild(timeOption);
        }

        // Load the event name
        var index = events.id.indexOf(id)
        document.getElementById('editEventName').value = events.name[index];

        // Load the event date 
        var year = events.year[index];
        var month = events.month[index];
        var day = events.date[index];
        if(day<10){
            day = '0' + events.date[index];
        }
        var inputDate = year + '-' + month + '-' + day;
        document.getElementById('editEventDate').value = inputDate;

        // Load the start time and end time
        document.getElementById('editStartTime').value = events.start[index];
        document.getElementById('editEndTime').value = events.end[index];

        document.getElementById('eventID').value = index;
    }
}


/*
    Delete a specific event from events object
*/
function deleteEvent(e){
    e.preventDefault();
    var index = e.target.form[4].value


    // remove each element of the specific event
    events.name.splice(index,1);
    events.date.splice(index,1);
    events.month.splice(index,1);
    events.year.splice(index,1);
    events.start.splice(index,1);
    events.end.splice(index,1);
    events.id.splice(index,1);

    console.log(events);
    displayEvents();
    closeEditForm();
    eventsObjectUpdated();
}


/*
    Get 'Edit Form' data, modify existing events object using index
*/
function submitEdit(e){
    e.preventDefault();
    console.log(e);
    var index = e.target.form[4].value
    
    var mon = parseInt(e.target.form[1].value.substr(5,2));
    var year = parseInt(e.target.form[1].value.substr(0,4));
    var date = parseInt(e.target.form[1].value.substr(8,2));

    events.name[index] = e.target.form[0].value //event name
    events.date[index] = date  //event date
    events.month[index] = mon   //event month
    events.year[index] = year //event year
    events.start[index] = e.target.form[2].value //event start time
    events.end[index] = e.target.form[3].value //event end time
    
    displayEvents();
    closeEditForm();
    eventsObjectUpdated();
}

/*
    Close edit form
*/
function closeEditForm(){
    var editForm = document.getElementById('editForm');
    editForm.style.display = 'none';
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

