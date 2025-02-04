import React from 'react';

const WeatherWeek = ({dailyForecasts, dataTime, size}) => {
    return (
        <div className={`flex  ${size === "small" ? "gap-2 justify-center" : "gap-4"}`}>

            {dailyForecasts.slice(1).map((day, index) => (
                <div key={index} className="week-day  rounded-xl bg-gradient-to-br  from-cyan-500 to-blue-500">
                    {size === "small" ? (
                        <>
                            <p>{dataTime(day.dt, false)}</p>
                            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}/>
                        </>
                    ) : (
                        <>
                            <p> {dataTime(day.dt, false)} </p>
                            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                 alt=""/>
                            <p> {day.description}</p>
                            <p><span>{Math.round(day.temp_min)}</span> <span>|</span> <span>{Math.round(day.temp_max)}</span></p>
                        </>
                    )}

                </div>

            ))}
        </div>
    );
};

export default WeatherWeek;