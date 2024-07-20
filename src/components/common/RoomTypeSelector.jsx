import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunction'

function RoomTypeSelector({handleRoomInputChange,newRoom}) {
    const [roomTypes,setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType,setNewRoomType] = useState("")

    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
            
        })
    },[])

    const handleNewRoomTypeInputChange = (e)=>{
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = ()=>{
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }


  return (
    <>
    {roomTypes.length> 0 && (
        <div>
            <select
            id="roomType"
            name="roomType"
            required
            value={newRoom.roomType}
            className='mb-3'
            onChange = {(e)=>{
                if(e.target.value=="Add New"){
                    setShowNewRoomTypeInput(true)
                }else{
                    handleRoomInputChange(e)
                }
            }}
            >
                <option value={""}>select a room type</option>
                {roomTypes.map((each,index)=>(
                    <option key={index}  value={each}>{each}</option>
                ))}
                <option value={"Add New"}>Add New</option>
                
            </select>
            {showNewRoomTypeInput && (
                <div className='input-group'>
                    <input 
                    className='form-control'
                    type="text"
                    placeholder='Enter a new room Type'
                    onChange={handleNewRoomTypeInputChange}
                    />
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}> Add</button>
                </div> 
            )}
        </div>
    )}
    </>
  )
}

export default RoomTypeSelector
