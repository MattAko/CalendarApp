/*
    This JS file is responsible with handling dates
    Written by: Matthew Roberts
*/


/*  
    This is the main function that loads the calendar
    -Fill the calender grid with elements for each time-slot
        -probably not the most efficient way to do this, but seems rather simple.
    -Loads the correct date numbers
    -Determines what the current week is, which is used to show what the events are for this particular week.
*/
function fillGrid(){
    var grid = document.getElementById('calendar-grid');
    timer = new Date(2020, 12, 0, 1, 0, 0);
    var counter = 1;
    for(var i = 0; i < 200; i++){
        var time_slot = document.createElement('div');
        if(i%8===0 && i!==0){
            time_slot.classList.add('time-divider');
            time_slot.innerText = formatAMPM(timer);
            counter += 1;
            timer.setHours(counter);
        }
        else if(i<8){
            time_slot.classList.add('first-row');
        }
        else{
            time_slot.classList.add('time-slot');
        }

        grid.appendChild(time_slot);
    }

    // Add the date titles
    var dates = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
    for(var i = 1; i < 8; i++){
        grid.children[i].classList.add('weekdayName');    
        grid.children[i].innerText = dates[i-1];
    }
    grid.children[0].classList.add('weekdayName');

    // Now, get the dates
    setupDates();
}


/* 
    Finds current date and highlight it in the DOM
*/
function setupDates(){
    d = new Date();
    var day = d.getDay();

    var cal = document.getElementById('calendar-grid');
    cal.children[day+1].classList.add('currentDay');

    setupDateNumbers(day);
    currentWeek = getWeekNumber(d);
    document.getElementById('weekNumber').innerText = currentWeek;
    displayMonth();
}


/* 
    Sets all the date #'s within the DOM 
*/
function setupDateNumbers(curr){
    d = new Date();
    d.setDate(d.getDate() - curr);  //set the date to the beginning of the week

    var dates = document.getElementById('calendar-grid');
    
    for(var i = 1; i < 8; i++){
        var date = document.createElement("h2");
        date.innerHTML = d.getDate();

        dates.children[i].appendChild(date);
        d.setDate(d.getDate() + 1);
    }
}

/*
    Update the dates of the week
    ***Check if the current day is within that week***
*/
function updateDates(){
    dayoftheweek = globalDate.getDay();
    d = new Date(); // counter to iterate through days of the week
    d.setMonth(globalDate.getMonth());
    d.setDate(globalDate.getDate() - dayoftheweek);

    var week = document.getElementsByClassName('weekdayName'); //Array of the weekdays
    for(var i = 1; i < 8; i++){
        week[i].children[0].innerText = d.getDate();
        if(week[i].classList['length']===3){
            week[i].classList.remove('currentDay')
        }
        if(d.getMonth() === currentDate.getMonth() && d.getDate() === currentDate.getDate()){
            week[i].classList.add('currentDay')
        }
        d.setDate(d.getDate() + 1);
    }
}

/*
    Format the time in AM/PM since JavaScript doesn't have this already
*/
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    //minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ' ' + ampm;
    return strTime;
}

/*
    Get the current week # of the year, since JavaScript doesn't
    have a function for this...
    https://stackoverflow.com/a/6117889
*/
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

/*
    Display what the current month is
    Note: Months can overlap with one another
*/
function displayMonth(){
    d = new Date();
    d.getDate();
    
    var week = document.getElementsByClassName('weekdayName');
    if(parseInt(week[1].children[0].innerText) > parseInt(week[7].children[0].innerText)){
        // the month is a range
        var firstIndex = globalDate.getMonth();
        var secondIndex = 0;
        globalDate.getMonth()+1 > 11 ? secondIndex = 0 : secondIndex = globalDate.getMonth()+1
        document.getElementById('month').innerText =  months[firstIndex] + '-' + months[secondIndex];
    }
    else{
        document.getElementById('month').innerText = months[globalDate.getMonth()];
    }
}


/*
    Incrementing and decrementing the week counter
*/
function incWeek(){
    // increment the global date
    globalDate.setDate(globalDate.getDate()+7);

    updateDates();
    displayMonth();
    currentWeek===52 ? currentWeek = 0 : currentWeek++;
    document.getElementById('weekNumber').innerText = currentWeek;
    displayEvents()
}
function decWeek(){
    // decrement the global date
    globalDate.setDate(globalDate.getDate()-7);

    updateDates();
    displayMonth();
    currentWeek===0 ? currentWeek = 52 : currentWeek--;
    document.getElementById('weekNumber').innerText = currentWeek;
    displayEvents()
}


/*
    Useful global variables
*/
var currentWeek = 0;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
globalDate = new Date();
globalDate.getDay();
currentDate = new Date();
currentDate.getDay();

/*
    Run the functions
*/
fillGrid()  