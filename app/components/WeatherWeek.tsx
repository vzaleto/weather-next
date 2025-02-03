import React from 'react';

const WeatherWeek = ({dailyForecasts, dataTime, size}) => {
    return (
        <div className={`flex flex-wrap ${size === "small" ? "gap-2 justify-center" : "gap-4"}`}>

            {dailyForecasts.slice(1).map((day, index) => (
                <div key={index} className="border-2 border-l-indigo-500 border-t-indigo-500 rounded-xl ">
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
                            <p>Desc : {day.description}</p>
                            <p><span>{day.temp_min}</span> <span>|</span> <span>{day.temp_max}</span></p>
                        </>
                    )}

                </div>

            ))}
        </div>
    );
};

export default WeatherWeek;