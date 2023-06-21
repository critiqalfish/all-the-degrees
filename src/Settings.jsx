const Settings = ({props}) => {
    return (
        <div className="Settings">
            <h1>Settings</h1>
            <div className="Preferences">
                <h4>Preferences</h4>
                <div className="PreferenceBox">
                    <div className="PreferenceItem">
                        <label htmlFor="">Unit</label>
                        <select value={props.preferences.unit} onChange={(e) => {props.setPreferences({...props.preferences, unit: e.target.value})}}>
                            <option value='Kelvin'>Kelvin</option>
                            <option value='Celsius'>Celsius</option>
                            <option value='Fahrenheit'>Fahrenheit</option>
                        </select>
                        <span>{props.preferences.unit}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings