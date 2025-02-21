//Dependencies
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';

function App() {

  return (
    <>
    {/* <nav>
      <Link to={'/'}></Link>
      <Link to={'/'}></Link>
    </nav> */}

    <Routes>
      <Route path='/' element={<Home/>}/>
      {/* <Route />
      <Route />
      <Route /> */}
    </Routes>
     
    </>
  )
}

export default App
