import React from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'


function Home() {
  return (
    <section>
        <MainHeader />
        <section className='container'>
          <RoomSearch/>
          <RoomCarousel/>
          <Parallax/>
          <RoomCarousel/>
          <HotelService/>
          <Parallax/>
          
        </section>
      
    </section>
  )
}

export default Home
