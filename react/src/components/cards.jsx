import { Link, useParams } from "react-router-dom"

export function TripCard({name, from, to, elements}) {
    return(
        <div className="card">
            <header>
                <h2>{name}</h2>
                <h5>{from}-{to}</h5>
            </header>
        </div>
    ) 
  }  
