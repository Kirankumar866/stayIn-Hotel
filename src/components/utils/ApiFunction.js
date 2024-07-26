import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
})


/* This function post's  a new room to the database */
export async function addRoom(photo,roomType,roomPrice){
     
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/addnewroom",formData)
    if(response.status === 201){
        return true
    }
    else{
        return false
    }

}


/* This function get all room types from database */
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/roomtypes")
        return response.data
        
    } catch (error) {
        throw new Error("Error fetching room types")
        
    }
}


/* This function gets all rooms from the database */
export const getAllRooms = async()=>{

    try {
        const result  = await api.get("/rooms/allrooms")
        return result.data
        
    } catch (error) {
        throw new Error("Error fetching rooms")
        
    }

}


/* This function deletes a room by Id */
export const deleteRoom = async(roomId)=>{
    try {
        const result = await api.delete(`/rooms/deleteroom/${roomId}`)
        return result.data
        
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
        
    }

}

/*This function updates a room by the id */
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType",roomData.roomType)
    formData.append("roomPrice",roomData.roomPrice)
    formData.append("photo",roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`,formData)
    return response
}


/*This function gets a room by the id */
export async function getRoomById(roomId){
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
        
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
        
    }
}


/*This function saves a new booking to the database*/
export const bookRoom = async(roomId, booking)=>{

    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)

        return response.data
        
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking room : ${error.message}`)
        }
        
    }

}

/*This function gets all bookings from database */
export const getAllBookings = async()=>{

    try {
        const result = await api.get("/bookings/allbookings")

        return result.data

        
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`)
        
    }

}

/*This function gets booking by confirmation code */
export const getBookingByConfirmationCode = async(confirmationCode)=>{
    try {
        
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result
    } catch (error) {
        if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
        
    }

}


/*This function cancels booking by Id */
export const cancelBooking = async(bookingId)=>{
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data

        
    } catch (error) {
        throw new Error(`Error cancelling booking : ${error.message}`)
        
    }
}  
