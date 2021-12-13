

const generateBtn = document.querySelector('#generate');

generateBtn.addEventListener('click', getTemp);

 async function getTemp (e) {
  e.preventDefault();
  const apiKey = '83c8560047e8bb43b874ebeca8a85e80';
  const zip = document.querySelector('#zip-code').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&zip=${zip}&appid=${apiKey}`;
    const tempData = await get(url).then(function(tempData){
    const temperature = tempData.main.temp + 'ºC';
    const userResponse = document.querySelector('#feeling').value;
    const today = new Date();
    const newDate = `${today.getDate()}.${today.getMonth()+ 1}.${today.getFullYear()}`;
    const newWeatherData = {
      temperature: '',
      date: '',
      userMessage: '',
      city: ''
    }
    newWeatherData.temperature = temperature;
    newWeatherData.date = newDate;
    newWeatherData.userMessage = userResponse;
    newWeatherData.city = tempData.name;
    post('/getPost', newWeatherData);
  }).then  (function(){
     updateUI();
  });

 }

 const updateUI = async () => {
  const request = await fetch('/home');
  try{
    const allData = await request.json();
    document.querySelector('.date').textContent = allData.date;
    document.querySelector('.temperature').textContent = allData.temp;
    document.querySelector('.city').textContent = allData.city;
    document.querySelector('.feeling').textContent = allData.userMessage;
  }catch(error){
    console.log("error", error);
  }
 }
 

  async function get (url) {
   const response = await fetch (url); 
     try {
      const data = await response.json();
      console.log(data)
      return data;   
     }catch (error) {
      console.log("error", error);
    }
   }

   const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
      return newData
     } catch (error) {
      console.log("error", error);
     }
    }