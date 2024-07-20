import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/rooms/AddRoom'
import ExistingRooms from './components/rooms/ExistingRooms'
import Footer from './components/layout/Footer.jsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import EditRoom from './components/rooms/EditRoom.jsx'
import NavBar from './components/layout/NavBar.jsx'

function App() {


  return (
    <>
    <NavBar/>
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/editroom/:roomId" element={<EditRoom />}/>
          <Route path="/existingrooms" element={<ExistingRooms />}/>
          <Route path="/addroom" element={<AddRoom />}/>

        </Routes>
      </Router>
    </main>
    <Footer/>
    
    </>
  )
}

export default App
