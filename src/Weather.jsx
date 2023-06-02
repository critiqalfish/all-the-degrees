const Weather = ({selectedLocation, setLocation}) => {
    setLocation("Location")
    return (
        <div className="Weather">
            <h1 id="location">{selectedLocation}</h1>
        </div>
    )
}

export default Weather