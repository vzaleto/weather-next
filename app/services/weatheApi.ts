import axios from "axios";

export async function getWeather(latOrCity: number | string, lon: number | null) {
    const apiKey = `f7ca9228d604bbf61b59541ca685120e`;

    let url: string;

    if (typeof latOrCity === 'string') {

        url = `https://api.openweathermap.org/data/2.5/forecast?q=${latOrCity}&appid=${apiKey}&units=metric`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latOrCity}&lon=${lon}&appid=${apiKey}&units=metric`;
    }


    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error)
        return null
    }
}

