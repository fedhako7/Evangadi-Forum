import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dataContext } from "../../contextProvider/ContextProvider"
import classes from './Header.module.css'
import Logo from "../../assets/Logo_header.png"

function Header() {
  const {setUsername} = useContext(dataContext)
  const navigate = useNavigate()
  const { username } = useContext(dataContext)
  
  const handleClick = (e) => {
    if (username){
      localStorage.removeItem("token")
      setUsername(null)
    }
    navigate('/login')
  }
  return (
    <div className={classes.header}>
      <div className={classes.header__logo}>
        <Link to={'/'}><img src={Logo} alt="" /></Link>
      </div>
      <div>
        <Link to='/'> Home</Link>
        <Link to='/howitworks'>How it Works</Link>
          <button onClick={handleClick}>
            {username ? "SIGN OUT" : "SIGN IN"}
          </button>
      </div>
    </div>
  )
}

export default Header