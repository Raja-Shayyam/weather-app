// let countrySearch = document.querySelector('#search-bar').value; //= document.querySelector('#search-bar').value;
let countryBYsearched = document.querySelector('#contry-name');
const btn = document.querySelector('#s');

//////////////////////////////

const DEGREE = document.querySelector('#degree');
const CONDITION = document.querySelector('#condition');
const HH = document.querySelector('#H');
const LL = document.querySelector('#L');
let IMAGE = document.querySelector('#i');
//////////////////////////////
let apiKEY ='ba548a15406d439092c143941252603';
//let apiURL ='http://api.weatherapi.com/v1/current.json?key=ba548a15406d439092c143941252603&q=London&aqi=yes';
// let forcastUrl = 'http://api.weatherapi.com/v1/forecast.json?key=ba548a15406d439092c143941252603&q=London&days=14&aqi=no&alerts=no';
//let data;
/////////000000000/////////////
async function fetching(apiKEY , countryName){
  try{
    
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKEY}&q=${countryName}&days=14&aqi=no&alerts=no`);

    if(!response){
      throw new Error("could not fetch");
    }

    const data= await response.json();
    //console.log(`k:` , data);
    
    return data;

  }catch(error){
    console.log('error is '+ error);
  }
  
}

console.log('k');
btn.addEventListener('click' , async ()=>{
  let countrySearch = document.querySelector('#search-bar').value;
  console.log('salam');
  console.log(countrySearch);
  
  alert('ji han');
  const DATA = await fetching(apiKEY,countrySearch);
  console.log(DATA);
  
  countryBYsearched.innerText = DATA.location.name;
  CONDITION.innerText = DATA.current.condition.text;
  DEGREE.innerText = DATA.current.temp_c;
  LL.innerText = DATA.location.lat;
  HH.innerText = DATA.location.lon;
  IMAGE.src = DATA.current.condition.icon;
  countrySearch.innerText = ' ';

  await dayviswDetails(DATA);

});

let lPart = document.querySelector('#L-part');

let HF =  document.querySelector('#hf');
let WF =  document.querySelector('#wf');

async function dayviswDetails(DATA) {

  HF.addEventListener('click', ()=>{
    let newhtml = '';
    console.log('salam hf');
  DATA.forecast.forecastday[0].hour.forEach(hDATA => {
    newhtml += `<span class="details">
              <span  class="time-choise int">${hDATA.temp_c}</span>
              <img id="details-img" src="${hDATA.condition.icon}" alt="weather img">
              <span type="text" class="degree-choise int">${hDATA.wind_kph}</span>
            </span>`;
  });
    lPart.innerHTML = newhtml;
  });

  WF.addEventListener('click', ()=>{
    let newhtml = '';
    console.log('salam wf');
    
    DATA.forecast.forecastday.forEach(fDATA => {
      newhtml += `<span class="details">
                <span  class="time-choise int">${fDATA.day.maxtemp_c}</span>
                <img id="details-img" src="${fDATA.day.condition.icon}" alt="weather img">
                <span type="text" class="degree-choise int">${fDATA.day.maxwind_kph}</span>
              </span>`;
    });
    lPart.innerHTML = newhtml;
  })

  //for(let i=0 ; i<14 ; i++){
    // newhtml += `<span class="details">
    //           <span  class="time-choise int">${DATA.forecast.forecastday[0].hour[i].temp_c}</span>
    //           <img src="#" alt="weather img">
    //           <span type="text" class="degree-choise int">${i*2}</span>
    //         </span>`;
      
  //}

  

}
