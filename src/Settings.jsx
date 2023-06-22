const Settings = ({props}) => {
    return (
        <div className="Settings">
            <h1>Settings</h1>
            <div className="Preferences">
                <h4>Preferences</h4>
                <div className="PreferenceBox">
                    <div className="PreferenceItem">
                        <label>Unit</label>
                        <select value={props.preferences.unit} onChange={(e) => {props.setPreferences({...props.preferences, unit: e.target.value})}}>
                            <option value='Kelvin'>Kelvin</option>
                            <option value='Celsius'>Celsius</option>
                            <option value='Fahrenheit'>Fahrenheit</option>
                        </select>
                        <span>{props.preferences.unit}</span>
                    </div>
                </div>
            </div>
            <div className="APIkeys">
                <h4>API keys</h4>
                <div className="PreferenceBox">
                    <div className="PreferenceItem">
                        <label>OpenWeatherMap</label>
                        <input type='text' placeholder='N/A' value={props.APIkeys.OMW} onChange={(e) => {props.setAPIkeys({...props.APIkeys, OMW: e.target.value})}}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings