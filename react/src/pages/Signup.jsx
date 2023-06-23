import {useState, useEffect} from "react"
import './log-sig.css'
import logo from '../Assets/Woanderlist_Logo.png'
import axios from 'axios'
import { Outlet, Link } from "react-router-dom"


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
                const res = await axios.post('http://localhost:3000/signup', 
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
                <section className="container">
                    <h1>La registrazione è andata buon fine!</h1>
                    <p>
                        <Link to="/login">Login</Link>
                    </p>
                </section>
            ) : (
            <section className="container">
                <img src={logo} alt="logo"/>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={handleEmail} placeholder="email"/>
                    <input value={username} onChange={handleUsername} placeholder="username"/>
                    <input type="password" value={password} onChange={handlePassword} placeholder="password"/>
                    <button>Signup</button>
                </form>
                <p className={error ? "error" : "invisibile"}>{error}</p>
            </section>
            )}
        </>
    )
  }

//   setEmail('');
//   setPassword('');
//   setUsername('');