//Initializing all elements constants
const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchField");
const form=document.querySelector("form");

//default Location
let target="Delhi"


//Function to fetch Data from API
const fetchData = async(target) => {
    try {
        const url=`https://api.weatherapi.com/v1/current.json?key=32c861a9caf14efc8ed132031222307&q=${target}`;
    const response=await fetch(url);
    const data=await response.json();

    //Destructuring
    const {
        current:{temp_c,condition:{text,icon}
    },  
        location:{name,localtime}
    } = data;

    updateDom(temp_c,name,icon,text,localtime);
    } catch (error) {
        alert("Location not Found");
        
    }
};

//function to update dom
function updateDom(temperature,city,emoji,text,time){

    const exactTime=time.split(" ")[1];
    const exactDate=time.split(" ")[0];
    const exactDay=new Date(exactDate).getDay();

    temperatureField.innerText=temperature;
    cityField.innerText=city;
    dateField.innerText=` ${exactTime} - ${getDayFullTime(exactDay)} ${exactDate}`;
    emojiField.src=emoji;
    weatherField.innerText=text;
}

fetchData(target);



//Function to search the location
const search = (e)=>{
    e.preventDefault();
    target=searchField.value;
    console.log(target);
    fetchData(target);
}

//Adding event Listener to the form;
form.addEventListener("submit",search);

//Function to get the name of the day
function getDayFullTime(num){
    switch(num){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't Know"
    
    }
}