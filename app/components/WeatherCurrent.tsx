import React from 'react';
import {dataTime} from "@/app/utils/dateUtils";

const WeatherCurrent = ({weatherData, size}) => {
    return (
        <div className="  max-w-lg rounded-xl p-2  bg-linear-to-r from-indigo-500 to-teal-400">

            <h2>{dataTime(weatherData.list[0].dt)}</h2>
            <h2><span>{weatherData.city.name}</span>, <span>{weatherData.city.country}</span></h2>
            <h2>{weatherData.list[0]?.weather?.[0]?.description ?? "No data"}</h2>
            <p>{ Math.round(weatherData.list[0].main.temp)} C</p>
            <p> feels like {  Math.round(weatherData.list[0].main.feels_like) } C</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                 alt=""/>
            <p>
                <span> { Math.round( weatherData.list[0].main.temp_min ) }C</span>
                <span> | </span>
                <span> { Math.round( weatherData.list[0].main.temp_max)}C</span>
            </p>

            {size !== "small" && (
                <>
                    <p>Влажность: {weatherData.list[0].main.humidity}%</p>
                    <p>Давление: {weatherData.list[0].main.pressure} hPa</p>
                    <p> Ветра: {weatherData.list[0].wind.speed}m/s </p>
                </>
            )}

        </div>
    );
};

export default WeatherCurrent;