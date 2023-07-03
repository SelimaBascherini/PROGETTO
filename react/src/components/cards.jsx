import { Link, useParams } from "react-router-dom"

export function TripCard({name}) {
    return(
        <div className="card">
            <Link to={`/${name}`}>{name}</Link>
        </div>
    ) 
  }  
