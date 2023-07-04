import { Link, useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from 'axios';


export function TripCard({name, from, to, elements}) {
    const [item, setItem] = useState("")
    const [quantity, setQuantity] = useState('');

    const elementName = { name };  //questa è una prop
    const elementBody = { item, quantity };    //questi sono gli useState. Un oggetto con chiave e valore uguali {item:item, quantity:quantity} lo puoi scrivere come {item, quantity}

    const handleItems = async () => {
        const res = await axios.put(`http://localhost:8000/home/${elementName.name}`, elementBody   //passo il nome perchè è ciò che mi indica univocamente il documento es. Bali. passo element body perchè è ciò che voglio inserire nell'array element del documento con quel nome es. sempre Bali. 
    )};

    return(
        <div className="card">
                <h2>{name}</h2>
                <h5>{from}-{to}</h5>
            <main>
                <div> 
                    <input className="listInput" value={item} onChange={(e) => setItem(e.target.value)}></input>
                    <input className="listInput" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                    <button onClick={handleItems}>Aggiungi</button>
                </div>
            </main>
            <ul>
                {
                    elements.map((el, i)=>{
                        <>
                            <li key={i}>{el.item}</li>
                            <li>{el.quantity}</li>
                        </>
                    })
                }
            </ul>
        </div>
    ) 
  }  
