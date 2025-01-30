'use client'


import {createContext, ReactNode, useEffect, useState} from "react";
import {getWeather} from "@/app/services/weatheApi";

interface WeatherData {
    current: {
        temp: number;
        humidity: number;
        pressure: number;
        wind_speed: number;
        weather: { description: string; icon: string; }[]
    }
    daily: { temp: { min: number; max: number }; weather: { description: string; icon: string; }[]; }[]
}

interface WeatherContextType {
    weatherData: WeatherData | null
    loading: boolean
    error: string | null
    fetchWeather: (lat: number, lon: number) => void
}


export const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider = ({children}: { children: ReactNode }) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const fetchWeather = async (lat: number, lon: number) => {

        try {
            setLoading(true);
            setError(null);
            const data = await getWeather(lat, lon);

            setWeatherData(data)

        } catch (error) {
            setError("error", error.message)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        fetchWeather(33.44, -94.04)
    }, []);

    return (
        <WeatherContext.Provider value={{weatherData, loading, error, fetchWeather}}>
            {children}
        </WeatherContext.Provider>
    )
}