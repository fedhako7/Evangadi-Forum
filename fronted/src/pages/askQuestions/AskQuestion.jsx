import React, { useRef, useState } from 'react'
import classes from './AskQuestion.module.css'
import axionsInstance from '../../axios/axios'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

function AskQuestion() {
  const navigate = useNavigate()
  const userid = localStorage.getItem("userid")
  const token = localStorage.getItem("token")
  const title = useRef('')
  const description = useRef('')
  const [isPosting, setIsPosting] = useState(false)
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [dbError, setDbError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setTitleError('')
    setDescriptionError('')
    setDbError('')
    const currentTitle = title.current.value
    const currentDescription = description.current.value
    if (!currentTitle || !currentDescription) {
      if (!currentTitle) { setTitleError(true) }
      if (!currentDescription) { setDescriptionError(true) }
      return
    }

    try {
      setIsPosting(true)
      const r = await axionsInstance.post("/questions/createquestion", {
        title: currentTitle,
        description: currentDescription,
        userid: userid
      },
        {
          headers: {
            authorization: "Bearer " + token
          }
        })
      setIsPosting(false)
      navigate("/")

    } catch (error) {
      setIsPosting(false)
      console.log(error.message)
      setDbError(error.message)
    }
  }

  return (
    <div className={classes.askQuestion}>
      <div className={classes.askQuestion__steps}>
        <div className={classes.askQuestion__steps__list}>
          <h3>Steps to ask good question</h3>
          <ul>
            <li >Summerize your problem in a one line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={classes.askQuestion__ask}>
        <h3>Ask a public question</h3>
        <a href="#">Go to question page</a>
        <input ref={title} type="text" placeholder='Title' maxLength="40" />
        {
          titleError && <p style={{ fontSize: "16px", color: "red" }}>*Title required</p>
        }
        <textarea ref={description} name="" id="" placeholder='Question description' maxLength="200"></textarea>
        {
          descriptionError && <p style={{ fontSize: "16px", color: "red" }}>*Description required</p>
        }
        {
          dbError && <p style={{ fontSize: "16px", color: "red" }}>*{dbError}</p>
        }
        <button value='submit'>
          {
            isPosting ? <> <ClipLoader size={15} color='white' /> Please wait </> : <> Post Your Question </>
          }
        </button>
      </form>
    </div>
  )
}

export default AskQuestion