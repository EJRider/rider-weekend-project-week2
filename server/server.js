const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(5000, ()=>{
    console.log('Server is listening');
});