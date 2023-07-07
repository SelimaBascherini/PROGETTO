import '../Assets/home.css'
import profilePic from '../Assets/images//patrick-stella.jpg'
import logo from '../Assets/images/Woanderlist_Logo.png'
import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faGears, faTrash, faPen} from '@fortawesome/free-solid-svg-icons'
import  Modal from "../components/modal"
import Dialog from '../components/dialog'
import { TripCard } from '../components/cards'

export function Home() {
      
    const [trips, setTrips] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
    
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


    const openDialogBox = (e) => {  //funzione per aprire la dialog
        setOpenDialog(true);    //cambia false a true
        setDialogPosition({ x: e.clientX, y: e.clientY }); // {x : numero y: numero}
        console.log(JSON.stringify(dialogPosition))
    };
        
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
                        <a href='#home'>Home</a>
                    </nav>
                    <h3>TRIPS</h3>
                    <nav className='tripBar'>
                        {
                        trips.map((t, i) =>
                            <div key={i}>
                                <a href={`#${t.tripName}`} >{t.tripName}</a>
                                <div>
                                    <button onClick={()=>handleDeleteTrip(i)}><FontAwesomeIcon id='faTrash' icon={faTrash} /></button>
                                    <button onClick={openDialogBox}><FontAwesomeIcon id='faPen' icon={faPen}/></button>                                
                                </div>
                            </div>
                        )}
                    </nav> 
                <footer>
                    <FontAwesomeIcon id='faGears' icon={faGears} />
                    <Link to='/help'>Help & Support</Link>
                </footer>
                </section>
                <section className="viewCards">
                    <div>
                        <h1 id='home' className='marginScroll'>Home</h1>
                    </div>
                    <main>
                        {
                            trips.map((t) =>
                                <TripCard id={t.tripName} name={t.tripName} from={t.from} to={t.to} elements={t.elements}/>
                            )
                        }
                    </main>
                </section>
            </section>            
        {openModal && <Modal closeModal={setOpenModal} addTrips={setTrips} arrayTrips={trips}/>}
        {openDialog && <Dialog closeDialog={setOpenDialog} arrayTrips={trips} position={dialogPosition}/>}
        </main>
    )
}