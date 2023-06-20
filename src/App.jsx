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
    const [degrees, setDegrees] = useState({'avgDegrees': 21, 'lowestDegrees': 19, 'highestDegrees': 23, 'degrees': {'OMW': {}}});
    const [weatherIcon, setWeatherIcon] = useState("fi fi-rr-sun");

    const weatherIcons = {'sun': 'fi fi-rr-sun', 'cloud-sun': "fi fi-rr-cloud-sun"};

    const APIkeys = {
        'OMW': '5c4d19f49fc7e48132fe11089d9a57ab'
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
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIkeys.OMW}&units=${settings.unit}`)
        .then((response) => response.json())
        .then((response) => setDegrees(...degrees, ...: {})) // continue here (nested spread op)
    }

    // start setup on page load
    useEffect(() => {
        const init = async () => {
            const locationPermissionGranted = await getLocation();
            if (locationPermissionGranted) {
                getOMW();
            }
        };

        init();
    }, [])

    // save location in localStorage if location changes
    useEffect(() => {
        localStorage.setItem("location", JSON.stringify(location));
    }, [location]);

    return (
        <div className='Container'>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Weather props={{location, setLocation, degrees, weatherIcon, weatherIcons,setWeatherIcon}}/>
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
