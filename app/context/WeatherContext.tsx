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
        wind:{
            deg:number
            speed:number
        }
    }
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


    const fetchWeather = async (lat: number | string, lon?: number | null) => {

        try {
            setLoading(true);
            setError(null);
            const data = await getWeather(lat, lon??null);

            setWeatherData(data)

        } catch (error) {
            setError("error", error.message)
        } finally {
            setLoading(false)
        }
    }
    // const fetchWeatherCity = async (city: string) => {
    //
    //     try {
    //         setLoading(true);
    //         setError(null);
    //         const data = await getWeatherCity(city);
    //
    //         setWeatherData(data)
    //
    //     } catch (error) {
    //         setError("error", error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    // useEffect(() => {
    //     fetchWeather(33.44, -94.04)
    // }, []);

    useEffect(  () => {
               if (!navigator.geolocation) {
                   alert('Ваш браузер не поддерживает геолокацию. Пожалуйста, обновите браузер.');
               } else {
                   console.log('1')
                   navigator.geolocation.getCurrentPosition(  function(position) {
                       if(!position){
                           fetchWeather(33.44, -94.04)
                       }
                       fetchWeather(position.coords.latitude, position.coords.longitude);
                   });
               }

    }, []);

    return (
        <WeatherContext.Provider value={{weatherData, loading, error, fetchWeather}}>
            {children}
        </WeatherContext.Provider>
    )
}