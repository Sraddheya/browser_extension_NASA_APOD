const apiURL = "https://api.nasa.gov/planetary/apod?";
const apiKey = "KEY";

async function getAPODData(){
    try{
        const response = await fetch(apiURL + `api_key=${encodeURIComponent(apiKey)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const APOD_data = await response.json();
        return APOD_data;

    } catch (error){
        console.error('Error fetching geocoding data:', error);
    }
}

function setBackgroundImage(image_url){
    document.body.style.backgroundImage = `url(${image_url})`;
}

function setDate(date){
    parsed_date = date.split("-"); 
    document.getElementById("APOD_date").innerHTML = parsed_date[2] + "." + parsed_date[1] + "." + parsed_date[0];
}


async function render(){
    APOD_data = await getAPODData();
    setBackgroundImage(APOD_data.hdurl);
    setDate(APOD_data.date);

    //Setting text
    document.getElementById("APOD_title").innerHTML = APOD_data.title;
    document.getElementById("APOD_explanation").innerHTML = APOD_data.explanation;
    document.getElementById("APOD_url").innerHTML.href = APOD_data.url
}

render();