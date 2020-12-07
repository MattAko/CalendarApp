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
    form.setAttribute('onSubmit', 'javascript: validateEventForm();');
    

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

function validateEventForm(){
    console.log('test');
    hideForm();
}