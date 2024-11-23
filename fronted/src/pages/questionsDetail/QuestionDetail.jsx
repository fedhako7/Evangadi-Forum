import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import QuestionDetailCard from './QuestionDetailCard'
import  classes from './QuestionDetail.module.css'
import axios from '../../axios/axios'
import axionsInstance from '../../axios/axios'

function QuestionDetail() { 
  const answer = useRef('')
  const questionid = Number(useParams().questionId)
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState('')
  const [answerError, setAnswerError] = useState('')
  const [dbError, setDbError] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const token = localStorage.getItem("token")

  const handlePost = async (e) => {
    const currentAnswer = answer.current.value
    if (!currentAnswer){
      setAnswerError("*Answer is required.")
      setIsPosting(false)
      return
    }
    try {
      setIsPosting(true)
      axionsInstance.post("/questions/createanswer",
        {answer: currentAnswer,
          questionid
        },
        {headers: {
          authorization: "Bearer " + token
        }}
      )
      setIsPosting(false)
      fetchAnswers();
      answer.current.value = "";
      
    } catch (error) {
      setIsPosting(false)
      setDbError(error.message)
    }
  }

  async function fetchAnswers() {
    try {
      const {data} = await axios.get(`questions/singlequestion`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          questionid
      }
      })
      setAnswers(data.answers)
      setQuestion(data.question[0])

    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(()=>{
    fetchAnswers()
  }, [])

  return (
    <div className={classes.questionDetail}>
      <div className={classes.questionDetail__question}>
        <h3>Question</h3>
        <h4> {question?.title}</h4>
        <p>{question?.description}</p>
        <hr />
      </div>

      <div className={classes.questionDetail__lower}>
        <div className={classes.questionDetail__answers}>
          <h3>Answers From The Community</h3>

          {
            answers.map((answer) => (
              <>
              <QuestionDetailCard answer={answer.answer} username={answer.username} id={answer.answerid}/>
              </>
            ))
          }
        </div>
        <div className={classes.questionDetail__answer}>
          <h3>Answer The Top Question</h3>
          <Link to='/'>Go to question page</Link>
          <textarea placeholder="Your Answer..." ref={answer} maxLength={200}></textarea>
            { answerError && <p style={{ fontSize:"16px", color:"red"}}>{ answerError }</p>}
            { dbError && <p style={{ fontSize:"16px", color:"red"}}>{ dbError }</p>}
          <button onClick={handlePost}>
            {
            isPosting ? <> <ClipLoader size={20} color='white'/> Please wait...</>: <>Post Your Answer</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionDetail