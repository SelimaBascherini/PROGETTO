import './home.css'
import profilePic from '../Assets/patrick-stella.jpg'
import logo from '../Assets/Woanderlist_Logo.png'
import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faGears } from '@fortawesome/free-solid-svg-icons'
import  Modal from "./modal"
import { TripCard } from '../components/cards'

export function Home() {

    const [openModal, setOpenModal] = useState(false)
    const [trips, setTrips] = useState([])

    useEffect(() => {
        async function tripsCall(){
            const res = await axios.get('http://localhost:8000/home')
            const tripNames = [];
            for (let i = 0; i < res.data.length; i++) {
            const trip = res.data[i];
            const tripName = trip.tripName;
            tripNames.push(tripName);
            }
            setTrips(tripNames)
        }
        tripsCall()
    }, [])

    return(
        <main className="homepage">
            <header>
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
                    <nav>
                        {
                        trips.map((t) =>
                            <div><Link to={`/${t}`} >{t}</Link></div>
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
                        <span></span>
                    </div>
                    <main>
                        {
                            trips.map((t) =>
                                <TripCard name={t}/>
                            )
                        }
                    </main>
                </section>
            </section>            
{openModal && <Modal closeModal={setOpenModal}/>}
        </main>
    )
}
