import React from 'react'
import { motion } from 'framer-motion'
import bannerImg from '../../assets/slidingHeader.jpg'

const MainHeader = () => {
  return (
    <header className="hero-wrapper">
      <img src={bannerImg} alt="Luxury Hotel" className="hero-bg" />
      <div className="hero-overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h4
          className="hero-subtitle d-none d-md-block"
          initial={{ opacity: 0, letterSpacing: "0px" }}
          animate={{ opacity: 1, letterSpacing: "4px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A Touch of Elegance
        </motion.h4>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Experience The <span className="hotel-color">Extraordinary</span>
        </motion.h1>
      </motion.div>
    </header>
  )
}

export default MainHeader
