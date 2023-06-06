const Weather = ({selectedLocation, setLocation, degrees, weatherIcon, setWeatherIcon, weatherIcons}) => {
    setLocation("Location")
    setWeatherIcon(weatherIcons['cloud-sun'])
    return (
        <div className="Weather">
            <h1 id="location">{selectedLocation}</h1>
            <h1 id="degrees"><i className={weatherIcon}></i>{degrees.avgDegrees}°</h1>
            <h3 id="low">low: {degrees.lowDegrees}°</h3>
            <h3 id="high">high: {degrees.highDegrees}°</h3>
            <div className="box" id="hourly">

            </div>
            <div className="box" id="weathers">
                
            </div>
        </div>
    )
}

export default Weather