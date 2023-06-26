import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"
import logo from './Assets/Woanderlist_Logo.png'

import { Signup, Login, Welcome } from './pages/Signup';
import { Home } from './pages/Home';


function App() {
  return (
      <BrowserRouter>
       <Routes>
         <Route path="/">
          <Route index element={<Welcome/>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
         </Route>
         <Route path="/home">
          <Route index element={<Home/>} />
          {/* <Route path="" element={< />} />
          <Route path="" element={< />} /> */}
         </Route>

       </Routes>
     </BrowserRouter>   
  )
}

export default App;
