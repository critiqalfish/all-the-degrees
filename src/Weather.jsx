import React, { useEffect, useState } from 'react';
import './Spinner.css';

const Weather = ({props}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [highlowOpacity, setHighlowOpacity] = useState(1);
    const [scrolledDown, setScrolledDown] = useState(false);

    // animation for making main weather info smaller when scrolling down
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;

            setScrollPosition(currentPosition);

            if (currentPosition >= window.innerHeight * 0.1 && currentPosition < window.innerHeight * 0.18) {
                const opacity = 1 - ((currentPosition - window.innerHeight * 0.1) / (window.innerHeight * 0.08));
                setHighlowOpacity(opacity);
            } else if (currentPosition >= window.innerHeight * 0.18 && currentPosition < window.innerHeight * 0.24) {
                const opacity = (currentPosition - window.innerHeight * 0.18) / (window.innerHeight * 0.06);
                setHighlowOpacity(opacity);
            } else {
                setHighlowOpacity(1);
            }
            
            if (currentPosition >= window.innerHeight * 0.18) {
                setScrolledDown(true);
            } else {
                setScrolledDown(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const newSize = Math.max(Math.min(10 - (scrollPosition / (window.innerHeight * 0.04)), 14), 4.4);
    if (newSize === 14) {
        props.setRefresh(true);
    }

    return (
        <div className="Weather">
            <div className='spinner' style={props.refresh ? {display: 'initial'} : {display: 'none'}}>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
            </div>
            <h1 id="location">{props.location.loc}</h1>
            <div id='degrees' className={scrolledDown ? 'scrolledDown' : ''}>
                <h1 id="temperature" style={{ fontSize: `${newSize}vh` }}><i className={props.weatherIcon}></i>{props.allTheDegrees.avgDegrees}°</h1>
                <div id='highlow' className={scrolledDown ? 'scrolledDown' : ''} style={{ opacity: highlowOpacity}}>
                    <h3 id="low"><i className='fi fi-rr-temperature-down'></i> {props.allTheDegrees.lowestDegrees}°</h3>
                    <h3 id="high"><i className='fi fi-rr-temperature-up'></i> {props.allTheDegrees.highestDegrees}°</h3>
                </div>
            </div>
            <div className='boxes'>
                <div className="box" id="hourly">
                    
                </div>
                <div className="box" id="weathers">
                    
                </div>
            </div>
        </div>
    )
}

export default Weather