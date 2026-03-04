import moment from 'moment'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchResult from './RoomSearchResult'
import { getAvailableRooms } from '../utils/ApiFunction'
import { motion, AnimatePresence } from 'framer-motion'

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault();
        const checkInMoment = moment(searchQuery.checkInDate);
        const checkOutMoment = moment(searchQuery.checkOutDate);
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please enter valid dates");
            return;
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Check-out date must be after check-in date");
            return;
        }
        setIsLoading(true);
        getAvailableRooms(
            searchQuery.checkInDate.trim(),  // Trim date strings
            searchQuery.checkOutDate.trim(),  // Trim date strings
            searchQuery.roomType
        ).then((response) => {
            setAvailableRooms(response.data);
            setTimeout(() => {
                setIsLoading(false);
            });
        }).catch((error) => {
            console.error(error);
            setErrorMessage("Network error: Could not fetch rooms. Please try again.");
        }).finally(() => {
            setIsLoading(false);
        });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("")
        }
    }

    const clearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        })
    }


    return (
        <>
            <div className='search-floating-card'>
                <Form onSubmit={handleSearch}>
                    <Row className='justify-content-center align-items-end'>
                        <Col xs={12} md={4}>
                            <Form.Group controlId='checkInDate' className='mb-3 mb-md-0'>
                                <Form.Label className="text-secondary small text-uppercase tracking-wider">Check-in date</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='checkInDate'
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="py-2 rounded-3 border-0 shadow-sm"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={4}>
                            <Form.Group controlId='checkOutDate' className='mb-3 mb-md-0'>
                                <Form.Label className="text-secondary small text-uppercase tracking-wider">Check-out date</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='checkOutDate'
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="py-2 rounded-3 border-0 shadow-sm"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label className="text-secondary small text-uppercase tracking-wider">Room Type</Form.Label>
                                <div className='d-flex gap-2'>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery} />
                                    <Button type="submit" className="btn-hotel flex-shrink-0">Search</Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {isLoading ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center text-secondary"
                    >
                        Finding available rooms...
                    </motion.p>
                ) : (
                    availableRooms && availableRooms.length > 0 ? (
                        <RoomSearchResult onClearSearch={clearSearch} results={availableRooms} />
                    ) : (
                        <p className="mt-4 text-center text-secondary">No rooms available for the selected dates and room type</p>
                    )
                )}

                <AnimatePresence>
                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className='mt-4 p-3 rounded bg-danger bg-opacity-10 border border-danger text-danger text-center shadow-sm'
                        >
                            <strong>⚠️ Oops!</strong> {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default RoomSearch
