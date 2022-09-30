console.log('javascript running');

$(document).ready(onReady);

let givenValue;

let prepToSend;

let numberOfProblems = -1;

let solvedProblems =[];

function onReady(){
    console.log('jquery running');
    //an onClick that only calls buttons with the mathButtons class without submitting
    //the form
    $('.mathButtons').on('click', getValue);
    //submit form call
    $('#mathForm').on('submit', submitMath);
    render();
}


// this function takes in both number inputs and the chosen math equation, then sends 
// that information to the server.
// it also checks if the value they sent in was C, if that is true it will clear
// the inputs and end the function.
function getValue(){
    console.log('getting value of ', this);
    givenValue = $(this).val();
    // formsFilled();
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
            $('#firstNumber').val('');
            $('#secondNumber').val('');
        })
        .catch(err => {
            console.log('there was an error in submit math', err);
        })
    getAnswer();
}

function getAnswer(){
    $.ajax({
        url:'/math-answer',
        method: 'GET'
    })
        .then(response =>{
            console.log('recieved', response);
            solvedProblems.push(response);
            render();
        })
        .catch(err =>{
            console.log('an error was found in get answer', err);
        })
}

function render(){
    console.log('in render');
    console.log('checking solvedProblems', solvedProblems);
    $('#history').empty();
    for(let objects of solvedProblems){
        $('#history').append(`
        <tr>
            <td> ${objects.firstNumber} ${objects.equationUsed} ${objects.secondNumber} = ${objects.solvedProblem}
        </tr>
        `);
    }
}
// This function should check the 
// function formsFilled() {
//     var name = document.getElementById("secondNumber").value;
//     var cansubmit = (name.length > 0);
//     document.getElementById("submitButton").disabled = !cansubmit;
//     document.getElementsByClassName("mathButtons")
// };