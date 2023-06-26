import {useState, useEffect} from "react"
// import './home.css'
import React from 'react';
import profilePic from '../Assets/patrick-stella.jpg'
import { Link } from "react-router-dom"


//l'indirizzo di questa pagina è: http://localhost:3000/home

export function Home() {
    return(
        <body>
            <section className="user-section">
                <header>
                    <img src={profilePic} alt="profile"/>
                    <span>Username</span>
                </header>
                <Link to='/home'>Home</Link>

            </section>
            <section className="view"></section>
        </body>
    )
}

