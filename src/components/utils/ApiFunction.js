import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

export const getHeader = ()=>{
    const token = localStorage.getItem("token")
    return {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }

}


/* This function post's  a new room to the database */
export async function addRoom(photo,roomType,roomPrice){
     
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/addnewroom",formData,{
        headers: getHeader()
    })
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
        const result = await api.delete(`/rooms/deleteroom/${roomId}`,
            {
                headers: getHeader()
            }
        )
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
    const response = await api.put(`/rooms/update/${roomId}`,formData,{
        headers: getHeader()
    })
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
		console.log("response", response)
        return response.data
	} catch (error) {
        console.log("error1",error)
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}

}

/*This function gets all bookings from database */
export const getAllBookings = async()=>{

    try {
        const result = await api.get("/bookings/allbookings",{
            headers: getHeader()
        })

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


/* This function gets all available rooms from the database with a given dates and room type */

export const getAvailableRooms = async(checkInDate, checkOutDate, roomType)=>{
    const trimmedCheckInDate = checkInDate.trim()
    const trimmedCheckOutDate = checkOutDate.trim()

    const result = await api.get(`/rooms/available-rooms?checkInDate=${trimmedCheckInDate}&checkOutDate=${trimmedCheckOutDate}&roomType=${roomType}`);
    return result

}


/* Auth Folder */

    /* Registration of the new user */

export const registration = async(userDetails)=>{
    try {
        const response = await api.post("/auth/register-user", userDetails)
        return response.data

    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error registering error: ${error.message}`)
        }
        
    }

}

    /* Login for already existing user */

export const loginUser = async(userDetails)=>{

    try {
        const response = await api.post("auth/login", userDetails)
        if(response.status >= 200 && response.status < 300){
            return response.data
        }else{
            return null
        }
    } catch (error) {
        console.error(error)
        return null
        
        
    }
}

/* UserProfile */

export const getUserProfile = async()=>{
    try {
        const response = await api.get(`/users/profile/${userId}`,{
            headers : getHeader()
        })
        return response.data
        
    } catch (error) {
        throw error
        
    }

}


export const deleteUser = async(userId)=>{

    try {
        const response = await api.delete(`/users/delete/${userId}`,{
            headers : getHeader()
        })
        return response.data 
    } catch (error) {
        return error.message 
    }
}

export const getUser = async(userId)=>{

    try {
        const response = await api.get(`/users/${userId}`,{
            headers : getHeader()
        })
        return response.data
    } catch (error) {
        throw error
        
    }

}

export async function getBookingsByUserId(userId) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

