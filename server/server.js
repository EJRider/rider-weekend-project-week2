const express = require('express')
const bodyParser = require('body-parser');
const app = express();

let mathHistory = [];

let numberOfProblemsSolved = -1;



app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(5000, ()=>{
    console.log('Server is listening');
});

app.post('/math-solve', (req,res)=>{
    let newProblem = req.body;
    mathHistory.push(newProblem);
    console.log(mathHistory);
    numberOfProblemsSolved++;
    res.sendStatus(201);
})
app.get('/math-answer', (req, res) => {
    let sentAnswer = problemSolver();
    console.log('Sending', sentAnswer)
    res.send(sentAnswer);
})


function problemSolver(){
    if(mathHistory[numberOfProblemsSolved].chosenEquation === '+'){
      let answer =  Number(mathHistory[numberOfProblemsSolved].firstNumb) + Number(mathHistory[numberOfProblemsSolved].secondNumb);
        return{
            firstNumber: mathHistory[numberOfProblemsSolved].firstNumb,
            secondNumber: mathHistory[numberOfProblemsSolved].secondNumb,
            equationUsed: mathHistory[numberOfProblemsSolved].chosenEquation,
            solvedProblem: answer
        }
    }
    if(mathHistory[numberOfProblemsSolved].chosenEquation === '-'){
        let answer = Number(mathHistory[numberOfProblemsSolved].firstNumb) - Number(mathHistory[numberOfProblemsSolved].secondNumb);
        return{
            firstNumber: mathHistory[numberOfProblemsSolved].firstNumb,
            secondNumber: mathHistory[numberOfProblemsSolved].secondNumb,
            equationUsed: mathHistory[numberOfProblemsSolved].chosenEquation,
            solvedProblem: answer
        }
    }
    if(mathHistory[numberOfProblemsSolved].chosenEquation === '*'){
        let answer = Number(mathHistory[numberOfProblemsSolved].firstNumb) * Number(mathHistory[numberOfProblemsSolved].secondNumb);
        return{
            firstNumber: mathHistory[numberOfProblemsSolved].firstNumb,
            secondNumber: mathHistory[numberOfProblemsSolved].secondNumb,
            equationUsed: mathHistory[numberOfProblemsSolved].chosenEquation,
            solvedProblem: answer
        }
    }
    if(mathHistory[numberOfProblemsSolved].chosenEquation === '/'){
        let answer = Number(mathHistory[numberOfProblemsSolved].firstNumb) / Number(mathHistory[numberOfProblemsSolved].secondNumb);
        return{
            firstNumber: mathHistory[numberOfProblemsSolved].firstNumb,
            secondNumber: mathHistory[numberOfProblemsSolved].secondNumb,
            equationUsed: mathHistory[numberOfProblemsSolved].chosenEquation,
            solvedProblem: answer
        }
    }
}