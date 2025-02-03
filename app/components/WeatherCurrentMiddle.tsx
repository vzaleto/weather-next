import React from 'react';

const WeatherCurrentMiddle = ({ weatherData,dataTime,toCelsius}) => {
    return (
        <div className="border-l-indigo-500 border-t-indigo-500 border-2  max-w-lg rounded-xl p-2">
            {/*<h2>{dataTime(weatherData.list[0].dt)}</h2>*/}
            <h2>  <span>{ weatherData.city.name }</span>, <span>{ weatherData.city.country }</span> </h2>
            <h2>{weatherData.list[0]?.weather?.[0]?.description ?? "No data"}</h2>
            <p>{toCelsius(weatherData.list[0].main.temp)}C</p>
            <p> feels like {toCelsius(weatherData.list[0].main.feels_like)}C</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                 alt=""/>
            <p>
                <span> {toCelsius(weatherData.list[0].main.temp_min)}C</span>
                <span> | </span>
                <span> {toCelsius(weatherData.list[0].main.temp_max)}C</span>
            </p>
            {/*<p>Влажность: {weatherData.list[0].main.humidity}%</p>*/}
            {/*<p>Давление: {weatherData.list[0].main.pressure} hPa</p>*/}
            {/*<p> Ветра: {weatherData.list[0].wind.speed}m/s </p>*/}
        </div>
    );
};

export default WeatherCurrentMiddle;