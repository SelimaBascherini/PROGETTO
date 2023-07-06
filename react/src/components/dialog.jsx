import axios from 'axios'
import {useState} from "react"
import { ButtonGradient } from '../components/button';
import '../Assets/modalDialogBox.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Dialog({closeDialog, arrayTrips, position}){
    
    const [newTripName, setNewTripName] = useState ('');
    const [newFrom, setNewFrom] = useState ('');
    const [newTo, setNewTo] = useState ('');
    const [error, setError] = useState('');
    
    const handleNewTripName = (e) => {
        setNewTripName(e.target.value);
    };
    const handleNewFrom = (e) => {
        setNewFrom(e.target.value);
    };
    const handleNewTo = (e) => {
        setNewTo(e.target.value);
    };

    const handleModify = async (e) => {
        e.preventDefault()
        if (newTripName==='' && newTo === "" && newFrom === "") {
            setError(`Inserisci tutti i campi!`);
        } else {
            setError('');    
            try{
                const res = await axios.put()
            } catch{
                
            }
    }}

    const dialogStyle = {
        left: `${position.x}px`,
        top: `${position.y}px`
      };

    return(
        <>
        <section className='dialogContainer' style={dialogStyle}>
                <div className='closeBtn'>
                    <button onClick={()=> closeDialog(false)}><FontAwesomeIcon id='faXMark' icon={faXmark}/></button>
                </div>                
                <form onSubmit={handleModify}>
                    <h2>Modifica il tuo viaggio</h2>
                    <input value={newTripName} onChange={handleNewTripName} placeholder="Dove vuoi andare?"/>
                    <section className='date'>
                        <label htmlFor="dal">Dal:</label>
                        <input value={newFrom} onChange={handleNewFrom} type="date" name="dal" />
                        <label htmlFor="al">Al:</label>
                        <input value={newTo} onChange={handleNewTo} type="date"/>
                    </section>
                    <ButtonGradient name="Modifica"/>
                </form>
                <p className={error ? "error" : "invisibile"}>{error}</p>
        </section>
        </>
    )
}