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
    res.sendStatus(201);
})