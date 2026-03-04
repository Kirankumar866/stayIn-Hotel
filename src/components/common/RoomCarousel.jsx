import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { getAllRooms } from "../utils/ApiFunction"
import { Container, Carousel, Row, Col, Card } from "react-bootstrap"
import Slider from "react-slick";
import { motion } from 'framer-motion'

const RoomCarousel = () => {

    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", photo: "" }])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data) => {
            setRooms(data)
            setIsLoading(false)
        }).catch((error) => {
            setErrorMessage("We're having trouble reaching our servers. Please check your connection or try again later.")
            setIsLoading(false)
        })

    }, [])


    if (isLoading) {
        return (
            <motion.div
                className='text-center mt-5 text-secondary'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
                Fetching luxury rooms...
            </motion.div>
        )
    }

    if (errorMessage) {
        return (
            <motion.div
                className='container my-5'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className='p-4 rounded-4 bg-danger bg-opacity-10 border border-danger text-danger text-center shadow-sm max-w-lg mx-auto'>
                    <h5 className='mb-2 fw-bold'>⚠️ Connection Error</h5>
                    <p className='mb-0'>{errorMessage}</p>
                </div>
            </motion.div>
        )
    }

    return (
        <section className='bg-light mb-5 mt-5 shadow'>
            <Link to={"/browseallrooms"} className='hotel-color text-center'>
                Browse all rooms
            </Link>

            <Container>
                <Carousel controls={false} >
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index} interval={4000}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className='mb-4' xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/bookroom/${room.id}`} >
                                                <Card.Img variant='top'
                                                    src={`data:image/png;base64, ${room.photo}`}
                                                    alt="room-photo"
                                                    className="w-100"
                                                    style={{ height: "200px" }}
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className='hotel-color'>
                                                    {room.roomType}
                                                </Card.Title>
                                                <Card.Title className='room-price'>
                                                    {room.roomPrice}/Night
                                                </Card.Title>
                                                <div className="flex-shrink-0">
                                                    <Link to={`/bookroom/${room.id}`} className="btn btn-hotel btn-sm">
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}

                </Carousel>
            </Container>

        </section>
    )
}

export default RoomCarousel
