import WeatherWidget from "@/app/components/WeatherWidget";
import {getWeather} from "@/app/services/weatheApi";
import {WeatherProvider} from "@/app/context/WeatherContext";

export default async function Home() {
    const weatherData = await getWeather(33.44, -94.04)
  return (
          <WeatherProvider initalWeather={weatherData}>
              <WeatherWidget/>
            </WeatherProvider>
  );
}
