import React, { useEffect, useState } from 'react';
import './App.css';
import './BottomBar';
import Weather from './Weather';
import BottomBar from './BottomBar';
import Search from './Search';
import Settings from './Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const [location, setLocation] = useState(JSON.parse(localStorage.getItem('location')) || {'loc': 'Location', 'lat': 0, 'lon': 0});
    const [allTheDegrees, setDegrees] = useState(JSON.parse(localStorage.getItem('allTheDegrees')) || {
        'avgDegrees': 0,
        'lowestDegrees': 0,
        'highestDegrees': 0,
        'degrees': {
            'OMW': {}
        }
    });
    const [weatherIcon, setWeatherIcon] = useState("fi fi-rr-sun");

    const weatherIcons = {'sun': 'fi fi-rr-sun', 'cloud-sun': "fi fi-rr-cloud-sun."};

    const APIkeys = {
        'OMW': ''
    };

    const settings = {
        'unit': 'metric'
    }

    // getting geolocation and a reverse geocode, then save it (promise because when it gets called it needs to wait for the user to give location access)
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetch(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    .then((response) => response.json())
                    .then((response) => {setLocation({
                        'loc': response.address.city || response.address.town,
                        'lat': position.coords.latitude,
                        'lon': position.coords.longitude});
                        resolve(true);
                    });
                },
                () => {
                    console.log("user dumb");
                    resolve(false);
                }
                );
            } else {
                console.log("device dumb");
                resolve(false);
            }
        });
    };

    // get OpenWeatherMap data
    const getOMW = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIkeys.OMW}&units=${settings.unit}`)
            .then((response) => response.json())
            .then((response) => {
                setDegrees({...allTheDegrees, degrees: { ...allTheDegrees.degrees, OMW: response}});
                resolve(true);
            });
        });
    };

    const composeWeather = () => {
        setDegrees({...allTheDegrees, avgDegrees: Math.round(allTheDegrees.degrees.OMW.main.temp)});
    };

    // start setup on page load
    useEffect(() => {
        const init = async () => {
            if (await getLocation()) {
                await Promise.all([getOMW()]);
                composeWeather();
            }
        };

        init();
    // eslint-disable-next-line
    }, [])

    // save location in localStorage if it changes
    useEffect(() => {
        localStorage.setItem("location", JSON.stringify(location));
    }, [location]);

    // save allTheDegrees in localStorage if it changes
    useEffect(() => {
        localStorage.setItem("allTheDegrees", JSON.stringify(allTheDegrees));
    }, [allTheDegrees]);

    return (
        <div className='Container'>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Weather props={{location, setLocation, allTheDegrees, weatherIcon, weatherIcons,setWeatherIcon}}/>
                    }>
                    </Route>
                    <Route path="/search" element={
                        <Search/>
                    }>
                    </Route>
                    <Route path="/settings" element={
                        <Settings/>
                    }>
                    </Route>
                </Routes>
                <BottomBar/>
            </Router>
        </div>
    );
}

export default App;
