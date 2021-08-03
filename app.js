const express = require('express'); //load express
const data = require('./MOCK_DATA.json'); //load the mock data json file
const path = require('path'); //import as a dependency

//console.log(data[0]); how to test if the mock data is properly loaded into app by returning the first name in the array

//how to create a new express app/initialiaztion
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static('public/assets'));


//how to set the app to use
app.use('/random-name', (req, res) => {
    const rand_index = Math.round(Math.random() * data.length);
    const{first_name} = data[rand_index]; //generate random index of array
    const{last_name } = data[rand_index] //data[Math.round(Math.random() * data.length)];
    return res.json({first_name, last_name}); //this function will return the properties that are being sent back
});

app.use('/', (req, res) => {
    return res.render('index');
});

app.listen(3000, () => console.log('App listening...'))


 //const{first_name} = data[Math.round(Math.random() * data.length)]; //access the data array, access the data at a particular index. Get the random number between 0 and the length of data array
//const{last_name} = data[Math.round(Math.random() * data.length)];