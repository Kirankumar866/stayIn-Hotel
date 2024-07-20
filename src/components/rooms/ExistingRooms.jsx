import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { deleteRoom, getAllRooms } from '../utils/ApiFunction'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import {Col,Row} from "react-bootstrap"
import {FaEdit, FaEye, FaTrashAlt,FaPlus} from "react-icons/fa"

function ExistingRooms() {
    const [rooms,setRooms] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading,setIsLoading]= useState(false)
    const [filteredRooms,setFilteredRooms]= useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [successMessage, setSuccessMessage]= useState("")
    const [errorMessage, setErrorMessage]= useState("")


    useEffect(()=>{
        fetchRooms()
    },[])

    const fetchRooms = async()=>{
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)

        } catch (error) {
            setErrorMessage(error.message)
            
        }
    }

    useEffect(()=>{
        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        }else{
            const filtered = rooms.filter((room)=>room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    },[rooms,selectedRoomType])

    const handlePaginationClick = (pageNumber)=>{
        setCurrentPage(pageNumber)

    }

    const handleDeleteRoom = async(roomId)=>{
        try {
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room Id ${roomId} was deleted`)
                fetchRooms()
            }else{
                console.error(`Error deleting room: ${result.message}`)
            }

            
        } catch (error) {
            setErrorMessage(error.messaage)
            
        }

        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        },1500) 



    }

    const calculateTotalPages = (filteredRooms,roomsPerPage,rooms)=>{
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms/roomsPerPage)

    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom,indexOfLastRoom)




     

    

  return (
    <>
    {isLoading ? (
        <p>Loading Existing rooms</p>
    ):(
        <>
        <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-between mb-3 mt-5'>
                <h2>Existing Rooms</h2>  
            </div>
            <Row>
                <Col md={6} className='mb-3 mbmd-0'>
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                </Col>
                <Col md={6} className='d-flex justify-content-end'>
                    <Link to={"/addroom"}>
                        <FaPlus /> Add Room
                    </Link>
                </Col>

            </Row>
            
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='text-center'>
                        <th>
                            ID
                        </th>
                        <th>
                            Room Type
                        </th>
                        <th>
                            Room Price
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRooms.map((eachRoom)=>(
                        <tr key={eachRoom.id} className='text-center'>
                            <td>{eachRoom.id}</td>
                            <td>{eachRoom.roomType}</td>
                            <td>{eachRoom.roomPrice}</td>
                            <td className="gap-2 ">

                                <Link to={`/editroom/${eachRoom.id}`}>
                                    <span className='btn btn-info'><FaEye/></span>
                                    <span className='btn btn-warning'><FaEdit/></span>
                                 </Link>
                                <button 
                                className='btn btn-danger btn-sm'
                                onClick = {()=>handleDeleteRoom(eachRoom.id)}
                                >
                                    <FaTrashAlt/>
                                </button>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <RoomPaginator 
            currentPage={currentPage}  
            totalPages={calculateTotalPages(filteredRooms,roomsPerPage,rooms)}
            onPageChange={handlePaginationClick}
            />

        </section>
        </>
    )}
      
    </>
  )
}

export default ExistingRooms
