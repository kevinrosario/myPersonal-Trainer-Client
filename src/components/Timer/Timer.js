import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

function Timer (props) {
  const { makeStyles, setRestTime, timerInterval, setTimerInterval } = props
  let { restTime } = props
  const classes = makeStyles()

  const handleStart = event => {
    setTimerInterval(
      setInterval(() => {
        if (restTime > 0) {
          restTime -= 1
          setRestTime(restTime)
        } else {
          clearInterval(timerInterval)
          setRestTime(3)
        }
      }, 1000))
  }

  return (
    <div className={classes.paper}>
      {restTime
        ? <Fragment>
          <Typography variant="h1" component="h2" gutterBottom>{restTime}</Typography>
          <Button variant="contained" className={classes.button} onClick={handleStart}>
                Start
          </Button>
        </Fragment>
        : '' }
    </div>
  )
}

export default withRouter(Timer)
