import React, { useEffect, useState } from 'react';
import './App.css';
import './BottomBar';
import Weather from './Weather';
import BottomBar from './BottomBar';
import Search from './Search';
import Settings from './Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const [selectedLocation, setLocation] = useState(JSON.parse(localStorage.getItem('selectedLocation')) || 'Location');
    const [degrees, setDegrees] = useState({'avgDegrees': 21, 'lowDegrees': 19, 'highDegrees': 23, 'degrees': {}});

    useEffect(() => {
        localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));
    }, [selectedLocation]);

    return (
        <div className='Container'>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Weather selectedLocation={selectedLocation} setLocation={setLocation} degrees={degrees}/>
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
