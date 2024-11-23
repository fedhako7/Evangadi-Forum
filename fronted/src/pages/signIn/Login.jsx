import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Footer from '../footer/Footer'
import About from '../../components/about/About'
import classes from './Login.module.css'
import axios from '../../axios/axios'
import { dataContext } from '../../contextProvider/ContextProvider'

function Login() {
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [dbError, setDbError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { setUsername } = useContext(dataContext)
    const navigate = useNavigate()
    const email = useRef('')
    const password = useRef('')
    
    async function handleSubmit(e) {
        e.preventDefault()
        setEmailError('')
        setPasswordError('')
        const currentEmail = email.current.value
        const currentPassword = password.current.value
        if (!currentEmail || !currentPassword) {
            if (!currentEmail){setEmailError("* Email is requered")}
            if (!currentPassword){setPasswordError("* Password is requered")}
            return
        }
        try {
            setIsSubmitting(true)
            const { data } = await axios.post("/users/login", {
                email: currentEmail,
                password: currentPassword
            })
            localStorage.setItem("token", data?.token)
            localStorage.setItem("userid", data?.userid)
            setUsername(data?.username)
            setIsSubmitting(false)
            navigate('/')
        } catch (error) {
            setIsSubmitting(false)
            console.log("err", error.message)
            setDbError(error.message)
        }
    }

    return (
        <>
            <div className={classes.login}>
                <div className={classes.login__outerCcontainer}>
                <div className={classes.login__container}>
                    <h3>Login to your account</h3>
                    <p>Don't have an account? <a href="/register">Create a new account</a></p>
                    <form onSubmit={handleSubmit} action="">
                        <input id={classes.login__email} type="email" ref={email} placeholder='Your Email' />
                        { emailError && <p style={{fontSize:'14px', color:'red'}}>{emailError}</p>}
                        <input id={classes.login__password} type="password" ref={password} placeholder='Your Password' />
                        { passwordError && <p style={{fontSize:'14px', color:'red'}}>{passwordError}</p>}
                        {dbError && <p style={{fontSize:'18px', color:'red'}}>{dbError}</p>}
                        <button type='submit'>
                            {
                                isSubmitting ? <> <ClipLoader size={20} color='white'/> Please wait </> : 'Submit'
                            }
                        </button>
                    </form>
                    <Link to="/register">Create an account?</Link>
                </div>
                <About />
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Login