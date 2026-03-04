import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelService = () => {
    return (
        <>
            <Container className='section-padding'>
                <div className="text-center mb-5">
                    <h2 className="section-title">Our Services</h2>
                    <p className='text-secondary'>Experience world-class amenities at <span className='hotel-color fw-bold'>stayIn</span> Hotel</p>
                </div>

                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    <Col>
                        <Card className="text-center h-100 p-4 border-0">
                            <Card.Body>
                                <div className="service-icon"><FaWifi /></div>
                                <Card.Title className='brand-font mb-3'>Free WiFi</Card.Title>
                                <Card.Text className="text-secondary fw-light">
                                    Stay connected with high speed internet access throughout the property.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="text-center h-100 p-4 border-0">
                            <Card.Body>
                                <div className="service-icon"><FaUtensils /></div>
                                <Card.Title className='brand-font mb-3'>Breakfast</Card.Title>
                                <Card.Text className="text-secondary fw-light">
                                    Start your day with a luxurious, delicious breakfast buffet.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="text-center h-100 p-4 border-0">
                            <Card.Body>
                                <div className="service-icon"><FaTshirt /></div>
                                <Card.Title className='brand-font mb-3'>Laundry Service</Card.Title>
                                <Card.Text className="text-secondary fw-light">
                                    Keep your clothes clean and fresh with our same-day laundry service.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="text-center h-100 p-4 border-0">
                            <Card.Body>
                                <div className="service-icon"><FaCocktail /></div>
                                <Card.Title className='brand-font mb-3'>Mini-bar</Card.Title>
                                <Card.Text className="text-secondary fw-light">
                                    Enjoy a refreshing curated drink or snack from your in-room mini-bar.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="text-center h-100 p-4 border-0">
                            <Card.Body>
                                <div className="service-icon"><FaParking /></div>
                                <Card.Title className='brand-font mb-3'>Valet Parking</Card.Title>
                                <Card.Text className="text-secondary fw-light">
                                    Park your vehicle safely with our convenient on-site parking lot.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="text-center h-100 p-4 border-0">
                            <Card.Body>
                                <div className="service-icon"><FaSnowflake /></div>
                                <Card.Title className='brand-font mb-3'>Climate Control</Card.Title>
                                <Card.Text className="text-secondary fw-light">
                                    Stay perfectly comfortable with individual air conditioning systems.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HotelService
