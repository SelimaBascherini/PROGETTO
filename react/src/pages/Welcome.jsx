import React from 'react';
import {useState, useEffect} from "react"
import './welcome.css'

import logo from '../Assets/Woanderlist_Logo.png'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import { LogSigButton, ButtonGradient } from '../components/button';

export function Welcome (){
    return (
        <div className="background">
            <div className="container">
                <img src={logo} alt="logo"/>
                <p>Registrati o effettua il login e inizia a programmare la tua vacanza.</p>
                <div className="login-signup">
                    <LogSigButton url="/login" name='Login'/>
                    <LogSigButton url="/signup" name='Signup'/>
                </div>
            </div>
        </div>
    )
  }
  

export function Signup (){
    const [email, setEmail] = useState ('');
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    //La funzione handleSubmit esegue la richiesta POST utilizzando Axios e gestisce la risposta o gli errori ottenuti. Non è necessario utilizzare useEffect perché la chiamata viene effettuata direttamente al momento del submit del form, senza bisogno di aspettare un evento specifico o un cambio di stato.
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username === '' || email === '' || password === '') {
            setError('Inserisci tutti i campi');
        } else {
            setError('');            
            try {
                const res = await axios.post('http://localhost:8000/signup', 
                { email,username,password });
                if (res.status === 201) {
                    setSubmitted(true);
                } 
            } catch (err) {
                setError('Username non disponibile')
            }
        }
    }

    return (
        <>
            {submitted ? (
               <div className="background">
                    <section className="container">
                        <img src={logo} alt="logo"/>
                        <p>La registrazione è andata buon fine!</p>
                        <p><Link to="/login" className="link">Login</Link></p>
                    </section>
               </div>
            ) : (
                <div className="background">
                    <section className="container">
                        <img src={logo} alt="logo"/>
                        <form onSubmit={handleSubmit}>
                            <input value={email} onChange={handleEmail} placeholder="email"/>
                            <input value={username} onChange={handleUsername} placeholder="username"/>
                            <input type="password" value={password} onChange={handlePassword} placeholder="password"/>
                            <ButtonGradient name="Signup"/>
                        </form>
                        <p className={error ? "error" : "invisibile"}>{error}</p>
                    </section>
                </div>
            )}
        </>    
    )
  }

  export function Login() {

    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };


    const handleLogin = async (e) => {
        e.preventDefault()
        if (!username || !password) {
            setError('Inserisci tutti i campi');
        } else {
            setError('');            
            try {
                const res = await axios.post('http://localhost:8000/login', 
                { username, password });
                if (res.status === 201) {
                    navigate('/home')
                } 
            } catch (err) {
                setError(`L'utente non esiste. Riprova.`)
            }
        }
    }
    return(
        <div className="background">
            <section className="container">
                <img src={logo} alt="logo"/>
                <form onSubmit={handleLogin}>
                    <input value={username} onChange={handleUsername} placeholder="username"/>
                    <input type="password" value={password} onChange={handlePassword} placeholder="password"/>
                    <ButtonGradient name="Login"/>
                </form>
                <p className={error ? "error" : "invisibile"}>{error}</p>
            </section>
        </div>
        )
    }