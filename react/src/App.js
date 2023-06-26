// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"
import './/pages/welcome.css'
import logo from './Assets/Woanderlist_Logo.png'

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';



function Welcome (){
  return (
      <div className="container">
          <img src={logo} alt="logo"/>
          <p>Registrati o effettua il login e inizia a programmare la tua vacanza.</p>
          <div className="login-signup">
              <LogSigButton url="/login" name='Login'/>
              <LogSigButton url="/signup" name='Signup'/>
          </div>
      </div>
  )
}

function LogSigButton({url, name}) {
  return(
      <Link to={url}>{name}</Link>
  )
}

function App() {
  return (
      <BrowserRouter>
       <Routes>
         <Route path="/">
          <Route index element={<Welcome/>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
         </Route>
         <Route path="/Home">
          <Route index element={<Home/>} />
          {/* <Route path="" element={< />} />
          <Route path="" element={< />} /> */}
         </Route>

       </Routes>
     </BrowserRouter>   
  )
}

export default App;
