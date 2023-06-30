import axios from 'axios'
import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import { ButtonGradient } from '../components/button';
import './modal.css'
import './welcome.css'


export default function Modal({closeModal}) {

    const [tripName, setTripName] = useState ('');
    const [from, setFrom] = useState ('');
    const [to, setTo] = useState ('');
    const [error, setError] = useState('');
    // const [trips, setTrips] = useState(['porca', 'puttana', 'eva'])

    const navigate = useNavigate();

    const handleTripName = (e) => {
        setTripName(e.target.value);
    };
    const handleFrom = (e) => {
        setFrom(e.target.value);
    };
    const handleTo = (e) => {
        setTo(e.target.value);
    };


    const handleTrip = async (e) => {
        e.preventDefault()
        if (tripName==='') {
            setError(`Inserisci il nome!`);
        } else {
            setError('');            
            try {
                const res = await axios.post('http://localhost:8000/home/trip', 
                { tripName, from, to, lists:{} });
                if (res.status === 201) {
                    navigate(`/home/${tripName}`)
                } 
            } catch (err) {
                setError(`Non è possibile inserire la scheda. Riprova più tardi.`)
            }
        }
    }

    //  const handleTrips = async () => {
    //      const newTripsArray = [...trips];
    //      newTripsArray.push(tripName);
    //      setTrips(newTripsArray);
    //      setTripName("");
    //    };
    

    return (
        <section className='modalBg'>
            <div className='modalContainer'>
                <div className='closeBtn'>
                    <button onClick={()=> closeModal(false)}>x</button>
                </div>                
                <span>Il tuo prossimo viaggio</span>
                <form onSubmit={handleTrip}>
                    <input value={tripName} onChange={handleTripName} placeholder="Dove vuoi andare?"/>
                    <section className='date'>
                        <label htmlFor="dal">Dal:</label>
                        <input value={from} onChange={handleFrom} type="date" name="dal" />
                        <label htmlFor="al">Al:</label>
                        <input value={to} onChange={handleTo} type="date"/>
                    </section>
                    <ButtonGradient name="Crea"/>
                </form>
                <p className={error ? "error" : "invisibile"}>{error}</p>
            </div>
        </section>
    )
}

//prossimo step: onClick del crea per creare il viaggio nel db con insertTrip. 
// una volta creato il trip nel database, visualizzare nella home e sotto il link
// del router la scheda creata (col nome e le date prese dal db)