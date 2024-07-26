import React, { useState } from 'react'
import { getBookingByConfirmationCode,cancelBooking } from '../utils/ApiFunction'

const FindBookings = () => {
    const [confirmationCode,setConfirmationCode] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [bookingInfo, setBookingInfo] = useState({
        bookingId:"",
        room: {id: ""},
        bookingConfirmationCode : "",
        roomNumber:"",
        checkInDate:"",
        checkoutDate: "",
        guestFullName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren: "",
        totalNumofGuests: ""
    })

    const [isDeleted, setIsDeleted] = useState(false)

    const clearBookingInfo = {
        bookingId:"",
        room: {id: ""},
        bookingConfirmationCode : "",
        roomNumber:"",
        checkInDate:"",
        checkoutDate: "",
        guestFullName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren: "",
        totalNumofGuests: ""
    }

    const handleInputChange = (e)=>{
        setConfirmationCode(e.target.value)
    }

    const handleFormSubmit = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
            const {data} = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setErrorMessage(null)
		} catch (error) {
			setBookingInfo(clearBookingInfo)
			if (error.response && error.response.status === 404) {
				setErrorMessage(error.response.data.message)
			} else {
				setErrorMessage(error.message)
			} 
        }
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    }

    const handleBookingCancellation = async(bookingId)=>{
        try {
            await cancelBooking(bookingInfo.bookingId)
            setIsDeleted(true)
            setBookingInfo(clearBookingInfo)
            setErrorMessage("")
            setConfirmationCode("")
        } catch (error) {
            setErrorMessage(error.message)
            
        }

        setTimeout(()=>{
            setIsDeleted(false)
        },3000)
    }

    
    
  return (
    <>
    <div className='container mt-5 d-flex flex-column
    justify-content-center align-items-center
    '>
        <h2>Find Your Booking</h2>
        <form onSubmit={handleFormSubmit} className='col-md-6'>
            <div className='input-group mb-3'>
                <input 
                className='form-control'
                id="confirmationCode"
                name="confirmationCode"
                value={confirmationCode}
                onChange={handleInputChange}
                placeholder='Enter the booking confirmation code'
                />
                <button className='btn btn-hotel input-group-text'>Find</button>
            </div>
        </form>

        {isLoading ? (
            <div>Finding booking</div>
        ): (
            errorMessage ? 
            (<div className='text-danger'>{errorMessage}</div>) 
            : bookingInfo.bookingConfirmationCode ? (
                <div className='col-md-6 mt-4 mb-5'>
                    <h3>Booking Information</h3>
                    <p>Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
                    <p>Booking ID : {bookingInfo.bookingId}</p>
                    <p>Room Number : {bookingInfo.room.id}</p>
                    <p>Check-In Date : {bookingInfo.checkInDate}</p>
                    <p>Check-Out Date : {bookingInfo.checkoutDate}</p>
                    <p>Full Name : {bookingInfo.guestFullName}</p>
                    <p>Email : {bookingInfo.guestEmail}</p>
                    <p>Adults : {bookingInfo.numOfAdults}</p>
                    <p>Children : {bookingInfo.numOfChildren}</p>
                    <p>Total Guest : {bookingInfo.totalNumofGuests}</p>

                    {!isDeleted && (
                        <button className='btn btn-danger' onClick={()=>handleBookingCancellation(bookingInfo.bookingId)}>
                            Cancel Booking
                        </button>
                    )}
                </div>
            ): (
                <div>find booking ...</div>
            )
        )
        }

        {isDeleted && (
            <div className='alert alert-success mt-3' role="alert">Booking has been cancelled successfully!</div>
        )}


    </div>
    </>
  )
}

export default FindBookings
