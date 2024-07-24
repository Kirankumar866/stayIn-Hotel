

import AddRoom from './components/rooms/AddRoom'
import ExistingRooms from './components/rooms/ExistingRooms'
import Footer from './components/layout/Footer.jsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import EditRoom from './components/rooms/EditRoom.jsx'
import NavBar from './components/layout/NavBar.jsx'
import RoomListing from './components/rooms/RoomListing.jsx'
import Admin from './components/admin/Admin.jsx'
import BookingSuccess from './components/bookings/BookingSuccess.jsx'
import CheckOut from './components/bookings/CheckOut.jsx'

function App() {


  return (
    <>
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/editroom/:roomId" element={<EditRoom />}/>
          <Route path="/existingrooms" element={<ExistingRooms />}/>
          <Route path="/addroom" element={<AddRoom />}/>
          <Route path="/browseallrooms" element={<RoomListing />}/>
          <Route path="/bookroom/:roomId" element={<CheckOut/>} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/bookingsuccess" element={<BookingSuccess/>} />
        </Routes>
      </Router>
      <Footer/>
    </main>
    
    
    </>
  )
}

export default App
