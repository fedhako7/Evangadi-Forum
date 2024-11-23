const db = require('../database/database')
const statusCodes = require('http-status-codes')


async function createQuestion(req, res) {
    const {title, description, userid} = req.body

    if (!title || !description || !userid){
        console.log("nooobodyyyyy", req)
        return res.status(statusCodes.BAD_REQUEST).json({msg: 'Please fill all requered fields.'})
    }

    try {
        await db.query("INSERT INTO question (userid, title, description) VALUES (?,?,?)", [userid, title, description])
        return res.status(statusCodes.OK).json({msg: "Question created successfully."})
        
    } catch (error) {
        console.log(error.message)
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong', error})
    }
}


async function createAnswer(req, res) {
    const {answer, questionid} = req.body
    const {userid} = req.user

    if (!answer || !questionid || !userid){
        return res.status(statusCodes.BAD_REQUEST).json({msg: 'Please fill all requered fields.'})
    }

    try {
        await db.query("INSERT INTO answers (userid, questionid, answer) VALUES (?,?,?)", [userid, questionid, answer])
        return res.status(statusCodes.OK).json({msg: "Answer Posted successfully."})

    } catch (error) {
        console.log(error.message)
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong', error})
    }
}


async function allQuestions(req, res) {
    try {
        const result = await db.query(`
            SELECT q.questionid, q.title, u.username
            FROM question AS q
            JOIN users AS u ON q.userid = u.userid
            ORDER BY q.created_at DESC
            `)
        const questions = result[0]
        return res.status(statusCodes.OK).json({msg: 'All questions loaded successfully', questions})
    } catch (error) {
        console.log(error.message)
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong', error})
    }
}


async function singleQuestion(req, res) {
    const questionid = parseInt(req.query.questionid);

    if (!questionid) {
        return res.status(statusCodes.BAD_REQUEST).json({msg: 'No questions yet'})
    }
    
    try {
        const question = await db.query(`
            SELECT q.userid, q.title, q.description, u.username
            FROM question AS q
            JOIN users AS u ON q.userid = u.userid
            WHERE questionid=?
            `, [questionid])

        const answerResult = await db.query(`
            SELECT a.userid, a.answerid, a.answer, u.username 
            FROM answers AS a 
            JOIN users AS u ON a.userid = u.userid 
            WHERE a.questionid = ?
            ORDER BY a.created_at DESC
        `, [questionid]);

        return res.status(statusCodes.OK).json({msg: 'A questions loaded successfully', question: question[0], answers:answerResult[0]})

    } catch (error) {
        console.log(error.message)
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong', error})
    }

}


module.exports = {createQuestion, createAnswer, allQuestions, singleQuestion}
