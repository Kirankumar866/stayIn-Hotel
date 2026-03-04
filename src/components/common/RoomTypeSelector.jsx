import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunction'

function RoomTypeSelector({ handleRoomInputChange, newRoom }) {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)

        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }


    return (
        <>
            {roomTypes.length > 0 && (
                <div className="w-100">
                    <select
                        id="roomType"
                        name="roomType"
                        required
                        value={newRoom.roomType}
                        className="form-select py-2 rounded-3 border-0 shadow-sm w-100"
                        style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true)
                            } else {
                                handleRoomInputChange(e)
                            }
                        }}
                    >
                        <option value={""}>Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((each, index) => (
                            <option key={index} value={each}>{each}</option>
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className='input-group mt-2 shadow-sm rounded-3 overflow-hidden'>
                            <input
                                className='form-control border-0'
                                type="text"
                                placeholder='Enter a new room Type'
                                onChange={handleNewRoomTypeInputChange}
                                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                            />
                            <button className='btn btn-hotel m-0 rounded-0' type='button' onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector
