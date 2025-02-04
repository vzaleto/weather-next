'use client'


import {createContext, ReactNode, useEffect, useState} from "react";
import {getWeather} from "@/app/services/weatheApi";

interface WeatherData {
    city: {
        name: string,
        country: string
    }
    list: {
        dt: number,
        dt_txt: string,
        main: {
            temp: number
            temp_min: number
            temp_max: number
            humidity: number
            pressure: number
        }
        weather: {
            description: string
            icon: string
        }[];
        wind: {
            deg: number
            speed: number
        }
    }
}

interface WeatherContextType {
    weatherData: WeatherData | null
    loading: boolean
    error: string | null
    fetchWeather: (lat: number, lon: number) => void
    themeBlack: boolean
}


export const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider = ({children, initalWeather}: { children: ReactNode, initalWeather: WeatherData }) => {

    const [weatherData, setWeatherData] = useState<WeatherData | null>(initalWeather);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [themeBlack, setThemeBlack] = useState<boolean>(false)


    const fetchWeather = async (latOrCity: number | string, lon?: number | null) => {

        try {
            setLoading(true);
            setError(null);
            const data = await getWeather(latOrCity, lon ?? null);

            setWeatherData(data)

        } catch (error) {
            setError("error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

            if (typeof  window !== "undefined" && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    fetchWeather(position.coords.latitude, position.coords.longitude)
                }, () => {
                    console.warn("Error")
                })}


    }, []);

    return (
        <WeatherContext.Provider value={{weatherData, loading, error,themeBlack,setThemeBlack, fetchWeather}}>
            {children}
        </WeatherContext.Provider>
    )
}