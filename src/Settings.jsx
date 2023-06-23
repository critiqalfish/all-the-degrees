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
            <div className="Miscellaneous">
                <h4>Miscellaneous</h4>
                <div className="PreferenceBox">
                    <div className="PreferenceItem">
                        <label htmlFor="button">Reset Preferences</label>
                        <input type="button" style={{borderRadius: '8px 8px 0px 0px'}} onClick={(e) => {props.resetPreferences()}}></input>
                    </div>
                    <hr/>
                    <div className="PreferenceItem">
                        <label htmlFor="button">Reset API keys</label>
                        <input type="button" style={{borderRadius: '0px'}} onClick={(e) => {props.resetAPIkeys()}}></input>
                    </div>
                    <hr/>
                    <div className="PreferenceItem">
                        <label htmlFor="button" style={{color: '#ff2240'}}>Clear localStorage</label>
                        <input type="button" style={{borderRadius: '0px 0px 8px 8px'}} onClick={(e) => {props.clearLocalStorage()}}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings