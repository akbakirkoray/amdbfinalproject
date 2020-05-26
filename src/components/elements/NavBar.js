import React, {useState, useEffect, useRef} from "react";
import {Link} from "@reach/router";
// CSS
import "../NavBar.css";

const NavBar = ({searchCallback}) => {

    const [state, setState] = useState("");
    const searchRef = useRef(""); // prevents re-renders

    useEffect(() => {
        setTimeout(() => {
            if (state === searchRef.current.value) {
                searchCallback(state); // searchMovies function
            } else {
                return null;
            }
        }, 1000);
    }, [state]);

    const urlRegex = RegExp(/\/[1-9]/); // checks if homepage or not
    const currentUrl = window.location.href; // receives current URL

    return (

        <div className="NavBarMain">

            <div>
                <Link to="/">
                    <img className="AmdbLogo" src="./images/amdbLogo.svg"
                         alt="logo"/>
                </Link>
                <Link to="/">
                    <span className="AmdbLogoText">AMDb</span>
                </Link>
            </div>

            {urlRegex.test(currentUrl) ? // Shorter way ???
                null : <input
                    className="SearchInput"
                    type="text"
                    placeholder="Search Movie"
                    ref={searchRef}
                    value={state}
                    onChange={event => setState(event.target.value)}
                />
            }

            <div>
                <span className="TmdbLogoText">Powered by</span>
                <img className="TmdbLogo" src="./images/tmdbLogo.svg" alt="logo"/>
            </div>

        </div>
    );
};

export default NavBar;