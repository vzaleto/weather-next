import React from 'react';


// const WeatherForm = ({lat,fetchWeather,setLat,setLon, getWeatherCity}) => {
    const WeatherForm = ({latOrCity, setlatOrCity,  fetchWeather, themeBlack, setThemeBlack}) => {
    return (
        <div className="flex " >
            <div className="" >
                <input type="text" value={latOrCity} onChange={(e) => setlatOrCity(e.target.value)} placeholder={"City name"} />
            </div>

            <button onClick={() => fetchWeather(latOrCity)} className="align-middle block bg-amber-500 py-2 px-3 "  >click</button>

            <button onClick={()=> themeBlack ? setThemeBlack(false)  :  setThemeBlack(true) } className="bg-amber-500 py-2 px-3 ml-1" > { themeBlack ? "Black" : "Light"} </button>

        </div>
    );
};

export default WeatherForm;