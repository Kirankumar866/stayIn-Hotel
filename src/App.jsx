

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
import Bookings from './components/bookings/Bookings.jsx'
import FindBookings from './components/bookings/FindBookings.jsx'
import Login from './components/auth/Login.jsx'
import Registration from './components/auth/Registration.jsx'
import Profile from './components/auth/Profile.jsx'
import AuthProvider from './components/auth/AuthProvider.jsx'
import Logout from './components/auth/Logout.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'

function App() {


  return (
    <AuthProvider>
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/editroom/:roomId" element={<EditRoom />}/>
          <Route path="/existingrooms" element={<ExistingRooms />}/>
          <Route path="/addroom" element={<AddRoom />}/>
          <Route path="/browseallrooms" element={<RoomListing />}/>
          <Route path="/bookroom/:roomId" element={<RequireAuth><CheckOut/></RequireAuth>} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/booking-success" element={<BookingSuccess/>} />
          <Route path="/existingbookings" element={<Bookings/>} />
          <Route path="/findbooking" element={<FindBookings/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </Router>
    </main>
    <footer/>
    
    
    </AuthProvider>
  )
}

export default App
