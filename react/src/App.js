import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Signup, Login, Welcome } from './pages/Welcome';
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
          <Route path="" /*element={<sarà il componente fisso che renderizza le schede}*//>
         </Route>
       </Routes>
     </BrowserRouter>   
  )
}

export default App;
