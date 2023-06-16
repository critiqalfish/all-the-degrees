import React, { useEffect, useState } from 'react';

const Weather = ({props}) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const maxScroll = window.innerHeight * 0.2;
    const newSize = Math.max(10 - (scrollPosition / maxScroll) * 5, 5);

    const degreesStyle = {
        fontSize: `${newSize}vh`,
    };

    return (
        <div className="Weather">
            <h1 id="location">{props.selectedLocation}</h1>
            <h1 id="degrees" style={degreesStyle}><i className={props.weatherIcon}></i>{props.degrees.avgDegrees}°</h1>
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