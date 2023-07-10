import axios from 'axios'
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { ButtonGradient } from '../components/button';
import '../Assets/modalDialogBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Dialog ({closeDialog, arrayTrips, oldTripName}){

  const [newTripName, setNewTripName] = useState ('');
  const [newFrom, setNewFrom] = useState ('');
  const [newTo, setNewTo] = useState ('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleModify = async (e) => {
    e.preventDefault()
    if (!newTripName || !newTo || !newFrom) {
      setError(`Inserisci tutti i campi!`);
    } else {
      setError('');    
      try{
        const res = await axios.put(`http://localhost:8000/home/edit/${oldTripName}`, 
        {tripName : newTripName, from : newFrom, to : newTo}); 
          if(res.status === 201){
            closeDialog(false);
            window.location.reload();  //riaggiorna la pagina (dato che non sono riuscita in ALCUN MODO nonostante 3 ore di prove a far aggiornare da solo l'array trips nel componente Home)
          }
      } catch(error){
        console.error(error)
      }
  }}

  return(
      <section className='dialogContainer' >
        <div className='closeBtn'>
          <button onClick={()=> closeDialog(false)}><FontAwesomeIcon id='faXMark' icon={faXmark}/></button>
        </div>                
        <form onSubmit={handleModify}>
          <h2>Modifica il tuo viaggio</h2>
          <span className={error ? "error" : "invisibile"}>{error}</span>
          <input className='coloredInput' value={newTripName} onChange={(e) => setNewTripName(e.target.value)} placeholder="Dove vuoi andare?"/>
            <section className='date'>
              <label htmlFor="dal">Dal:</label>
              <input className='coloredInput' value={newFrom} onChange={(e) => setNewFrom(e.target.value)} type="date" name="dal" />
              <label htmlFor="al">Al:</label>
              <input className='coloredInput' value={newTo} onChange={(e) => setNewTo(e.target.value)} type="date"/>
            </section>
            <ButtonGradient name="Modifica"/>
        </form>
      </section>
  )
}