import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QuestionCard from './QuestionCard'
import classes from './Question.module.css'
import axionsInstance from '../../axios/axios'
import { dataContext } from '../../contextProvider/ContextProvider'

function Question() {
  const { username } = useContext(dataContext)
  const token = localStorage.getItem('token')
  const [allQuestions, setAllQuestions] = useState([])

  async function fetchQuestions() {
    try {
      const response = await axionsInstance.get('questions/allquestions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAllQuestions(response.data.questions || [])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { fetchQuestions() }, [])
  return (

    <div className={classes.question_container}>
      <div className={classes.question}>
        <div className={classes.question__ask}>
          <Link to='/askquestion'>
            <button>Ask Question</button>
          </Link>
          <p>Welcome: {username} </p>
        </div>

        {
          allQuestions.map((question) => (
            <>
              <hr />
              <QuestionCard title={question.title} questionId={question.questionid} username={question.username} id={question.questionid} />
            </>
          ))}
        <hr />
      </div>
    </div>
  )
}

export default Question