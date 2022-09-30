console.log('javascript running');

$(document).ready(onReady);

let givenValue;
let numberOne;
let numberTwo;


let solvedProblems =[];

function onReady(){
    console.log('jquery running');
    //an onClick that only calls buttons with the mathButtons class without submitting
    //the form
    $('.mathButtons').on('click', getValue);
    //submit form call
    $('#mathForm').on('submit', submitMath);
    getHistory();
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
}


// this function takes the prepToSend object and sends it over to the server.
function submitMath(evt){
    evt.preventDefault();
    numberOne = $('#firstNumber').val();
    numberTwo = $('#secondNumber').val();
    console.log('submitting math to server');
    let prepToSend = {
        firstNumb: numberOne,
        secondNumb: numberTwo,
        chosenEquation: givenValue
    }
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

function getHistory(){
    $.ajax({
        url: '/math-history',
        method: 'GET'
    })
        .then(response =>{
            console.log('recieved', response);
            solvedProblems = response;
            console.log(solvedProblems);
            render();
        })
        .catch(err =>{
            console.log('An error was found in getHistory', err);
        })

}

function render(){
    console.log('in render');
    console.log('checking solvedProblems', solvedProblems);
    if(solvedProblems.length === 0){
        return;
    }
    $('#history').empty();
    for(let objects of solvedProblems){
        $('#history').append(`
        <tr>
            <td> ${objects.firstNumber} ${objects.equationUsed} ${objects.secondNumber} = ${objects.solvedProblem}
        </tr>
        `);
    }
}
