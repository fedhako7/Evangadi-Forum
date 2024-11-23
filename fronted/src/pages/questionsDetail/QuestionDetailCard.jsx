import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classes from './QuestionDetail.module.css'

function QuestionDetailCard({answer, username}) {
  return (
    <>
      <div className={classes.QuestionDetailCard}>
          <div className={classes.QuestionDetailCard__profile}>
            <AccountCircleIcon sx={{ fontSize: 42 }}/>
            <p>{username}</p>
          </div>
          <div className={classes.QuestionDetailCard__ques}>
            <p>{answer}</p>
          </div>
      </div>
    </>
  )
}

export default QuestionDetailCard