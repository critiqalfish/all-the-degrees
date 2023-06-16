import React, { useEffect, useState } from 'react';
import './App.css';
import './BottomBar';
import Weather from './Weather';
import BottomBar from './BottomBar';
import Search from './Search';
import Settings from './Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const [selectedLocation, setLocation] = useState(localStorage.getItem('selectedLocation') || 'Location');
    const [degrees, setDegrees] = useState({'avgDegrees': 21, 'lowDegrees': 19, 'highDegrees': 23, 'degrees': {}});
    const [weatherIcon, setWeatherIcon] = useState("fi fi-rr-sun");

    const weatherIcons = {'sun': 'fi fi-rr-sun isun', 'cloud-sun': "fi fi-rr-cloud-sun icloudsun"};

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                .then((response) => response.json())
                .then((response) => {setLocation(response.address.city || response.address.town)})
            }, () => {console.log("user dumb")})
        }
        else {
            console.log("device dumb");
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("selectedLocation", selectedLocation);
    }, [selectedLocation]);

    return (
        <div className='Container'>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Weather props={{selectedLocation, setLocation, degrees, weatherIcon, weatherIcons,setWeatherIcon}}/>
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
