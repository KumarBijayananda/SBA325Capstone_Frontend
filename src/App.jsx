//Dependencies
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Draft from './pages/Draft';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={< Login/>}/>
      <Route path ='/signup' element={< Signup/>}/>
      <Route path ='/dashboard' element={<Dashboard/>}/> 
      <Route path ='/draft' element={< Draft/>}/>
      <Route path='*' element={<h1>404 Not Found</h1>} />

    </Routes>
     
    </>
  )
}

export default App
