import axios from "axios";

export async function getWeather(lat:number,lon:number){
    const apiKey = `f7ca9228d604bbf61b59541ca685120e`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try{
        const response  = await axios.get(url);
        return response.data;
    }catch (error){
        console.log(error)
    }



}