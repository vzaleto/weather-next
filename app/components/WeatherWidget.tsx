'use client'
import {useContext, useEffect, useState} from "react";
import {WeatherContext} from "@/app/context/WeatherContext";
import {jack} from "jackspeak";

const WeatherWidget = () => {
    const [lat,setLat] = useState(33.44);
    const [lon, setLon] = useState(-94.04);
    const [dailyForecast, setDailyForecast] = useState([]);


    const weatherContext = useContext(WeatherContext);
    if (!weatherContext) {
        return <p>Error</p>
    }
    const {weatherData,loading,error,fetchWeather} = weatherContext;
    const toCelsius = (temp: number | undefined) => Math.round(((temp ?? 0) - 32) * 5 / 9);

    console.log(weatherData)

    const DataTime = (checkPoint)=> {
                const date = new Date( checkPoint * 1000)
                const formattedDate = date.toLocaleString('ru-RU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                });
                return formattedDate
    }

    // useEffect(() => {
    //
    //     const now = new Date();
    //     const currentHour = now.getHours();
    //
    //     const groupedData = {};
    //
    //     forecastData.forEach((item) => {
    //         const date = new Date(item.dt * 1000);
    //         const day = date.toLocaleDateString("ru-RU", {
    //             weekday: "long",
    //             day: "numeric",
    //             month: "long",
    //         });
    //         const hour = date.getHours();
    //
    //         if (!groupedData[day]) {
    //             groupedData[day] = [];
    //         }
    //
    //         groupedData[day].push({ hour, temp: item.main.temp, desc: item.weather[0].description });
    //     });
    //
    //     // Фильтруем ближайший прогноз к текущему времени
    //     const filteredData = Object.entries(groupedData).map(([day, data]) => {
    //         const bestTime = data.find((d) => d.hour >= currentHour) || data[0]; // Ближайший или первый в дне
    //         return {
    //             day,
    //             temp: bestTime.temp,
    //             desc: bestTime.desc,
    //             time: bestTime.hour, // Добавляем отображаемое время
    //         };
    //     });
    //
    //     setDailyForecast(filteredData);
    // }, [forecastData]);



    return (
        <div  >
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
             <p>{error}</p>
            ) : weatherData?(

                < div >
                {
                    weatherData.list.map((item,index)=>(
                        <div key={index} className="border-2 border-black bg-amber-800" >
                        <h2>{ DataTime(item.dt) }</h2>
                        <h2>{item.weather?.[0]?.description ?? "No data"}</h2>
                        <p>{toCelsius(item.main.temp)}C</p>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt=""/>
                        <p>Влажность: {item.main.humidity}%</p>
                        <p>Давление: {item.main.pressure} hPa</p>
                        <p> Ветра: {item.wind.speed}m/s </p>
                        </div>

                    ))
                }
                </div>

            ) : (
                <p>No items</p>
            )}
            <input type="number" value={lat} onChange={(e) => setLat(parseFloat(e.target.value))} placeholder={"Широта"} name="" id=""/>
            <input type="number" value={lon} onChange={(e) => setLon(parseFloat(e.target.value))} placeholder={"Долгота"} name="" id=""/>
            <button onClick={() => fetchWeather(lat,lon)}>click</button>
        </div>
    );
};

export default WeatherWidget;