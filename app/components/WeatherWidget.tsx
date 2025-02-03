'use client'
import {useContext, useEffect, useState} from "react";
import {WeatherContext} from "@/app/context/WeatherContext";
import {jack} from "jackspeak";
import WeatherWeek from "@/app/components/WeatherWeek";
import WeatherCurrent from "@/app/components/WeatherCurrent";
import WeatherForm from "@/app/components/WeatherForm";
import WeatherCurrentMiddle from "@/app/components/WeatherCurrentMiddle";

const WeatherWidget = () => {
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState(-94.04);
    const [size, setSize] = useState("large");


    const weatherContext = useContext(WeatherContext);
    if (!weatherContext) {
        return <p>Error</p>
    }
    const {weatherData, loading, error, fetchWeather} = weatherContext;
    const toCelsius = (temp: number | undefined) => Math.round(((temp ?? 0) - 32) * 5 / 9);

    console.log(weatherData)

    const dataTime = (checkPoint: number, showFulll = true) => {
        const data = new Date(checkPoint * 1000)
        return data.toLocaleString('en-En', showFulll ? {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
        } : {
            weekday: 'long',
        });
    }

    const getDailyForecast = () => {
        if (!weatherData) return []

        const dailyForecast: { [key: string]: any } = {}

        weatherData.list.forEach((item) => {

            const date = item.dt_txt.split(" ")[0]

            if (!dailyForecast[date]) {
                dailyForecast[date] = {
                    dt: item.dt,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                }
            } else {
                dailyForecast[date].temp_min = Math.min(dailyForecast[date].temp_min, item.main.temp_min)
                dailyForecast[date].temp_max = Math.min(dailyForecast[date].temp_max, item.main.temp_max)
            }
        })
        return Object.entries(dailyForecast).slice(0, size === "medium" ? 3 : 7).map(([date, data]) => ({
            date, ...(data as any)
        }))
    }


    const dailyForecasts = getDailyForecast();
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : weatherData ? (
                <div>

                    <div>
                        <select name="" value={size} onChange={(e) => setSize(e.target.value)} id="">
                            <option value="large">Large</option>
                            <option value="medium">Medium</option>
                            <option value="small">Small</option>
                        </select>
                    </div>

                    <div className="container mx-auto">
                        <div className={`bg-sky-500/50 rounded-md  ${size === " small" ? "max-w-sm" : size === "medium" ? "max-w-md" : "max-w-lg"}  `}>
                            <WeatherCurrent size={size} weatherData={weatherData} dataTime={dataTime} toCelsius={toCelsius}/>
                            {size !== "small" &&  <WeatherWeek dailyForecasts={dailyForecasts} dataTime={dataTime} size={size}/> }

                        </div>
                    </div>



                </div>

            ) : (
                <p>No items</p>
            )}
            <WeatherForm lat={lat} lon={lon} fetchWeather={fetchWeather} setLat={setLat} setLon={setLon}/>
        </div>
    );
};

export default WeatherWidget;