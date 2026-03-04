import React from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")



  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && <h6 className='text-success text-center mt-2'>You are logged-In as {currentUser}</h6>}
      <MainHeader />
      <section className='pb-5'>
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <div className="section-padding">
          <h2 className="section-title">Explore More Rooms</h2>
          <RoomCarousel />
        </div>
        <HotelService />
        <Parallax />
      </section>
    </section>
  )
}

export default Home
