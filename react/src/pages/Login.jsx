import {useState, useEffect} from "react"
import './log-sig.css'
import logo from '../Assets/Woanderlist_Logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username === '' || password === '') {
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
        <section className="container">
            <img src={logo} alt="logo"/>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={handleUsername} placeholder="username"/>
                <input type="password" value={password} onChange={handlePassword} placeholder="password"/>
                <button>Login</button>
            </form>
            <p className={error ? "error" : "invisibile"}>{error}</p>
        </section>
        )
    }