'use client'
import {useContext, useEffect, useState} from "react";
import {WeatherContext} from "@/app/context/WeatherContext";
import WeatherWeek from "@/app/components/WeatherWeek";
import WeatherCurrent from "@/app/components/WeatherCurrent";
import WeatherForm from "@/app/components/WeatherForm";
import {dataTime} from "@/app/utils/dateUtils";

const WeatherWidget = () => {

    const [latOrCity, setlatOrCity] = useState("");
    const [size, setSize] = useState("large");

    const weatherContext = useContext(WeatherContext)

    if(!weatherContext) {
        return <p>Error</p>
    }
    const {weatherData, loading, error, fetchWeather, themeBlack, setThemeBlack} = weatherContext;


    // const toCelsius = (temp: number | undefined) => Math.round(( (temp ?? 0) - 32) * 5 / 9);


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

    const dailyForecasts = getDailyForecast()

    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : error ? (
                <p>{error}</p>
            ): weatherData ? (
                <div className={`${ themeBlack ? 'black' : "Light"  }  `} >

                    <div className="py-2.5 bg-cyan-500 " >
                    <div  className="container mx-auto">
                        <WeatherForm latOrCity={latOrCity}  fetchWeather={fetchWeather} setlatOrCity={setlatOrCity}  themeBlack={themeBlack} setThemeBlack={setThemeBlack} />
                    </div>
                    </div>

                    <div className="container mx-auto">
                        <div>
                            <select name="" value={size} onChange={(e) => setSize(e.target.value)} id="">
                                <option value="large">Large</option>
                                <option value="medium">Medium</option>
                                <option value="small">Small</option>
                            </select>
                        </div>
                        <div className={` bg-gradient-to-tl from-blue-500 to-teal-500 rounded-md  ${size === " small" ? "max-w-sm" : size === "medium" ? "max-w-md" : "max-w-lg"}  `}>
                            <WeatherCurrent   size={size} weatherData={weatherData}/>
                            {size !== "small" &&  <WeatherWeek dataTime={dataTime} size={size} dailyForecasts={dailyForecasts} /> }

                        </div>
                    </div>
                </div>
            ): (
                <p>No items</p>
            )}


        </div>
    );
};

export default WeatherWidget;