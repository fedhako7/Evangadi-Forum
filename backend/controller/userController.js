const db = require('../database/database')
const jwt = require('jsonwebtoken')
const statusCodes = require('http-status-codes')
const bcrypt = require('bcrypt')

async function register(req, res) {
    const {username, password, fname, lname, email} = req.body

    if (!username || !password || !fname || !lname || !email) {
        return res.status(statusCodes.BAD_REQUEST).json({msg: "Please fill all requered info."})
    }

    try {
        const [user] = await db.query("SELECT userid, username FROM users where username=? or email=?", [username, email])
        if (user.length > 0){
            return res.status(statusCodes.BAD_REQUEST).json({msg: "Already registered with this email /username. Try with another."})
        }
        if (password.length < 8){
            return res.status(statusCodes.BAD_REQUEST).json({msg: "Password can't be shorter than 8 characters."})
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        await db.query("INSERT INTO users (username, fname, lname, email, password) VALUES (?,?,?,?,?)", [username, fname, lname, email, hashed])
        return res.status(statusCodes.CREATED).json({msg: "Successfully registered!"})

    } catch (error) {
        console.log(error.message)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong, please try again later.'})
    } 
}


async function login(req, res) {
    const {email, password} = req.body

    if (!email || !password){
        return res.status(statusCodes.BAD_REQUEST).json({msg: 'Please enter both email and password'})
    }

    try {
        const [user] = await db.query("SELECT userid, username, password FROM users where email=?", [email])
        if (user.length == 0){
            return res.status(statusCodes.UNAUTHORIZED).json({msg: 'Invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch){
            return res.status(statusCodes.UNAUTHORIZED).json({msg: 'Invalid credentials'})
        }
        const userid = user[0].userid
        const username = user[0].username
        const token = jwt.sign({userid, username}, process.env.JWT_SECRET, {expiresIn:'1d'})
        return res.status(statusCodes.OK).json({msg: "Logged In", token, username, userid})

    } catch (error) {
        console.log(error)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Invalid credentials'})
    }
}


async function checkuser(req, res) {
    const {userid, username} = req.user
    res.json({msg: "valid user", userid, username})
}

module.exports = {checkuser, register, login}
