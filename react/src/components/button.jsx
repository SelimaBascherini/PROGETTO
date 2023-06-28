import { Link } from "react-router-dom"

export function LogSigButton({url, name}) {
    return(
        <Link to={url}>{name}</Link>
    )
  }

export function ButtonGradient({name, onClick}){
    return(
        <button className="gradientButton" onClick={onClick}>{name}</button>
    )
}