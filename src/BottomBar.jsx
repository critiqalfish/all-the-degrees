import { NavLink } from "react-router-dom";

const BottomBar = () => {
    return (
        <div className="BottomBar">
            <ul className="items">
                <li className="item">
                    <NavLink to="/"><i className="fi fi-rr-cloud-sun"></i>Weather</NavLink>
                </li>
                <li className="item">
                    <NavLink to="/search"><i className="fi fi-rr-search"></i>Search</NavLink>
                </li>
                <li className="item">
                    <NavLink to="/settings"><i className="fi fi-rr-settings"></i>Settings</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default BottomBar