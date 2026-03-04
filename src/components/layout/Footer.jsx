import React from 'react'
import { Col, Container, Row } from "react-bootstrap"

function Footer() {
  let today = new Date()
  return (
    <footer className='footer mt-lg-5'>
      <Container>
        <Row>
          <Col xs={12} md={12} className="text-center">
            <p className='mb-0'>&copy; {today.getFullYear()} stayIn Hotel. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
