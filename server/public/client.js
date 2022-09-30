console.log('javascript running');

$(document).ready(onReady);

let givenValue;

let prepToSend;

let numberOfProblems = -1;

function onReady(){
    console.log('jquery running');
    //an onClick that only calls buttons with the mathButtons class without submitting
    //the form
    $('.mathButtons').on('click', getValue);
    //submit form call
    $('#mathForm').on('submit', submitMath);
}


// this function takes in both number inputs and the chosen math equation, then sends 
// that information to the server.
// it also checks if the value they sent in was C, if that is true it will clear
// the inputs and end the function.
function getValue(){
    console.log('getting value of ', this);
    givenValue = $(this).val();
    if(givenValue === 'C'){
        console.log('clearing fields');
        $('#firstNumber').val('');
        $('#secondNumber').val('');
        return;
    }
    else{
    prepToSend = {
        firstNumb: $('#firstNumber').val(),
        secondNumb: $('#secondNumber').val(),
        chosenEquation: givenValue
    }
}
    $('#firstNumber').val();
    $('#secondNumber').val();
    console.log(prepToSend);
}


// this function takes the prepToSend object and sends it over to the server.
function submitMath(evt){
    evt.preventDefault();
    console.log('submitting math to server');
    $.ajax({
        url:'/math-solve',
        method: 'POST',
        data: prepToSend
    })
        .then(response => {
            console.log('data recieved', response);
        })
        .catch(err => {
            console.log('there was an error in submit math', err);
        })
}