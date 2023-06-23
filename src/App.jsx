import React, { useEffect, useState } from 'react';
import './App.css';
import './BottomBar';
import Weather from './Weather';
import BottomBar from './BottomBar';
import Search from './Search';
import Settings from './Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [weatherPromises, setWeatherPromises] = useState(0);
    const [location, setLocation] = useState(JSON.parse(localStorage.getItem('location')) || {'loc': 'Location', 'lat': 0, 'lon': 0, 'timestamp': 0});
    const [allTheDegrees, setDegrees] = useState(JSON.parse(localStorage.getItem('allTheDegrees')) || {
        'avgDegrees': 0,
        'lowestDegrees': 0,
        'highestDegrees': 0,
        'degrees': {
            'OWM': {}
        }
    });
    const [weatherIcon, setWeatherIcon] = useState("fi fi-rr-sun");
    const weatherIcons = {'sun': 'fi fi-rr-sun', 'cloud-sun': "fi fi-rr-cloud-sun."};

    const [preferences, setPreferences] = useState(JSON.parse(localStorage.getItem('preferences')) || {'unit': 'Celsius'})
    const unitNames = {
        'OWM': {
            'Kelvin': 'standard',
            'Celsius': 'metric',
            'Fahrenheit': 'imperial'
        }
    };
    const [APIkeys, setAPIkeys] = useState(JSON.parse(localStorage.getItem('APIkeys')) || {'OWM': ''})

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
                        'lon': position.coords.longitude,
                        'timestamp': Date.now()});
                        resolve(true);
                    });
                },
                () => {
                    // user dumb
                    resolve(false);
                }
                );
            } else {
                // device dumb
                resolve(false);
            }
        });
    };

    // get OpenWeatherMap data
    const getOWM = () => {
        return new Promise((resolve, reject) => {
            if (!APIkeys.OWM) {
                notification('Please provide an API key for OpenWeatherMap');
                resolve(false);
            } else {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIkeys.OWM}&units=${unitNames.OWM[preferences.unit]}`)
                .then((response) => response.json())
                .then((response) => {
                    if (response.cod !== 200) {
                        if (response.message.startsWith('Invalid API key')) {
                            notification('Please provide a valid API key for OpenWeatherMap')
                        } else {
                            notification(`Error occured while fetching OpenWeatherMap weather: ${response.message}`);
                        }
                        resolve(false);
                    } else {
                        setDegrees({...allTheDegrees, degrees: { ...allTheDegrees.degrees, OWM: response}});
                        resolve(true);
                    }
                });
            }
        });
    };

    // compose all the weather data from the different APIs
    const composeWeather = (weatherFetches) => {
        if (weatherFetches === 'display' || (weatherFetches[0].status === 'fulfilled' && weatherFetches[0].value === true)) {
            setDegrees({...allTheDegrees, avgDegrees: Math.round(allTheDegrees.degrees.OWM.main !== undefined ? allTheDegrees.degrees.OWM.main.temp : 0)});
        }
    };

    // notify the user about something (inside the web only) (unfinished)
    const notification = (message) => {
        console.log(`### NOTIFICATION ###\n### ${message} ###`);
    };

    // resets the preferences
    const resetPreferences = () => {
        setPreferences({'unit': 'Celsius'});
    };

    // resets the API keys
    const resetAPIkeys = () => {
        setAPIkeys({'OWM': ''});
    };

    // clears the localStorage
    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload();
    };

    // start setup on page load
    useEffect(() => {
        if (!refresh && pageLoaded) return;
        const init = async () => {
            // determine if location is older than 5 minutes
            if (Object.keys(allTheDegrees.degrees.OWM).length === 0 || refresh || Date.now() - location.timestamp > 299 * 1000) {
                if (!await getLocation()) {
                    setRefresh(false);
                    notification("location could not be determined");
                }
            } else {
                setRefresh(false);
            }
        };
        init();
    // eslint-disable-next-line
    }, [refresh])

    // refresh weather and save location in localStorage if it changes
    useEffect(() => {
        localStorage.setItem("location", JSON.stringify(location));

        if (pageLoaded === false) {
            setPageLoaded(true);
            composeWeather('display');
            return;
        }
        const refreshWeather = async () => {
            setWeatherPromises(await Promise.allSettled([getOWM()]))
        };

        if (location.loc !== 'Location') {
            refreshWeather();
        }
        setRefresh(false);
    // eslint-disable-next-line
    }, [location]);

    // compose the weather when the promise is ready
    useEffect(() => {
        if (weatherPromises === 0) return;
        composeWeather(weatherPromises);
        setWeatherPromises(0);
    // eslint-disable-next-line
    }, [weatherPromises])

    // save allTheDegrees in localStorage if it changes
    useEffect(() => {
        localStorage.setItem("allTheDegrees", JSON.stringify(allTheDegrees));
    }, [allTheDegrees]);

    // save preferences in localStorage if it changes
    useEffect(() => {
        localStorage.setItem("preferences", JSON.stringify(preferences));
    }, [preferences]);

    // save APIkeys in localStorage if it changes
    useEffect(() => {
        localStorage.setItem("APIkeys", JSON.stringify(APIkeys));
    }, [APIkeys]);

    return (
        <div className='Container'>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Weather props={{location, setLocation, allTheDegrees, weatherIcon, weatherIcons, setWeatherIcon, refresh, setRefresh}}/>
                    }>
                    </Route>
                    <Route path="/search" element={
                        <Search/>
                    }>
                    </Route>
                    <Route path="/settings" element={
                        <Settings props={{preferences, setPreferences, APIkeys, setAPIkeys, resetPreferences, resetAPIkeys, clearLocalStorage}}/>
                    }>
                    </Route>
                </Routes>
                <BottomBar/>
            </Router>
        </div>
    );
}

export default App;
