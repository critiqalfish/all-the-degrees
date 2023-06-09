const Weather = ({props}) => {
    props.setLocation("Location")
    props.setWeatherIcon(props.weatherIcons['cloud-sun'])
    return (
        <div className="Weather">
            <h1 id="location">{props.selectedLocation}</h1>
            <h1 id="degrees"><i className={props.weatherIcon}></i>{props.degrees.avgDegrees}°</h1>
            <h3 id="low">low: {props.degrees.lowDegrees}°</h3>
            <h3 id="high">high: {props.degrees.highDegrees}°</h3>
            <div className="box" id="hourly">

            </div>
            <div className="box" id="weathers">
                
            </div>
        </div>
    )
}

export default Weather