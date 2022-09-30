console.log('javascript running');

$(document).ready(onReady);

let givenValue;

let prepToSend;

function onReady(){
    console.log('jquery running');
    //an onClick that only calls buttons with the mathButtons class without submitting
    //the form
    $('.mathButtons').on('click', getValue);
    //submit form call
    $('#mathForm').on('submit', submitMath);
}

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
    console.log(prepToSend);
}

function submitMath(evt){
    evt.preventDefault();
    console.log('submitting math to server');
}