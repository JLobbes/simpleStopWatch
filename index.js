$( document ).ready(function() {
    console.log( "jQuery has loaded successfully" );
});

//Core Variables
let power = false;
let timeInitial = 0;
let timeFinal = 0;
let progressCapture = 0; //Captures accumulated time to allow for Pause events
let myInterval = 0;

//Core Functions
function start() {
    if(power == false) {
        power = true;
        timeInitial = new Date();
        myInterval = setInterval(display, 1000);
    }
}

function stop() {
    if(power == true) {
        power = false;
        timeFinal = new Date(); 
        progressCapture += (timeFinal - timeInitial);
    }
}

function reset() {
    if(power == false) {
        timeInitial = 0;
        timeFinal = 0;
        progressCapture = 0;
        document.querySelector('#display p').innerText = `00:00`;
    }
}


function display() {
    //Time Passed in Milliseconds
    let millisecondsPast = Math.floor(progressCapture);
    if(power == true) millisecondsPast = Math.floor((progressCapture + (new Date() - timeInitial)));

    //Convert Milliseconds to Readable Time
    let minutesPast = Math.floor(millisecondsPast / (60 * 1000));
    let secondsPast = Math.floor(millisecondsPast / (1000));
    if(minutesPast >= 1) secondsPast = Math.floor((millisecondsPast % (minutesPast * 60 * 1000))/ 1000);
    
    //Pad and Place Readable Time
    let displaySeconds = secondsPast.toString().padStart(2,'0');
    let displayMinutes = minutesPast.toString().padStart(2,'0');
    document.querySelector('#display p').innerText = `${displayMinutes}:${displaySeconds}`
}


//Add Event Listeners for Buttons
let startButton = document.querySelector('#controls :nth-child(1)')
let resetButton = document.querySelector('#controls :nth-child(2)')
let stopButton = document.querySelector('#controls :nth-child(3)')

startButton.addEventListener('click', start)
resetButton.addEventListener('click', reset)
stopButton.addEventListener('click', stop)