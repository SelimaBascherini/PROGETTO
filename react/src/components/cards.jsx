import { Link, useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export function TripCard({name, from, to, elements}) {
    const [error, setError] = useState('');
    const [item, setItem] = useState("")
    const [quantity, setQuantity] = useState('1');
    const [addedElements, setAddedElements] = useState([]);

    const elementName = { name };  //questa è una prop
    const elementBody = { item, quantity };    //questi sono gli useState. Un oggetto con chiave e valore uguali {item:item, quantity:quantity} lo puoi scrivere come {item, quantity}

    useEffect(() => {
      setAddedElements(elements);
    }, [elements]);
  
    const handleItems = async () => {
      if (item !== "" && quantity !== "") {
        setError("")
        try {
          const res = await axios.put(`http://localhost:8000/home/${name}`, {
            item,
            quantity,
          });
          if (res.status === 201) {
            const newItem = { item, quantity };
            setAddedElements([...addedElements, newItem]);
            setItem('');
            setQuantity('1');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setError('Inserisci tutti i campi')
      }
    };

  async function handleDeleteElement(i){  
    try {
      let elementDeleted = addedElements[i]
      const res = await axios.delete(`http://localhost:8000/home/${name}/elements/${elementDeleted.item}/${elementDeleted.quantity}`)  
        if(res.status === 201){
          const newElement = [...addedElements];
          newElement.splice(i, 1)
          setAddedElements(newElement)
        }
    } catch (error) {
      console.error(error);
    }
  }

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
                    <input type="number" className="listInput" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                    <button className="openModalBtn" onClick={handleItems}><FontAwesomeIcon id='faPlus' icon={faPlus} /></button>
                </div>
                <p className={error ? "error" : "invisibile"}>{error}</p>
            </main>
            <section className="scrollableSection">
                <ul>
                    {
                        addedElements.map((el, i)=> (
                            <li key={i} className="elementList">
                              <div>
                                  <span>{el.item}</span> 
                                  <span>{el.quantity}</span>
                              </div>
                              <div>
                                <FontAwesomeIcon id='faTrash' icon={faTrash} onClick={() => handleDeleteElement(i)}/>
                                <FontAwesomeIcon id='faPen' icon={faPenToSquare} />
                              </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    ) 
  }  
