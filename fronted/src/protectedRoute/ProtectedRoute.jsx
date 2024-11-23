import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios/axios'
import { dataContext } from '../contextProvider/ContextProvider'

function ProtectedRoute({children}) {
  const { setUsername } = useContext(dataContext)
  const token = localStorage.getItem('token')
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const navigate = useNavigate()

 async function checkUser() {
  try {
    const response = await axios.get("users/checkuser", {
      headers: {
        authorization: "Bearer " + token
      }
    })
    setIsAuthenticated(true)
    setUsername(response?.data?.username)

  } catch (error) {
    console.log(error.message)
    setIsAuthenticated(false)
    navigate("/login")
  }
 }

  useEffect(() => {
    if (token) {
      checkUser()
    }else{
      setIsAuthenticated(false)
      navigate('/login')
    }
  }, [token])

  if (isAuthenticated === null){
    return (
      <div>Loading...</div>
    )
  }
  return isAuthenticated ? children: <p>Not Authenticated</p>
  
}

export default ProtectedRoute