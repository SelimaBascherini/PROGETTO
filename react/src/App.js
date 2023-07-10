import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup, Login, Welcome } from './pages/Welcome';
import Home from './pages/Home';
import './App.css';


function App () {
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
        </Route>
      </Routes>
    </BrowserRouter>   
  )
}

export default App;
