import {useState, useEffect} from "react"
import './log-sig.css'
import logo from '../Assets/Woanderlist_Logo.png'

export function Signup (){
    const [email, setEmail] = useState ('');
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [confirm, setConfirm] = useState ('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
    }
    return (
        <div className="container">
            <img src={logo} alt="logo"/>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={handleEmail} placeholder="email"/>
                <input value={username} onChange={handleUsername} placeholder="username"/>
                <input value={password} onChange={handlePassword} placeholder="password"/>
                <input value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="conferma password"/>
                <button>Signup</button>
            </form>
        </div>
        
    )
  }

  