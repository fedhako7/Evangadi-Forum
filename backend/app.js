require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const questionRoute = require('./routes/questionRoute')
const authMiddleware = require('./middleware/authMiddleware')
const db = require('./database/database')


const app = express()
app.use(cors())
const port = 5600
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/questions",authMiddleware, questionRoute)

async function start() {
    try {
        const result = await db.execute("select 'test'")
        app.listen(port)
        console.log(`Database connection established`)
        console.log(`Running on port: ${port}`)
    } catch (error) {
        console.log(error.message)
    }
}


start()
