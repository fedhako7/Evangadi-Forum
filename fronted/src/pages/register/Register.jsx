import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Footer from '../footer/Footer'
import About from '../../components/about/About'
import classes from './Register.module.css'
import axios from '../../axios/axios'

function Register() {
    const [dbError, setDbError] = useState('')
    const [fieldsError, setFieldsError] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const navigate = useNavigate()
    const email = useRef('')
    const fname = useRef('')
    const lname = useRef('')
    const username = useRef('')
    const password = useRef('')


    async function handleSubmit(e) {
        e.preventDefault()
        const currentEmail = email.current.value
        const currentFname = fname.current.value
        const currentLname = lname.current.value
        const currentUsername = username.current.value
        const currentPassword = password.current.value
        if (!currentEmail || !currentFname || !currentLname || !currentUsername || !currentPassword) {
            setFieldsError('Please fill all fields')
        }

        try {
            setIsLoading(true)
            const result = await axios.post("/users/register", {
                email: currentEmail,
                fname: currentFname,
                lname: currentLname,
                username: currentUsername,
                password: currentPassword
            })
            console.log(result)
            setIsLoading(false)
            navigate('/login')

        } catch (error) {
            setIsLoading(false)
            setDbError(error.message)
            console.log(error?.response?.data?.msg)
        }
    }

    return (
        <>
            <div className={classes.register}>
                <div className={classes.register__outerContainer}>
                    <div className={classes.register__container}>
                        <h3>Join the network</h3>
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                        <form onSubmit={handleSubmit} action="">
                            <input type="email" ref={email} placeholder='Email' />
                            <div>
                                <input id={classes.border__top} type="text" ref={fname} placeholder='First Name' />
                                <input id={classes.border__top} type="text" ref={lname} placeholder='Last Name' />
                            </div>
                            <input type="text" ref={username} placeholder='Username' />
                            <input id={classes.border__top} type="password" ref={password} placeholder='Password' />
                            {
                                (dbError || fieldsError) &&
                                    fieldsError ? <p style={{ fontSize: "17px", color: "red" }}>*{fieldsError}</p>
                                    : dbError && <p style={{ fontSize: "17px", color: "red" }}>*{dbError}</p>
                            }
                            <button type='submit'>{isLoading ? <><ClipLoader size={20} color='white' /> Please wait...</> : "Agree and Join"}</button>
                        </form>
                        <p>I agree to the<Link to="#"> privacy policy</Link> and <Link to="#">terms of service.</Link></p>
                        <Link to="/login">Already have an account?</Link>
                    </div>
                    <About />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Register