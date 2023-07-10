import axios from 'axios'
import React from 'react';
import {useState} from "react"
import '../Assets/welcome.css'
import logo from '../Assets/images/Woanderlist_Logo.png'
import { Link, useNavigate } from "react-router-dom"
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

  //La funzione handleSubmit esegue la richiesta POST utilizzando Axios e gestisce la risposta o gli errori ottenuti. Non è necessario utilizzare useEffect perché la chiamata viene effettuata direttamente al momento del submit del form, senza bisogno di aspettare un evento specifico o un cambio di stato.
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password ) {
        setError('Inserisci tutti i campi');
    } else {
        setError('');            
        try {
          const res = await axios.post('http://localhost:8000/signup', 
          { email, username, password });
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
              <input className='coloredInput' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="email"/>
              <input className='coloredInput' value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="username"/>
              <input className='coloredInput' type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="password"/>
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
          <input className='coloredInput' value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="username"/>
          <input className='coloredInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
          <ButtonGradient name="Login"/>
        </form>
        <p className={error ? "error" : "invisibile"}>{error}</p>
      </section>
    </div>
    )
  }