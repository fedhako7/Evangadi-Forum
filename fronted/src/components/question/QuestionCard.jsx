import React from 'react'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classes from './Question.module.css'

function QuestionCard({title, username, questionId}) {
  return (
    <>
    <Link to={`./questionDetail/${questionId}`} className={classes.no_decoration}>
      <div className={classes.questionCard}>
          <div className={classes.questionCard__profile}>
            <AccountCircleIcon sx={{ fontSize: 42 }}/>
            <p>{username}</p>
          </div>
          <div className={classes.questionCard__ques}>
            <p>{title}</p>
            <ArrowForwardIosIcon />
          </div>
      </div>
    </Link>
    </>
  )
}

export default QuestionCard