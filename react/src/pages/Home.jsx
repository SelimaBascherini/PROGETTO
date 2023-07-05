import './home.css'
import profilePic from '../Assets/patrick-stella.jpg'
import logo from '../Assets/Woanderlist_Logo.png'
import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faGears, faTrash, faPen} from '@fortawesome/free-solid-svg-icons'
import  Modal from "./modal"
import { TripCard } from '../components/cards'

export function Home() {
      
    const [trips, setTrips] = useState([])
    const [openModal, setOpenModal] = useState(false)
    
    useEffect(() => {
        async function tripsCall(){
            const res = await axios.get('http://localhost:8000/home/trips')
            const tripGroup = [...trips];
            for (let i = 0; i < res.data.length; i++) {
                const trip = res.data[i];
                tripGroup.push(trip);
            }
            setTrips(tripGroup)
        }
        tripsCall()
    }, [])
        
    async function handleDeleteTrip(i){
        try {
            let tripDeleted = trips[i]
            const res = await axios.delete(`http://localhost:8000/home/${tripDeleted.tripName}`)
            if (res.status === 201) {
                const newTrips = [...trips];
                newTrips.splice(i, 1)
                setTrips(newTrips)        
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleModifyTrip(i) {
        // let tripDeleted = trips[i]
        // const res = await axios.delete(`http://localhost:8000/home/${tripDeleted.tripName}`)
        // const newTrips = [...trips];
        // newTrips.splice(i, 1)
        // setTrips(newTrips)
    }
        
    return(
        <main className="homepage">
            <header className='fixedHeader'>
                <img className="logo" src={logo} alt="logo"/>   
                <div className='newTripBtn'>
                    <span>Quale viaggio organizzeremo oggi?</span>
                    <button className="openModalBtn" onClick={() => {setOpenModal(true)}}><FontAwesomeIcon id='faPlus' icon={faPlus} /></button>
                </div>                 
                <img className="profilePic" src={profilePic} alt="profile"/>
            </header>
            <section className="mainInterface">
                <section className="linkSection">
                    <h3>MAIN</h3>
                    <nav>
                        <Link to='/home'>Home</Link>
                    </nav>
                    <h3>TRIPS</h3>
                    <nav className='tripBar'>
                        {
                        trips.map((t, i) =>
                            <div key={i}>
                                <Link to={`/${t.tripName}`} >{t.tripName}</Link>
                                <div>
                                    <button onClick={()=>handleDeleteTrip(i)}><FontAwesomeIcon id='faTrash' icon={faTrash} /></button>
                                    <button onClick={()=>handleModifyTrip(i)}><FontAwesomeIcon id='faPen' icon={faPen}/></button>
                                </div>
                            </div>
                        )
                        }
                    </nav> 
                <footer>
                    <FontAwesomeIcon id='faGears' icon={faGears} />
                    <Link to='/help'>Help & Support</Link>
                </footer>
                </section>
                <section className="viewCards">
                    <div>
                        <h1>Home</h1>
                    </div>
                    <main>
                        {
                            trips.map((t) =>
                                <TripCard name={t.tripName} from={t.from} to={t.to} elements={t.elements}/>
                            )
                        }
                    </main>
                </section>
            </section>            
        {openModal && <Modal closeModal={setOpenModal} addTrips={setTrips} arrayTrips={trips}/>}
        </main>
    )
}