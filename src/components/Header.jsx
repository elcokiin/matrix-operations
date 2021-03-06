import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { setDarkMood, selectDarkMood } from "../reducers/darkMood";

import navigationItems from '../data/navigationItems';

import { SiUnrealengine } from 'react-icons/si';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FiMenu } from "react-icons/fi";

import "../assets/styles/components/Header.css";

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const darkMoodObj = useSelector(selectDarkMood);
    const darkMood = darkMoodObj.darkMood;
    const app = document.querySelector(".app");
    const [toggleDisplayHeader ,setToggleDisplayHeader] = useState(false);

    const handleDarkMood = () => {
        if(darkMood === "true"){
            localStorage.setItem("dark-mood", false);
            app.classList.remove("app__dark-mood")
        }
        else{
            localStorage.setItem("dark-mood", true);
            app.classList.add("app__dark-mood");
        }

        dispatch(setDarkMood({
            darkMood: localStorage.getItem("dark-mood")
        }))
    }
    if(darkMood === "true"){
        app.classList.add("app__dark-mood")
    }

    return(
        <header className={`navigation ${darkMood === "true" && "navigation__dark-mood"}`}>
            <button onClick={() => setToggleDisplayHeader(true)}
                className="navigation__hamburger">
                <FiMenu />
            </button>
            <Link to="/" className="navigation__logo">matrix</Link>
            <nav className={`navigation__items ${toggleDisplayHeader && "navigation__items-translate"}`}>
                <button className="navigation__close" onClick={() => setToggleDisplayHeader(false)}>
                    X
                </button>
                <div className="navigation__container-items">
                    {
                        navigationItems.map(item => {
                            if(item.icon){
                                return (
                                    <a href={item.pathname}
                                            className="navigation__item navigation__item--icon"
                                            key={item.id}
                                            rel="noopener noreferrer"
                                            title="GitHub Repository"
                                            target="_blank">
                                        {item.content}
                                    </a>)
                            }
                            return (
                                <Link to={item.pathname}
                                        className={`navigation__item ${item.pathname === location.pathname && "navigation__item--active"}`}
                                        key={item.id}>
                                    {item.content.toUpperCase()}
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="navigation__item-action">
                    <i  className="navigation__item navigation__item--icon"
                        onClick={handleDarkMood}>
                        {darkMood === "true" ?  <BsMoon /> : <BsSun />}
                    </i>
                    <i className="navigation__item navigation__item--icon language__drop-down">
                        <SiUnrealengine />
                        <IoMdArrowDropdown />
                    </i>
                </div>
            </nav>
        </header>
    )
}

export default Header;