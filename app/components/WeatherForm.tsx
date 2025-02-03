import React from 'react';


// const WeatherForm = ({lat,fetchWeather,setLat,setLon, getWeatherCity}) => {
    const WeatherForm = ({lat, setLat,  fetchWeather}) => {
    return (
        <div>
           <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} placeholder={"Широта"} />

            {/*<input type="number" value={lon} onChange={(e) => setLon(parseFloat(e.target.value))}*/}
            {/*       placeholder={"Долгота"} name="" id=""/>*/}
            <button onClick={() => fetchWeather(lat)}>click</button>
        </div>
    );
};

export default WeatherForm;