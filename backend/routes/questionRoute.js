const express = require('express')
const { createQuestion, createAnswer, allQuestions, singleQuestion } = require('../controller/questionController')
const route = express.Router()

route.post('/createquestion', createQuestion)
route.post('/createanswer', createAnswer)
route.get('/allquestions', allQuestions)
route.get('/singlequestion', singleQuestion)


module.exports = route
