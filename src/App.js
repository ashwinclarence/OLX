import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Signup from '../src/Pages/Signup'
import Login from '../src/Pages/Login'
import ProfilePage from '../src/Pages/ProfilePage'
import UpdatePasswordUser from '../src/Pages/UpdatePasswordUser'
import ProductSell from '../src/Pages/ProductSell'

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route exact path='/' element={<Home />} ></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/update-password' element={<UpdatePasswordUser/>}></Route>
        <Route path='/sell-product' element={<ProductSell/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
