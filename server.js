const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('demo'));

const PORT = 8000;

const projectData = {
  temp: '',
  date: '',
  userMessage: '',
  city: ''
};

const server = app.listen(PORT, listening);
function listening () {
  console.log('server is now running');
  console.log(`Running on localhost: ${PORT}`);
}
app.get('/home', (req, res) => {
  res.send(projectData);
});

app.post('/getPost', (req, res) => {
     projectData.temp = req.body.temperature;
     projectData.date = req.body.date;
     projectData.userMessage = req.body.userMessage;
     projectData.city = req.body.city;
     res.json('POST RECEIVED');
});
