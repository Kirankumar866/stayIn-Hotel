import React, { useState } from 'react'
import { registration } from '../utils/ApiFunction'
import { Link } from 'react-router-dom'

const Registration = () => {

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = ()=>{
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const handleRegistration = async(e)=>{
    e.preventDefault()
    try {
      const result = await registration(userDetails)
      setSuccessMessage(result)
      setErrorMessage("")
      setUserDetails({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })
      
    } catch (error) {
      setSuccessMessage("")
      setErrorMessage(`Registration error : ${error.message}`)
      
    }
    
    setTimeout(()=>{
      setErrorMessage("")
      setSuccessMessage("")
    }, 5000)



  }
    
  return (
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {successMessage && <p className='alert alert-danger'>{successMessage}</p>}

      <h2>Register</h2>
      <form onSubmit={handleRegistration} >
            <div className='row mb-3'>
                <label htmlFor='firstName' className='col-sm-2 col-form-label'>
                First Name
                </label>
                <div>
                    <input id = "firstName" name="firstName" 
                    type="firstName" className='form-control'
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className='row mb-3'>
                <label htmlFor='lastName' className='col-sm-2 col-form-label' >
                Last Name
                </label>
                <div>
                    <input id = "lastName" name="lastName" 
                    type="lastName" className='form-control'
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>
                Email
                </label>
                <div>
                    <input id = "email" name="email" 
                    type="email" className='form-control'
                    value={userDetails.email}
                    onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='password' className='col-sm-2 col-form-label'>
                Password
                </label>
                <div>
                    <input id = "password" name="password" 
                    type="password" className='form-control'
                    value={userDetails.password}
                    onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='mb-3'>
                <button type='submit' className='btn btn-hotel' style={{marginRight: "10px"}}>
                    Login
                </button>
                <span style={{marginLeft: "10px"}}>
                     <Link to={"/login"}>Already have an account?</Link>
                </span>

            </div>
      </form>

    </section>
  )
}

export default Registration
