import React,{useState, useEffect} from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunction'
import { useParams,Link } from 'react-router-dom';
import RoomTypeSelector from "../common/RoomTypeSelector"

function EditRoom() {

  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  })

  const [imagePreview, setImagePreview] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const {roomId} = useParams()

  const handleImageChange = (e)=>{
    const selectedImage = e.target.files[0]

    setRoom({...room, photo : selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))

  }

  const handleRoomInputChange = (e)=>{
    const {name,value} = e.target
    setRoom({...room, [name]: value})
  }

  useEffect(()=>{
    const fetchRoom = async()=>{
      try {
        const roomData = await getRoomById(roomId)
        setRoom(roomData)
        setImagePreview(roomData.photo)
      } catch (error) {
        console.error(error) 
      }
    }

    fetchRoom()
  },[roomId])

  const handleSubmit = async(e)=>{
    e.preventDefault()

    

    try {
      const response = await updateRoom(roomId,room)
      if(response.status===200){
        setSuccessMessage("Room updated successfully!")
        const updatedRoomData = await getRoomById(roomId)
        setRoom(updatedRoomData)
        setImagePreview(updateRoom.photo)
        setErrorMessage("")
      }
      
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
      
    }
  }


  
  return (
    <>
    <section className='container mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>Edit Room</h2>
                {successMessage && (
                    <div className='alert alert-success fade show'>
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className='alert alert-danger fade show'>
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="roomType" className='form-label'>Room Type</label>
                        <div>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange}
                            newRoom={room}
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="roomPrice" className='form-label'>
                            Room Price
                        </label>
                        <input
                        type='number' 
                        className='form-control' 
                        required id='roomPrice' 
                        name="roomPrice" 
                        value = {room.roomPrice} 
                        onChange=  {handleRoomInputChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="photo" className='form-label'>
                            Room Photo
                        </label>
                        <input 
                        className='form-control' 
                        required id='photo' 
                        name="photo" 
                        type='file'
                        onChange=  {handleImageChange}
                        />
                        {imagePreview && 
                        (<img src={imagePreview} 
                            alt = "Preview Photo"
                            style={{maxWidth: "400px", maxHeight:"400px"}}
                            className='mb-3'
                            />)
                        }
                    </div>
                    <div className='d-grid gap-2 d-md-flex mt-2'>
                        <Link to={"/existingrooms"} className="btn btn-outline-info ml-5">back</Link>
                        <button className='btn btn-outline-warning ml-5'>Save Changes</button>
                    </div>

                </form>
            </div>
        </div>
    </section>
    </>
  )



    
}

export default EditRoom
