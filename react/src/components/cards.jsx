import {useState, useEffect} from "react"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export function TripCard({name, from, to, elements, id}) {

  const [errorPost, setErrorPost] = useState('');
  const [error, setError] = useState('')


  const [item, setItem] = useState("")
  const [quantity, setQuantity] = useState('1');
  const [addedElements, setAddedElements] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedItem, setEditedItem] = useState("");  //nuovi valori
  const [editedQuantity, setEditedQuantity] = useState("1"); //nuovi valori

  const [oldItem, setOldItem] = useState("");  //vecchi valori
  const [oldQuantity, setOldQuantity] = useState(""); //vecchi valori

  useEffect(() => {
    setAddedElements(elements);
  }, [elements]);

  const handleItems = async () => {
    if (item !== "" && quantity !== "") {
      setErrorPost("")
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
      setErrorPost('Inserisci tutti i campi')
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

// i=1
// [0, 1, 2, 3, 4, 5]
// [0] [1] [2, 3, 4, 5]  
// il nuovo 1 non è quello precedente. Si crea direttamente una copia del vecchio array aggiungendo al posto del precedente lasciato fuori dalla copia effettuata con slice quello nuovo che vogliamo.

  async function handleSaveChanges(i) {  
    if (editedItem !== "" && editedQuantity !== "") {
      setError("")
      try {
        const res = await axios.put(`http://localhost:8000/home/${name}/elements/${oldItem}/${oldQuantity}`, {
          item: editedItem,
          quantity: editedQuantity
        })  
        if(res.status === 201){
          const editedElement = {item:editedItem, quantity:editedQuantity}
          const newElement = [
            ...addedElements.slice(0, i), // Gli elementi precedenti all'indice i
            editedElement,
            ...addedElements.slice(i + 1) // Gli elementi successivi all'indice i
          ];
          setAddedElements(newElement)
          setEditingIndex(null);
          setEditedItem("")
          setEditedQuantity("1")
          setOldItem("")
          setOldQuantity("")
        }
      } catch (error) {
          console.error(error);
      }
    } else {
      setEditingIndex(null)
    }
  }

  const handleEditElement = (index, item, quantity) => {
    setEditingIndex(index); // indice di quello che stiamo modificando
    setOldItem(item);  //ho quelli vecchi
    setOldQuantity(quantity); //quantità vecchia
  };

  return(
      <div className="card">
        <header>
            <h2 id={id} className="marginScroll">{name}</h2>
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
            <p className={errorPost ? "error" : "invisibile"}>{errorPost}</p>
        </main>
        <section className="scrollableSection">
            <ul>
              {addedElements.map((el, i)=> (
                <li key={i} className="elementList">
                  <div>
                    {editingIndex === i ? (
                    <>
                      <section className="inputSection">
                        <input value={editedItem} onChange={(e) => setEditedItem(e.target.value)} placeholder={oldItem}/>
                        <input type="number" className="listInput" value={editedQuantity} onChange={(e) => setEditedQuantity(e.target.value)}/>
                      </section>
                      <p className={error ? "error" : "invisibile"}>{error}</p>
                    </>
                    ) : (
                    <section className="inputSection">
                      <span>{el.item}</span> 
                      <span>{el.quantity}</span>
                    </section>
                    )}
                  </div>
                  <div>
                    <FontAwesomeIcon id='faTrash' icon={faTrash} onClick={() => handleDeleteElement(i)}/>
                    {editingIndex === i ? (
                      <FontAwesomeIcon id='faCheck' icon={faCheck} onClick={() => handleSaveChanges(i)} />
                    ) : (
                      <FontAwesomeIcon id="faPen" icon={faPenToSquare} onClick={() => handleEditElement(i, el.item, el.quantity)}/>
                    )}
                  </div>
                </li>
              ))}
            </ul>
        </section>
      </div>
  ) 
  }
