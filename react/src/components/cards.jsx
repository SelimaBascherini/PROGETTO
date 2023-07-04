import { Link, useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'


export function TripCard({name, from, to, elements}) {
    const [error, setError] = useState('');
    const [item, setItem] = useState("")
    const [quantity, setQuantity] = useState('');
    const [updatedElements, setUpdatedElements] = useState([]);

    const elementName = { name };  //questa è una prop
    const elementBody = { item, quantity };    //questi sono gli useState. Un oggetto con chiave e valore uguali {item:item, quantity:quantity} lo puoi scrivere come {item, quantity}

    useEffect(() => {
      setUpdatedElements(elements);
    }, [elements]);
  
    const handleItems = async () => {
      try {
        const res = await axios.put(`http://localhost:8000/home/${name}`, {
          item,
          quantity,
        });
        if (res.status === 201) {
          const newItem = { item, quantity };
          setUpdatedElements([...updatedElements, newItem]);
          setItem('');
          setQuantity('');
        }
      } catch (error) {
        console.error(error);
      }
    };

    return(
        <div className="card">
            <header>
                <h2>{name}</h2>
                <section>
                    <div>
                        <span>from:</span>
                        <span>{from}</span>
                    </div>
                    <div>
                        <span>to:</span>
                        <span>{to}</span>
                    </div>
                </section>
            </header>
            <main>
                <div> 
                    <input value={item} onChange={(e) => setItem(e.target.value)}></input>
                    <input type="number" className="listInput" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1"></input>
                    <button className="openModalBtn" onClick={handleItems}><FontAwesomeIcon id='faPlus' icon={faPlus} /></button>
                    <p className={error ? "error" : "invisibile"}>{error}</p>
                </div>
            </main>
            <section className="scrollableSection">
                <ul>
                    {
                        updatedElements.map((el, i)=> (
                            <li key={i}><div>{el.item} {el.quantity}</div></li>
                        ))
                    }
                </ul>
            </section>
        </div>
    ) 
  }  
